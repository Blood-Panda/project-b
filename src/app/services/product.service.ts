import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pais } from '../models/country';
import { Product } from '../models/product';
import { Tipo } from '../models/type';

const url = environment.url;
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Accept": "*/*",
        'Content-Type': 'application/json'
      })
    };
  }

  listarProductos(): Observable<Product[]> {
    return this.http.
      get<Product[]>(
        `${url}/Producto/ListarProductos`)
      .pipe(
        map((response: any) => response)
      );
  }

  listarTipos(): Observable<Tipo[]> {
    return this.http.
      get<Tipo[]>(
        `${url}/Tipo/ListarTipos`)
      .pipe(
        map((response: any) => {return response})
      );
  }

  listarPaises(): Observable<Pais[]> {
    return this.http.
      get<Pais[]>(
        `${url}/Pais/ListarPaises`)
      .pipe(
        map((response: any) => response)
      );
  }

  editarProducto(producto: Product): Observable<any> {
    return this.http.post<void>(`${url}/Producto/EditarProducto`, producto).pipe(
      map((response: any) => response)
    );
  }

  eliminarProducto(producto: Product): Observable<any> {
    return this.http.post<void>(`${url}/Producto/EliminarProducto`, producto).pipe(
      map((response: any) => response)
    );
  }

  registrarProducto(producto: Product): Observable<any> {
    return this.http.post<void>(`${url}/Producto/RegistrarProducto`, producto).pipe(
      map((response: any) => response)
    );
  }
}
