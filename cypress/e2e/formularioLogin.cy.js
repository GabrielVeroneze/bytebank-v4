describe('Formulário de Login', () => {
    it('Deve acessar a página home', () => {
        cy.login('gabriel@email.com', 'senha123')
        cy.visit('/home')

        cy.getByData('titulo-boas-vindas')
            .should('contain', 'Bem vindo de volta!')
    })

    it('Não deve permitir um email inválido', () => {
        cy.getByData('botao-login').click()
        cy.getByData('email-input').type('exemplo@email')
        cy.getByData('senha-input').type('Senha123123')
        cy.getByData('botao-enviar').click()

        cy.getByData('mensagem-erro')
            .should('exist')
            .and('have.text', 'O email digitado é inválido')
    })

    it('Não deve permitir um campo em branco', () => {
        cy.getByData('botao-login').click()
        cy.getByData('senha-input').type('Senha123123')
        cy.getByData('botao-enviar').click()

        cy.getByData('mensagem-erro')
            .should('exist')
            .and('have.text', 'O campo email é obrigatório')
    })
})
