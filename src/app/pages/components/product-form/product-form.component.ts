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
        id: 0,
        nombre: '',
        tipo: 0,
        pais: 0,
        precio: 0,
      })
    } else {
      this.productForm.setValue(
        {
          id: this.productSelected.id,
          nombre: this.productSelected.nombre,
          tipo: this.productSelected.tipo.id,
          pais: this.productSelected.pais.id,
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
      const { id, nombre, tipo, pais, precio } = this.productForm.value;
      let oProducto: Product = new Product();
      oProducto.id = id;
      oProducto.nombre = nombre;
      let oTipo: Tipo = new Tipo();
      oTipo.id = tipo;
      oTipo.descripcion = '';
      oProducto.tipo = oTipo;
      let oPais: Pais = new Pais();
      oPais.id = pais;
      oPais.descripcion = '';
      oProducto.pais = oPais;
      oProducto.precio = precio;
      this.registrarProducto(oProducto);
    }
    else {
      const { id, nombre, tipo, pais, precio } = this.productForm.value;
      let oProducto: Product = new Product();
      oProducto.id = id;
      oProducto.nombre = nombre;
      let oTipo: Tipo = new Tipo();
      oTipo.id = tipo;
      oTipo.descripcion = '';
      oProducto.tipo = oTipo;
      let oPais: Pais = new Pais();
      oPais.id = pais;
      oPais.descripcion = '';
      oProducto.pais = oPais;
      oProducto.precio = precio;
      this.editarProducto(oProducto);
    }
  }

  registrarProducto(producto: Product) {
    this.productservice.registrarProducto(producto).subscribe(res => {
      if (res.isSuccess) {
        if (res.dato) {
          this.cerraModal.emit(true);
        }
      }
    });
  }

  editarProducto(producto: Product) {
    this.productservice.editarProducto(producto).subscribe(res => {
      if (res.isSuccess) {
        if (res.dato) {
          this.cerraModal.emit(true);
        }
      }
    });
  }



}
