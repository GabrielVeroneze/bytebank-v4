describe('Realizando requisições para a API', () => {
    beforeEach(() => {
        Cypress.session.clearAllSavedSessions()
    })

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

    context('Interceptando solicitações de rede', () => {
        it('Deve fazer a interceptação do POST users/login', () => {
            cy.intercept('POST', 'users/login').as('loginRequest')
            cy.login('gabriel@email.com', 'senha123')
            cy.wait('@loginRequest').then(interception => {
                interception.response = {
                    statusCode: 200,
                    body: {
                        success: true,
                        message: 'Login bem sucedido!',
                    },
                }
            })
            cy.visit('/home')

            cy.getByData('titulo-boas-vindas')
                .should('contain.text', 'Bem vindo de volta!')
        })
    })

    context('Teste método PUT da API Usuários', () => {
        it('Atualiza informações do usuário com sucesso', () => {
            const usuario = {
                nome: 'Marcos Vinicius Neves',
                senha: '123456',
            }

            cy.request({
                method: 'PUT',
                url: 'http://localhost:8000/users/c691fd15-dcd5-4f24-89da-cdfa3cef9d67',
                body: usuario,
                failOnStatusCode: false,
            }).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body.nome).to.eq(usuario.nome)
                expect(response.body.senha).to.eq(usuario.senha)
            })
        })

        it('Retorna erro 404 para usuário inexistente', () => {
            const usuario = {
                nome: 'Nome Inválido',
                senha: '123456',
            }

            cy.request({
                method: 'PUT',
                url: 'http://localhost:8000/users/usuario-inexistente',
                body: usuario,
                failOnStatusCode: false,
            }).then(response => {
                expect(response.status).to.eq(404)
                expect(response.body).to.eq('Not Found')
            })
        })
    })
})
