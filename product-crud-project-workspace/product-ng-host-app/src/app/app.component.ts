import { Component, AfterViewInit, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('headerContainer', { read: ViewContainerRef }) headerContainer!: ViewContainerRef;
  @ViewChild('footerContainer', { read: ViewContainerRef }) footerContainer!: ViewContainerRef;
  @ViewChild('productListingContainer', { read: ViewContainerRef }) productListingContainer!: ViewContainerRef;
  @ViewChild('productFormContainer', { read: ViewContainerRef }) productFormContainer!: ViewContainerRef;

  ngAfterViewInit(): void {
    this.loadHeaderComponent();
    this.loadFooterComponent();
    this.loadProductListingComponent();
    this.loadProductFormComponent();
  }

  async loadHeaderComponent(): Promise<void> {
    try {
      const module = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './HeaderComponent'
      });
      const componentRef = this.headerContainer.createComponent(module.HeaderComponent);
    } catch (error) {
      console.error('Error loading header component:', error);
    }
  }

  async loadFooterComponent(): Promise<void> {
    try {
      const module = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './FooterComponent'
      });
      const componentRef = this.footerContainer.createComponent(module.FooterComponent);
    } catch (error) {
      console.error('Error loading footer component:', error);
    }
  }

  async loadProductListingComponent(): Promise<void> {
    try {
      const module = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './ProductListingComponent'
      });
      const componentRef = this.productListingContainer.createComponent(module.ProductListingComponent);
    } catch (error) {
      console.error('Error loading product listing component:', error);
    }
  }

  async loadProductFormComponent(): Promise<void> {
    try {
      const module = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4204/remoteEntry.js',
        exposedModule: './ProductFormComponent'
      });
      const componentRef = this.productFormContainer.createComponent(module.ProductFormComponent);
    } catch (error) {
      console.error('Error loading product form component:', error);
    }
  }
}
