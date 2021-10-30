import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  pure:false
})
export class FilterPipe implements PipeTransform {
  transform(value: any,args: any): any {
    
      if (!value || !args)
          return value;
      return FilterPipe.filter(value, args);
  }
  static filter(items, term) {
      const /** @type {?} */ toCompare = term.toLowerCase();
      /**
       * @param {?} item
       * @param {?} term
       * @return {?}
       */
      function checkInside(item, term) {
          for (let /** @type {?} */ property in item) {
              if (item[property] === null || item[property] == undefined) {
                  continue;
              }
              if (typeof item[property] === 'object') {
                  if (checkInside(item[property], term)) {
                      return true;
                  }
              }
              if (item[property].toString().toLowerCase().includes(toCompare)) {
                  return true;
              }
          }
          return false;
      }
      return items.filter(function (item) {
          return checkInside(item, term);
      });
  }
  }

