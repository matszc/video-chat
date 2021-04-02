import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'map'
})
export class MapPipe implements PipeTransform {

  transform(value: { [key: string]: string }, ...args: unknown[]): Map<string, string> {
    const map: Map<string, string> =  new Map<string, string>();
    for(const key in value) {
      map.set(key, value[key]);
    }
    return map;
  }

}
