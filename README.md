Small PoC of Cypress interacting with SpreadJS object in an Angular application.

### Precondition
App under test must expose SpreadJS module to window context so that it can be visible by automation execution.  
```Javascript
import * as GC  from '@mescius/spread-sheets'
window["GC"] = GC
```

### Prerequisites:  
Option 1 (default): Clone, install and run demo app: https://github.com/sjimenezqac/AngularSpreadJSSample  
Option 2: Use SpreadJS provided demo app (not an Angular app): `cy.visit('https://developer.mescius.com/spreadjs/demos/sample/features/worksheet/initialize-sheet/purejs/')`

### Steps
1. `npm install`
2. `npx cypress run --browser chrome --headed --no-exit` , or, `npx cypress open`

<br/>

**NOTE:** Sleeps have been intentionally added for demo purposes. 
