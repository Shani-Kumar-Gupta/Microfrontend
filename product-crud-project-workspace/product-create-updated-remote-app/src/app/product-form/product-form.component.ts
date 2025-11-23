import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  isEditMode: boolean = false;
  currentProductId: number | null = null;
  private editProductListener?: (event: Event) => void;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    // Listen for edit product events from product listing MFE
    this.editProductListener = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.product) {
        const product: Product = customEvent.detail.product;
        this.loadProductForEdit(product);
      }
    };
    window.addEventListener('editProduct', this.editProductListener);
  }

  ngOnDestroy(): void {
    if (this.editProductListener) {
      window.removeEventListener('editProduct', this.editProductListener);
    }
  }

  loadProductForEdit(product: Product): void {
    this.isEditMode = true;
    this.currentProductId = product.id;
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData: Product = {
        id: this.isEditMode && this.currentProductId ? this.currentProductId : Date.now(),
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        price: parseFloat(this.productForm.value.price)
      };

      // Dispatch event to notify product listing MFE
      const event = new CustomEvent('productSaved', {
        detail: { 
          product: productData,
          isEdit: this.isEditMode
        }
      });
      window.dispatchEvent(event);

      // Reset form
      this.resetForm();
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
    }
  }

  resetForm(): void {
    this.productForm.reset();
    this.isEditMode = false;
    this.currentProductId = null;
  }

  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }

  get price() {
    return this.productForm.get('price');
  }
}

