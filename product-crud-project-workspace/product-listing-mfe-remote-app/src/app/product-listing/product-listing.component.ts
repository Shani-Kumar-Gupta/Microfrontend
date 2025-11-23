import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product.model';
import { INITIAL_PRODUCTS } from '../constants/products.constant';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private productSavedListener?: (event: Event) => void;

  ngOnInit(): void {
    // Load initial products from constant
    this.loadProducts();

    // Listen for product saved events from product form MFE
    this.productSavedListener = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.product) {
        const product: Product = customEvent.detail.product;
        if (customEvent.detail.isEdit) {
          this.updateProduct(product);
        } else {
          this.addProduct(product);
        }
      }
    };
    window.addEventListener('productSaved', this.productSavedListener);
  }

  ngOnDestroy(): void {
    if (this.productSavedListener) {
      window.removeEventListener('productSaved', this.productSavedListener);
    }
  }

  private loadProducts(): void {
    // Load from localStorage if available, otherwise use initial products
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    } else {
      this.products = [...INITIAL_PRODUCTS];
      this.saveProducts();
    }
  }

  private saveProducts(): void {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  onEdit(product: Product): void {
    // Dispatch event to notify product form MFE
    const event = new CustomEvent('editProduct', {
      detail: { product: { ...product } }
    });
    window.dispatchEvent(event);
  }

  onDelete(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.products = this.products.filter(p => p.id !== productId);
      this.saveProducts();
    }
  }

  private addProduct(product: Product): void {
    // Ensure unique ID
    const maxId = this.products.length > 0 
      ? Math.max(...this.products.map(p => p.id)) 
      : 0;
    product.id = maxId + 1;
    this.products.push(product);
    this.saveProducts();
  }

  private updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = { ...updatedProduct };
      this.saveProducts();
    }
  }
}

