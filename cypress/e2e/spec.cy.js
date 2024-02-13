
const THEN_TIMEOUT = 10000

function sleep(time){
  return new Promise(res => setTimeout(res, time))
}

describe('Cypress-SpreadJS POC', () => {

  it('Reads and writes values', async () => {
    cy.log('Opening url')
    // Condition: GC module needs to be exposed to the Window Object. Be able to do GC in the console.
    // cy.visit('https://developer.mescius.com/spreadjs/demos/sample/features/worksheet/initialize-sheet/purejs/')
    cy.visit('http://localhost:4200/') 
    
    // Get instance of spreadsheet
    
    cy.window().then({timeout:THEN_TIMEOUT}, async (appWindow) => {  // Timeout and sleep defined just for demo purposes
        let spreadHostElement = appWindow.document.querySelector('[gcuielement="gcSpread"]');
        let spreadInstance = appWindow.GC.Spread.Sheets.findControl(spreadHostElement);
        const sheet = spreadInstance.getActiveSheet();
        
        // Test values
        const SLEEP_TIME = 800
        const INPUT_VAL = 'Welcome to the Cypress-SpreadJS demo'
        let Val1 = 3
        let Val2 = 5
        let sumRes = Val1 + Val2
        let minRes = Math.min(Val1, Val2)

        // Set value in a cell
        cy.log('Setting the title and labels')
        cy.then({timeout:THEN_TIMEOUT}, async () => {
          sheet.setValue(0,0,INPUT_VAL)
  
          // Write labels
          await sleep(SLEEP_TIME)
          sheet.setValue(1,0,'Val 1')
          await sleep(SLEEP_TIME)
          sheet.setValue(2,0,'Val 2')
          await sleep(SLEEP_TIME)
          sheet.setValue(3,0,'SUM=')
          await sleep(SLEEP_TIME)
          sheet.setValue(4,0,'MIN=')

        })

        cy.log('Setting Values')
        cy.then({timeout:THEN_TIMEOUT}, async ()=>{
          await sleep(SLEEP_TIME)
          sheet.setValue(1,1,Val1)
          await sleep(SLEEP_TIME)
          sheet.setValue(2,1,Val2)
      
          // Enter formulas
          await sleep(SLEEP_TIME)
          sheet.setFormula(3,1,'=B2+B3')
          await sleep(SLEEP_TIME)
          sheet.setFormula(4,1, '=MIN(B2:B3)')
      
          // Read results from formula cells
          let sumResInSS = sheet.getValue(3,1)
          let minResInSS = sheet.getValue(4,1)
          
          // Verify results
          cy.log(`SUM value = ${sumResInSS}`)
          cy.log(`MIN value =  ${minResInSS}`)
          cy.then(()=>{
            expect(sumResInSS).to.equal(sumRes)
            expect(minResInSS).to.equal(minRes)
          })
        })
    
    })

  })

})