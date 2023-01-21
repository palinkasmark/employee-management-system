import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
    transform(employees: any[], searchText: string): any[] {
        if(!employees) {
            return [];
        }
        if(!searchText) {
            return employees;
        }

        searchText = searchText.toLowerCase();

        return employees.filter(element => {
            return element.name.toLowerCase().includes(searchText);
        });
    }
    
}