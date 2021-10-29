import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, first, catchError } from 'rxjs/operators';
import { IamService } from 'src/app/core-new/services/iam.service';
import { RoleService } from 'src/app/core-new/services/role.service';
import { TeamService } from 'src/app/core-new/services/team.service';
import { UtilityService } from 'src/app/core-new/services/utility.service';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'iam-invite-member',
  templateUrl: './invite-member.component.html',
  styleUrls: ['./invite-member.component.scss'],
})
export class InviteMemberComponent implements OnInit {
  btnLoader = false;
  roleList = [];
  memberData = new FormArray([]);

  constructor(
    public dialogRef: MatDialogRef<InviteMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private readonly us: UtilityService,
    private iamService: IamService,
    private teamService: TeamService,
  ) {
  }

  ngOnInit(): void {
    this.roleList = [];
    if (this.data.type === 'account') {
      this.roleList = this.data.roleList.filter(ele => ele.name.toLowerCase() == 'super admin' || ele.name.toLowerCase() == 'billing admin');
    } else if (this.data.type == 'workspace') {
      this.roleList = this.data.roleList.filter(ele => ele.roleLevelType.toLowerCase() == 'admin')
    } else if (this.data.type == 'resource') {
      this.roleList = this.data.roleList.filter(ele => ele.roleLevelType.toLowerCase() !== 'admin')
    }
    this.addMember();
  }

  deleteMember(index) {
    this.memberData.removeAt(index);
  }

  fillName(memberObj) {
    let member = memberObj.controls;
    // this.userExist(member);
    let name;
    let username = member.username.value.trim();
    member.username.setValue(username);
    if (username.includes('@')) {
      name = username.split('@')[0];
    } else {
      name = username;
    }
    let value = this.us.nameFormat(name);
    member.name.setValue(value);
  }

  onResourceRemoved(resource: string, index) {
    const resources = this.memberData.controls[index].get('resources').value as string[];
    this.removeFirst(resources, resource);
    this.memberData.controls[index].get('resources').setValue(resources); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  addMember() {
    let group = new FormGroup({
      role: new FormControl('', [Validators.required]),
      username: new FormControl('', {
        validators: [Validators.required, Validators.pattern(emailRegex)],
        asyncValidators: [this.usernameValidator.bind(this)],
      }
      ),
      name: new FormControl('', [Validators.required]),
      resources: this.data.type == 'resource' ? new FormControl([], [Validators.required]) : new FormControl([]),
    });

    this.memberData.push(group);
  }

  usernameValidator(control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return control.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(value => this.teamService.getUserExistApi(value)),
      map(res => {
        return this.userNameResHandler(res, control.value);
      }),
      first(), // important to make observable finite
      catchError((err) => of({ usernameExists: true, username: control.value, message: err['message'] })))
  }

  userNameResHandler(res, username) {
    if (res && res['code'] == 'success') {
      if (res['data'].exist) {
        return { usernameExists: true, username, message: res['data'].message };
      } else {
        return null;
      }
    } else {
      return { usernameExists: true, username, message: res['message'] };
    }
  }

  getMemberList(memberList) {
    // resourcegroup hierarchy
    let list = [];
    if (this.data.type == 'account' || this.data.type == 'workspace') {
      memberList.forEach((member) => {
        let memberObj = {
          username: member.controls.username.value,
          name: member.controls.name.value,
          role: member.controls.role.value,
          access: [{
            "resourceGroup": "ALL",
            "resources": ["ALL"]
          }]
        }
        list.push(memberObj);
      });
    } else if (this.data.type == 'resource') {
      memberList.forEach((member) => {
        let memberObj = {
          username: member.controls.username.value,
          name: member.controls.name.value,
          role: member.controls.role.value,
          access: [
            {
              resourceGroup: "arn:resourcegroups/account-management",
              resources: []
            },
            {
              resourceGroup: "arn:resourcegroups/iam",
              resources: []
            }
          ]
        }
        let resourceList = member.controls.resources.value;
        resourceList.forEach((resource) => {
          let memberResource = {
            resourceGroup: this.data.resourceGroupList.find(ele => ele.name.toLowerCase() === resource.toLowerCase()).hierarchy,
            resources: []
          }
          memberObj.access.push(memberResource);
        })
        list.push(memberObj);
      });
    }
    return list;
  }

  addUser() {
    if (this.btnLoader) return;
    let data = {
      mapperHierarchy: this.us.getAccessLevel(),
      inviteTypes: `${this.us.getAccessType().toUpperCase()}_INVITE`,
      users: this.getMemberList(this.memberData.controls),
    };
    this.btnLoader = true;
    this.iamService.inviteMemberApi(data).subscribe((res) => {
      this.btnLoader = false;
      if (res && res['code'] === 'success') {
        this.us.openSnackBar(res['message']);
        this.dialogRef.close({ action: 'refresh' });
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
