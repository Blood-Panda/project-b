import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/models/country';
import { Product } from 'src/app/models/product';
import { Type } from 'src/app/models/type';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;

  typeList: Type[];
  countryList: Country[];

  @Input() productSelected: Product = new Product();
  @Output() cerraModal = new EventEmitter<Boolean>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
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
    //this.fireDatabase.insertProduct(producto);            utilizar api para registrar el producto
  }

  editarProducto(producto: Product) {
    //this.fireDatabase.updateProduct(producto);            utilizar api para editar el producto
  }



}
