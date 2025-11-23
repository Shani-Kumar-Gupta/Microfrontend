# Product CRUD MicroFrontend Application Setup Guide

This is a MicroFrontend application built with Angular 16 and Webpack Module Federation. The application consists of one Host application and four Remote applications.

## Application Structure

### Host Application
- **product-ng-host-app** (Port: 4200)
  - Integrates all remote microfrontends into a single application

### Remote Applications
1. **header-ng-mfe-remote-app** (Port: 4201)
   - Displays application title and like count
   - Receives like count updates from footer

2. **footer-remote-app** (Port: 4203)
   - Displays footer section with like button
   - Updates like count in header when button is clicked

3. **product-listing-mfe-remote-app** (Port: 4202)
   - Displays list of products with Edit and Delete buttons
   - Manages static product data
   - Communicates with product form for editing

4. **product-create-updated-remote-app** (Port: 4204)
   - Form for creating and updating products
   - Receives product data for editing from product listing
   - Updates product list when products are created/updated

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Angular CLI 16

## Installation Steps

### 1. Install Dependencies for All Applications

Navigate to each application directory and install dependencies:

```bash
# Host App
cd product-ng-host-app
npm install

# Header Remote App
cd ../header-ng-mfe-remote-app
npm install

# Footer Remote App
cd ../footer-remote-app
npm install

# Product Listing Remote App
cd ../product-listing-mfe-remote-app
npm install

# Product Create/Update Remote App
cd ../product-create-updated-remote-app
npm install
```

## Running the Application

### Option 1: Run Each Application Separately (Recommended for Development)

Open 5 separate terminal windows/tabs and run each application:

**Terminal 1 - Host App:**
```bash
cd product-ng-host-app
npm start
```
Access at: http://localhost:4200

**Terminal 2 - Header Remote App:**
```bash
cd header-ng-mfe-remote-app
npm start
```
Runs on: http://localhost:4201

**Terminal 3 - Footer Remote App:**
```bash
cd footer-remote-app
npm start
```
Runs on: http://localhost:4203

**Terminal 4 - Product Listing Remote App:**
```bash
cd product-listing-mfe-remote-app
npm start
```
Runs on: http://localhost:4202

**Terminal 5 - Product Create/Update Remote App:**
```bash
cd product-create-updated-remote-app
npm start
```
Runs on: http://localhost:4204

### Option 2: Using Concurrent Execution (if you have npm-run-all or concurrently)

You can create a script to run all applications concurrently. However, for Module Federation, it's recommended to run them separately to see individual logs.

## Application Features

### 1. Header Component
- Displays "Product CRUD Application" title
- Shows current like count
- Updates automatically when footer like button is clicked

### 2. Footer Component
- Displays footer with copyright information
- Contains a like button
- Updates like count in header when clicked
- Like count persists in localStorage

### 3. Product Listing Component
- Displays grid of products with:
  - Product name
  - Product description
  - Product price
  - Edit button
  - Delete button
- Initial products are loaded from constants
- Products are stored in localStorage
- Edit button populates form in Product Form component
- Delete button removes product from list

### 4. Product Form Component
- Form fields:
  - Product Name (required, min 3 characters)
  - Product Description (required, min 10 characters)
  - Price (required, must be > 0)
- Create mode: Creates new product
- Edit mode: Updates existing product
- Form validation with error messages
- Automatically updates product list when saved

## Inter-MicroFrontend Communication

The applications communicate using Custom Events:

1. **Like Count Communication:**
   - Footer dispatches `likeCountUpdated` event
   - Header listens for `likeCountUpdated` event

2. **Product Communication:**
   - Product Listing dispatches `editProduct` event when Edit button is clicked
   - Product Form listens for `editProduct` event
   - Product Form dispatches `productSaved` event when product is created/updated
   - Product Listing listens for `productSaved` event

## Data Persistence

- Like count is stored in localStorage
- Products are stored in localStorage
- Data persists across page refreshes

## Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Ensure all applications are running on their respective ports
   - Check that remoteEntry.js files are accessible

2. **Module Not Found:**
   - Verify all applications are running
   - Check webpack.config.js remoteEntry URLs
   - Clear browser cache and reload

3. **Components Not Loading:**
   - Check browser console for errors
   - Verify ViewChild containers are properly initialized
   - Ensure AfterViewInit is used instead of OnInit for ViewChild access

4. **Port Conflicts:**
   - Ensure no other applications are using ports 4200-4204
   - Check angular.json for correct port configurations

## Build for Production

To build each application for production:

```bash
cd <application-directory>
npm run build
```

The built files will be in the `dist/` directory of each application.

## Project Structure

```
product-crud-project-workspace/
├── product-ng-host-app/          # Host application
├── header-ng-mfe-remote-app/     # Header remote
├── footer-remote-app/             # Footer remote
├── product-listing-mfe-remote-app/ # Product listing remote
└── product-create-updated-remote-app/ # Product form remote
```

## Notes

- All applications use Angular 16
- Module Federation is configured using @angular-architects/module-federation
- Communication between MFEs uses Custom Events (window events)
- Data persistence uses localStorage
- All applications share Angular dependencies as singletons

