describe('FE test', () => {

    beforeEach('Navigates to the page at each start', () => {
        cy.visit('/')
    })

    it('assert request loaded', () => {
        cy.intercept('GET', '**/templates/modal/modal-slide.html').as('request')
        cy.visit('https://magento.softwaretestingboard.com/')

        cy.wait('@request').then((intercepted) => {
            expect(intercepted.response.statusCode).to.eq(200)
            expect(intercepted.response.body).to.contain('Magento')
        })
    })

    it('get search input, type', () => {
        //eq() - Get correct item if there are more items matching selector
        cy.get('button[class*="searchBtn"]').eq(1).click(0)
        cy.get('input[placeholder="Vyhledat"]').eq(1).type('Testování')
        cy.get('button[class*="searchBtn"]').eq(1).click()

        //Assert text is visible
        cy.contains('Search at tietoevry.com').should('be.visible')
    })

    it('assert text inside selected element vs. contains', () => {
        //Two approaches to get text, mind difference!
        cy.get('div[class*="heroImage"] h1').should('have.text', 'Vytváříme smysluplné technologie k budování lepšího světa')
        cy.contains('Vytváříme smysluplné technologie').should('be.visible')
    })

    it('asserting element within element', () => {
        //Note the assertion difference:
        cy.get('div[class*="col-md-"]').should('have.length', 17)

        //APPROACH 1
        //Here I'm getting main element
        cy.get('div[class="latest-releases-list"]').within((elementBlock) => {
            //Now Cypress works only within found item
            cy.get('div[class*="col-md-"]').should('have.length', 4)
            //Pros: I may do multiple actions here
            //Con: More difficult to read
        })

        //APPROACH 2
        //Cypress finds root item and then searches within in
        cy.get('div[class="latest-releases-list"]')
            .find('div[class*="col-md-"]')
            .should('have.length', 4)
    })

    it('asserting parent of selected element', () => {
        //Get parent of the element and assert its text
        cy.get('.country-indicator-txt')
            .parent()
            .should('contain.text', 'Vytváříme smysluplné technologie')
    })

    it('selector examples', () => {
        //Class selector
        cy.get('.country-indicator-txt').should('be.visible')
        //Attribute selector
        cy.get('div[class="latest-releases-list"]').should('be.visible')
        //ID
        cy.get('#navbarDropdown').should('be.visible')
        //Element type
        cy.get('button').should('be.visible')
    })
})