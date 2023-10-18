const nameFixture = require('../fixtures/name.json')

let searchString = 'Testing'

describe('My first test', () => {

    it('Automation exercise Search products via form', () => {
        cy.request(
            {
                method: 'POST',
                url: 'https://automationexercise.com/api/searchProduct',
                form: true,
                body: 'search_product=top'
            }
        ).should((response) => {
            expect(response.status).to.equal(200)
            //Parse ugly JSON string into understandable json
            const json = JSON.parse(response.body);
            //Asserting first item (this is enough)
            console.log(json)
            expect(json.products[0].category.category).to.equal("Tops")
            //Asserting all items, easy style
            for(let i = 0; i < json.products.length; i++){
                //Yes, the endpoint returns something else than tops and should fail!
                expect(json.products[i].category.category).to.contain("Tops")
            }
        })
    })

    it('Try login as an existing user', () => {
        let userEmail = 'test1@example.com'

        cy.request(
            {
                method: 'POST',
                url: 'https://automationexercise.com/api/verifyLogin',
                form: true,
                body: {email: userEmail , password: 'test123'}
            }
        ).should((response) => {
            expect(response.status).to.equal(200)
            const json = JSON.parse(response.body);
            expect(json.message).to.equal("User exists!")
        })

        cy.request(
            {
                method: 'POST',
                url: 'https://automationexercise.com/api/getUserDetailByEmail?email=' + userEmail
            }
        ).should((response) => {
            expect(response.status).to.equal(200)
            const json = JSON.parse(response.body);
            expect(json.message).to.equal("User exists!")
        })
    })


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