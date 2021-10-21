///  <reference types="cypress" />

// for this test, support/index.js had a line added to 
// handle cross-orgin request errors

describe("Render TB12, unauth, desktop", ()=>{

  beforeEach(() => {
    // set view port to desktop and
    // visit the page
    cy.viewport('macbook-15')
    cy.visit('https://www.pro-football-reference.com/players/B/BradTo00.htm')
    
    // load anything that might be lazy loaded
    cy.scrollTo('center')
    cy.wait(500)
    cy.scrollTo('bottom')
    cy.wait(500)
    cy.scrollTo('top')
    cy.wait(500)
  })
    
  it('Check for basic info', ()=>{
    // I would replace 'Tom Brady' with something 
    // a little more dynamic in production
    cy.get('#info').should('contain', 'Tom Brady')
  })

  it('Check for stat tables', ()=>{
    cy.contains('Passing')
    cy.get('#passing').should('exist')
    cy.contains('Rushing & Receiving')
    cy.get('#rushing_and_receiving').should('exist')
  })
  
  it('Check for ads', ()=>{
    // looking for the specific "Join Stathead" ad
    cy.get('#content > div.callout.light.stathead_player_highlight')
      .should('exist')
  })

  it('Check for socials', ()=>{
    cy.get('svg.icon').should('exist')
  })

})

// Simple smoke tests, but I stopped here because it's not a dev environment.
// In production, I would create a few more cases for unauthenticated and 
// different window sizes, and then encapsulate them in a custom command.
// Lastly, I would rewrite it so that it took a name for a parameter and then 
// run the custom command on every name in a list of names.