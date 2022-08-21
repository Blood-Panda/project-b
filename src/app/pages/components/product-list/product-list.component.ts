import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[];
  filtrar: string = '';
  
  @Input() productSelected: Product;
  constructor(private modalService: NgbModal,private productservice: ProductService) { }

  ngOnInit(): void {
    this.productservice.listarProductos()
    .subscribe
    ((res: any) => {        
      if (res.isSuccess) {
        if (res.dato) {
          this.productList = res.dato;
        }
      }
      console.log(this.productList);
    });; 
    
    
  }

  abrirModalForm(contenido: any) {
    this.modalService.open(contenido, { centered: true });
  }
  abrirModalCerrar(contenido: any, product: Product) {
    this.productSelected = product;
    this.modalService.open(contenido, { size: 'sm' });
  }

  eliminarProducto() {
    this.productservice.eliminarProducto(this.productSelected).subscribe(res => {
      if (res.isSuccess) {
        if (res.dato) {
          console.log("Ehhhh");

        }
      }
    });
  }
  
  cambiarProducto(product:Product){
    this.productSelected = product;
  }
}
