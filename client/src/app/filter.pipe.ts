import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'FilterPipe'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any {
    if (!items) { return []; }
    if (!searchText) { return items; }
searchText = searchText.toLowerCase();
return items.filter( it => {
  // return it.name.toLowerCase().includes(searchText);
  return it.name.toLowerCase().includes(searchText) || it.options.some(u => {
    return u.optionName.toLowerCase().includes(searchText);
  });
      // return it.name.toLowerCase().includes(searchText) || it.options[0].optionName.toLowerCase().includes(searchText);
    });
   }
}
