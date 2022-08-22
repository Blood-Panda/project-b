import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'buscar'
})
export class BuscarPipe implements PipeTransform {

  transform(products: Product[], filtro: string): any {
    if (!products) {
      return;
    }
    const result = [];
    for (const product of products) {
      if (product.nombre.toLocaleLowerCase().indexOf(filtro.toLocaleLowerCase()) > -1) {
        result.push(product);
      }
    }
    return result;
  }

}
