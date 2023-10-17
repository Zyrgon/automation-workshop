const nameFixture = require('../fixtures/name.json')

let searchString = 'Testing'

describe('My first test', () => {

    xit('Create pet', () => {
        cy.request('POST', 'https://petstore.swagger.io/v2/pet', {
            "id": 15,
            "category": {
                "id": 1,
                "name": "Dogs"
            },
            "name": "Doggie",
            "status": "available"
        }).should((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.id).to.equal(15)
        })
    })

    xit('Create pet with header', () => {
        cy.request({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/pet',
            headers: {
                Authorization: 'Bearer klicsfgfsjgfdojghsroighfsogjnflds',
                Test: 'Ahoj'
            },
            body: {
                "id": 15,
                "category": {
                    "id": 1,
                    "name": "Dogs"
                },
                "name": nameFixture.name,
                "status": "available"
            }
        }).should((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.id).to.equal(15)
        })
    })

    it('Search at Tietoevry', () => {
        cy.visit('https://www.tietoevry.com/')

        cy.contains('button', 'Accept only necessary').click()

        cy.get('div[class*=hidden-sm] button[class*=searchBtn]').click()
        cy.get('div[class*=hidden-sm] input').click().type('Testing')
        cy.get('div[class*=hidden-sm] button[class*=searchBtn]').click()

        cy.contains('The search for "Testing"').should('be.visible')
        cy.get('div[class=searchResultList] a').should('have.length.at.least', 1)
    })
})