# Product CRUD MicroFrontend Application

A complete MicroFrontend application built with Angular 16 and Webpack Module Federation, demonstrating inter-microfrontend communication and component sharing.

## Overview

This project implements a Product CRUD (Create, Read, Update, Delete) application using MicroFrontend architecture. The application is split into multiple independent microfrontends that communicate with each other.

## Architecture

### Host Application
- **product-ng-host-app** - Main host application that integrates all remote microfrontends

### Remote MicroFrontends
1. **header-ng-mfe-remote-app** - Header with title and like count display
2. **footer-remote-app** - Footer with like button functionality
3. **product-listing-mfe-remote-app** - Product listing with Edit/Delete functionality
4. **product-create-updated-remote-app** - Product create/update form

## Key Features

✅ Module Federation setup with Angular 16
✅ Inter-microfrontend communication using Custom Events
✅ Product CRUD operations
✅ Like count synchronization between header and footer
✅ Data persistence using localStorage
✅ Responsive design
✅ Form validation
✅ Static product data management

## Quick Start

See [SETUP.md](./SETUP.md) for detailed installation and setup instructions.

### Quick Run Commands

```bash
# Terminal 1 - Host App (Port 4200)
cd product-ng-host-app && npm install && npm start

# Terminal 2 - Header (Port 4201)
cd header-ng-mfe-remote-app && npm install && npm start

# Terminal 3 - Footer (Port 4203)
cd footer-remote-app && npm install && npm start

# Terminal 4 - Product Listing (Port 4202)
cd product-listing-mfe-remote-app && npm install && npm start

# Terminal 5 - Product Form (Port 4204)
cd product-create-updated-remote-app && npm install && npm start
```

Then open http://localhost:4200 in your browser.

## Communication Flow

### Like Count Flow
1. User clicks like button in Footer
2. Footer dispatches `likeCountUpdated` event
3. Header listens and updates like count display

### Product Flow
1. User clicks Edit in Product Listing
2. Product Listing dispatches `editProduct` event with product data
3. Product Form receives event and populates form
4. User updates and saves product
5. Product Form dispatches `productSaved` event
6. Product Listing receives event and updates the list

## Technology Stack

- **Framework:** Angular 16
- **Module Federation:** @angular-architects/module-federation
- **Build Tool:** Webpack 5
- **Styling:** SCSS
- **Communication:** Custom Events (window events)

## Project Structure

```
product-crud-project-workspace/
├── product-ng-host-app/              # Host MFE (Port 4200)
├── header-ng-mfe-remote-app/        # Header Remote (Port 4201)
├── footer-remote-app/                # Footer Remote (Port 4203)
├── product-listing-mfe-remote-app/   # Listing Remote (Port 4202)
├── product-create-updated-remote-app/ # Form Remote (Port 4204)
├── SETUP.md                          # Detailed setup guide
└── README.md                         # This file
```

## Development

Each microfrontend can be developed and deployed independently. They communicate through:
- Custom Events for real-time updates
- localStorage for data persistence
- Shared Angular dependencies (singletons)

## License

This project is for educational and demonstration purposes.

