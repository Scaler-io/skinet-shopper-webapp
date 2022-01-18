import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'skinetOrderId'
})
export class FormatSkinetOrderIdPipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    return 'SKN'+value;
  }

}
