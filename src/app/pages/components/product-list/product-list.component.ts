import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[];
  filtrar: string = '';
  
  @Input() productSelected: Product;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.productList = [{
      id: 1,
      nombre: "Producto 1",
      tipo: "Tipo 1",
      precio: 24.5,
      pais: "México"
    }];    //TODO:AQUI SE DEBE DE LLENAR LA LISTA DE PRODUCTOS
  }

  abrirModalForm(contenido: any) {
    this.modalService.open(contenido, { centered: true });
  }
  abrirModalCerrar(contenido: any, product: Product) {
    this.productSelected = product;
    this.modalService.open(contenido, { size: 'sm' });
  }

  eliminarProducto() {
    //TODO:API PARA ELIMINAR PRODUCTO
  }
  
  cambiarProducto(product:Product){
    this.productSelected = product;
  }
}
