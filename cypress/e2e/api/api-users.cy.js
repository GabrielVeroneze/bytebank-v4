describe('Realizando requisições para a API', () => {
    context('GET /users', () => {
        it('Deve retornar uma lista de usuários', () => {
            cy.request('GET', 'http://localhost:8000/users')
                .then(response => {
                    expect(response.status).to.eq(200)
                    expect(response.body).length.to.be.greaterThan(1)
                })
        })
    })

    context('GET /users/:userId', () => {
        it('Deve retornar um único usuário', () => {
            cy.request({
                method: 'GET',
                url: 'http://localhost:8000/users/7393be94-5598-49e3-9d78-b7a51a9ff34b',
            }).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('nome')
            })
        })

        it('Deve retornar um erro quando o usuário for inválido', () => {
            cy.request({
                method: 'GET',
                url: 'http://localhost:8000/users/7393be94-5598-49e3',
                failOnStatusCode: false,
            }).then(response => {
                expect(response.status).to.eq(404)
                expect(response.body).to.eq('Not Found')
            })
        })
    })
})
