describe('Formulário de Cadastro', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('Usuário deve conseguir se cadastrar com sucesso', () => {
        cy.getByData('botao-cadastro').click()
        cy.getByData('nome-input').type('Gabriel Veroneze')
        cy.getByData('email-input').type('gabriel@email.com')
        cy.getByData('senha-input').type('senha123')
        cy.getByData('checkbox-input').check()
        cy.getByData('botao-enviar').click()

        cy.getByData('mensagem-sucesso')
            .should('exist')
            .and('have.text', 'Usuário cadastrado com sucesso!')
    })

    it('Não deve permitir o cadastro de usuários sem o campo nome preenchido', () => {
        cy.getByData('botao-cadastro').click()
        cy.getByData('email-input').type('exemplo@email.com')
        cy.getByData('senha-input').type('Senha123123')
        cy.getByData('botao-enviar').click()

        cy.getByData('mensagem-erro')
            .should('exist')
            .and('have.text', 'O campo de nome é obrigatório')
    })
})
