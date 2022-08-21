import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pais } from 'src/app/models/country';
import { Product } from 'src/app/models/product';
import { Tipo } from 'src/app/models/type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {


  productForm: FormGroup;

  typeList: Tipo[];
  countryList: Pais[];

  @Input() productSelected: Product = new Product();
  @Output() cerraModal = new EventEmitter<Boolean>();
  constructor(private fb: FormBuilder, private productservice: ProductService) { }

  ngOnInit(): void {
    this.initForm();
    this.productservice.listarTipos()
      .subscribe
      ((res: any) => {
        if (res.isSuccess) {
          if (res.dato) {
            this.typeList = res.dato;
          }
        }
      });;

    this.productservice.listarPaises()
      .subscribe
      ((res: any) => {
        if (res.isSuccess) {
          if (res.dato) {
            this.countryList = res.dato;
          }
        }
      });;
    if (!this.productSelected.id) {
      this.productForm.setValue({
        id: '',
        nombre: '',
        tipo: '',
        pais: '',
        precio: '',
      })
    } else {
      this.productForm.setValue(
        {
          id: this.productSelected.id,
          nombre: this.productSelected.nombre,
          tipo: this.productSelected.tipo.descripcion,
          pais: this.productSelected.pais.descripcion,
          precio: this.productSelected.precio,
        });
    }
  }

  initForm() {
    this.productForm = this.fb.group({
      id: new FormControl('', []),
      nombre: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }
    if (!this.productSelected.id) {
      this.registrarProducto(this.productForm.value);
      this.cerraModal.emit(true);
    }
    else {
      this.editarProducto(this.productForm.value);
      this.cerraModal.emit(true);
    }
  }

  registrarProducto(producto: Product) {
    console.log(producto);
    
    this.productservice.registrarProducto(producto).subscribe(res => {
      if (res.isSuccess) {
        if (res.dato) {
          console.log("Ehhhh");

        }
      }
    });
    //this.fireDatabase.insertProduct(producto);            utilizar api para registrar el producto
  }

  editarProducto(producto: Product) {
    this.productservice.editarProducto(producto).subscribe(res => {
      if (res.isSuccess) {
        if (res.dato) {
          console.log("Ehhhh");

        }
      }
    });
    //this.fireDatabase.updateProduct(producto);            utilizar api para editar el producto
  }



}
