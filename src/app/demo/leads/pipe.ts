
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform  {
    transform(pagedItems: any, search: any):any {
       if(search === undefined) return pagedItems;
       return pagedItems.filter(function(item:any){
           return item.firstname.toString().toLowerCase().includes(search.toLowerCase());
       });


    }
}
