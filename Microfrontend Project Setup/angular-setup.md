# Angular HOST and Remote MFE Setup:

### Angular Host Application Setup:
* Install Angular CLI 16<br>
```npm install -g @angular/cli@16```
* Create Host Application<br>
```ng new angular-host --routing --style=scss```<br>
```cd angular-host```
* Add Module Federation Plugin (Angular 16)<br>
```npm install @angular-architects/module-federation@16.0.4 --save-dev```
```ng add @angular-architects/module-federation```

### Angular Remote Application Setup:
```cd ..```<br>
```ng new header-mfe --routing --style=scss```<br>
```cd header-mfe```<br>
```npm install @angular-architects/module-federation@16.0.4 --save-dev```<br>
```ng add @angular-architects/module-federation --project header-mfe --port 4201 --type remote```