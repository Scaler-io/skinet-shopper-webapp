import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupee'
})
export class PrependRupeeSymbolPipe implements PipeTransform {
  transform(value: number): string {
    return 'Rs ' + value;
  }
}
