import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country';
import { Product } from '../models/product';
import { Type } from '../models/type';

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
        `${url}/api/Producto/ListarProductos`)
      .pipe(
        map((response: any) => response)
      );
  }

  listarTipos(): Observable<Type[]> {
    return this.http.
      get<Product[]>(
        `${url}/api/Tipo/ListarTipos`)
      .pipe(
        map((response: any) => response)
      );
  }

  listarPaises(): Observable<Country[]> {
    return this.http.
      get<Product[]>(
        `${url}/api/Pais/ListarPaises`)
      .pipe(
        map((response: any) => response)
      );
  }

  editarProducto(producto: Product): Observable<any> {
    return this.http.post<void>(`${url}/api/Producto/EditarProducto`, producto).pipe(
      map((response: any) => response)
    );
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.post<void>(`${url}/api/Producto/EliminarProducto`, id).pipe(
      map((response: any) => response)
    );
  }
}
