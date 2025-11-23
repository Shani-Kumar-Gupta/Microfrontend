# Quick Setup Guide

## Step-by-Step Setup

### 1. Install Dependencies for All Apps

```bash
# Navigate to workspace
cd todo-project-workspace

# Install host app dependencies
cd todo-host-app
npm install
cd ..

# Install listing remote app dependencies
cd todo-listing-remote-app
npm install
cd ..

# Install create remote app dependencies
cd todo-create-remote-app
npm install --legacy-peer-deps
cd ..
```

### 2. Start All Applications

You need **3 terminal windows** open simultaneously:

#### Terminal 1 - Listing Remote (Angular)
```bash
cd todo-listing-remote-app
npm start
```
**Runs on:** http://localhost:4202

#### Terminal 2 - Create Remote (React)
```bash
cd todo-create-remote-app
npm start
```
**Runs on:** http://localhost:3001

#### Terminal 3 - Host App (Angular)
```bash
cd todo-host-app
npm start
```
**Runs on:** http://localhost:4200

### 3. Access the Application

Open your browser and go to:
```
http://localhost:4200
```

## Expected Behavior

1. **Create Todo**: Enter a todo name in the form and click "Create Todo"
2. **View Todo**: The newly created todo should appear in the listing section
3. **Toggle Complete**: Click the checkbox to mark a todo as complete
4. **Delete Todo**: Click the "Delete" button to remove a todo
5. **Persistence**: Todos are saved in localStorage and persist across page refreshes

## Troubleshooting

### Issue: "Cannot find module" errors
**Solution**: Make sure all three applications are running before accessing the host app.

### Issue: React component not loading
**Solution**: 
- Check that React app is running on port 3001
- Verify webpack config in todo-create-remote-app
- Check browser console for errors

### Issue: Angular component not loading
**Solution**:
- Check that Angular listing app is running on port 4202
- Verify webpack config in todo-listing-remote-app
- Check browser console for errors

### Issue: Todos not updating between apps
**Solution**:
- Check browser console for CustomEvent errors
- Verify localStorage is enabled in your browser
- Check that both apps are listening for the 'todoCreated' event

## Port Configuration

- **Host App**: 4200
- **Listing Remote**: 4202
- **Create Remote**: 3001

If you need to change ports, update:
1. `angular.json` (serve.port) for Angular apps
2. `webpack.config.js` (devServer.port) for React app
3. `webpack.config.js` (remotes URLs) in host app

