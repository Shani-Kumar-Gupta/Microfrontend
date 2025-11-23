# Todo CRUD MicroFrontend Application

This workspace contains a Todo CRUD application built using Angular 16 and React 16 with Webpack Module Federation.

## Project Structure

```
todo-project-workspace/
├── todo-host-app/              # Host MFE App (Angular 16) - Port 4200
├── todo-listing-remote-app/   # Remote MFE App (Angular 16) - Port 4202
└── todo-create-remote-app/    # Remote MFE App (React 16) - Port 3001
```

## Features

1. **todo-listing-remote-app**: Displays a static list of todos with the ability to:
   - View all todos
   - Toggle todo completion status
   - Delete todos
   - See statistics (total, completed, pending)

2. **todo-create-remote-app**: Provides a form to create new todos:
   - Input field for todo item name
   - Form validation
   - Creates todos that automatically appear in the listing app

3. **todo-host-app**: Host application that integrates both remote microfrontends:
   - Loads both remote applications on a single route
   - Provides a unified UI for the complete Todo application

## Communication Between Microfrontends

The applications communicate using **CustomEvents**:
- When a todo is created in `todo-create-remote-app`, it dispatches a `todoCreated` event
- The `todo-listing-remote-app` listens for this event and updates its list accordingly
- Data is persisted in `localStorage` for persistence across page refreshes

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Setup Instructions

### 1. Install Dependencies

Navigate to each application directory and install dependencies:

```bash
# Host App
cd todo-host-app
npm install

# Listing Remote App
cd ../todo-listing-remote-app
npm install

# Create Remote App
cd ../todo-create-remote-app
npm install
```

### 2. Start the Applications

You need to start all three applications simultaneously. Open three terminal windows:

**Terminal 1 - Start Listing Remote App:**
```bash
cd todo-listing-remote-app
npm start
```
This will start the app on `http://localhost:4202`

**Terminal 2 - Start Create Remote App:**
```bash
cd todo-create-remote-app
npm start
```
This will start the app on `http://localhost:3001`

**Terminal 3 - Start Host App:**
```bash
cd todo-host-app
npm start
```
This will start the app on `http://localhost:4200`

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:4200
```

You should see:
- The Todo Create form on the left (React component)
- The Todo Listing on the right (Angular component)
- Both integrated seamlessly in the host application

## How It Works

1. **Module Federation Configuration**: Each remote app exposes its components via Webpack Module Federation
2. **Host Integration**: The host app loads remote components dynamically using `@angular-architects/module-federation`
3. **Event-Based Communication**: CustomEvents are used for cross-microfrontend communication
4. **Data Persistence**: Todos are stored in browser localStorage

## Development

### Building for Production

To build each application for production:

```bash
# Host App
cd todo-host-app
npm run build

# Listing Remote App
cd ../todo-listing-remote-app
npm run build

# Create Remote App
cd ../todo-create-remote-app
npm run build
```

## Troubleshooting

1. **CORS Issues**: Make sure all applications are running on their respective ports
2. **Module Not Found**: Ensure all remote applications are started before the host app
3. **React Component Not Loading**: Check that React 16 is properly installed and the webpack config is correct

## Technologies Used

- **Angular 16**: Host app and listing remote app
- **React 16**: Create remote app
- **Webpack 5**: Module Federation
- **TypeScript**: Type safety across all applications
- **SCSS**: Styling for Angular components
- **CSS**: Styling for React components

