describe('Testando dispositivos móveis', () => {
    it('Deve existir um botão menu burguer', () => {
        cy.viewport(375, 667)
        cy.visit('/')

        cy.getByData('botao-login').click()
        cy.getByData('email-input').type('gabriel@email.com')
        cy.getByData('senha-input').type('senha123')
        cy.getByData('botao-enviar').click()

        cy.location('pathname').should('equal', '/home')

        cy.getByData('menu-burguer').click()
        cy.getByData('menu-lateral').find('a').eq(3).click()

        cy.location('pathname').should('equal', '/home/investimentos')
    })
})

describe('Menu de navegação burguer icon', () => {
    context('Resolução do iphone xr', () => {
        beforeEach(() => {
            cy.viewport('iphone-xr')
        })

        it('Deve exibir um botão menu burguer', () => {
            cy.visit('/')

            cy.getByData('botao-login').click()
            cy.getByData('email-input').type('gabriel@email.com')
            cy.getByData('senha-input').type('senha123')
            cy.getByData('botao-enviar').click()

            cy.location('pathname').should('equal', '/home')

            cy.getByData('menu-burguer').should('be.visible')
        })
    })

    context('Resolução do mackbook 13 ', () => {
        beforeEach(() => {
            cy.viewport('macbook-13')
        })

        it('Não deve exibir um botão menu burguer', () => {
            cy.visit('/')

            cy.getByData('botao-login').click()
            cy.getByData('email-input').type('gabriel@email.com')
            cy.getByData('senha-input').type('senha123')
            cy.getByData('botao-enviar').click()

            cy.location('pathname').should('equal', '/home')

            cy.getByData('menu-burguer').should('not.be.visible')
        })
    })
})
