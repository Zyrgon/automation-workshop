const dogInfo = require('../fixtures/dog.json')

describe('API tests', () => {
    let name = dogInfo.name

    it('An API Request Test', () => {
        //Getting response from browserstack demo website
        cy.request({
                method: 'POST',
                url: 'https://petstore.swagger.io/v2/pet',
                headers: {
                    Authorization: 'Basic AHOJ',
                    'x-test': 'Test'
                },
                body: {
                    'id': 14,
                    'category': {
                        'id': 1,
                        'name': dogInfo.category
                    },
                    'name': name,
                    'status': 'available'
                }
            }
        ).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.name).to.contain('Doggie')
            expect(response.body.category.name).to.contain('Dog')
            cy.wrap(response.body.id).as('petId')
        })

        cy.get('@petId').then(petId => {
            cy.request({
                    method: 'GET',
                    url: 'https://petstore.swagger.io/v2/pet/' + petId,
                    headers: {Authorization: 'Basic AHOJ'}
                }
            ).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.contain(name)
            })
        })
    })
})