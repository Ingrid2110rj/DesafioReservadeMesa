Cypress.Commands.add('clickUsuario', () => {
  //cy.get('.pro-sidebar-content > .pro-menu > ul > :nth-child(1)').click()
  //cy.get('div > button').click({ multiple: true })
  //cy.get('[title="Login"]').click()
  //cy.get('#card-body-user > div > button').click()
  cy.get('#dropdown-toggle').click()
  cy.get('#dropdown-menu-unit > :nth-child(1)').click({ force: true })
 
 
  cy.get(':nth-child(3) > #dropdown-toggle').click({ force: true })
  cy.get('#dropdown-menu-reserva > :nth-child(1)').click({ force: true })
  cy.get(':nth-child(4) > #dropdown-toggle').click({ force: true })
  cy.get('.mt-3.show > #dropdown-menu-unit > :nth-child(1)').click({ force: true })

})


Cypress.Commands.add('entrega', () => {
  cy.get('.PerfilColaborador_boxItens__hmtzC > :nth-child(1) > input').type('21555500')
  cy.get(':nth-child(3) > input', { timeout: 12000 }).type('206')
  cy.get(':nth-child(4) > input').type('casa 2')
  cy.get(':nth-child(8) > input', { timeout: 12000 }).type('975612544');
  cy.get('[type="submit"]').click({ force: true });
  cy.get('.Toastify__toast-body > :nth-child(2)').should('be.visible').and('have.text', 'Dados alterados com sucesso');

})


Cypress.Commands.add('reservaMesa', () => {
  cy.get('#dropdown-toggle').click();
  cy.get('#dropdown-menu-unit > :nth-child(1)').click({ force: true });
  cy.get(':nth-child(3) > #dropdown-toggle').click();
  cy.get('#dropdown-menu-reserva > :nth-child(1)').click({ force: true });
  cy.get(':nth-child(4) > #dropdown-toggle').click({ force: true })
  cy.get('.mt-3.show > #dropdown-menu-unit > :nth-child(1)').click({ force: true })
  cy.get('.DayPicker-NavButton--next').click();
  cy.get('[aria-label="Mon May 02 2022"]').click();
})
Cypress.Commands.add('confirmaReserva', () => {
  cy.get('input#64.seats').click();
  cy.get('input#64.seats').should('be.checked');
  cy.get('[value="Confirmar Seleção"]').click();
  cy.get('#button-form-reservarmesa').click();
  cy.get('#p-text').should('contain', 'Reserva concluída no nome de Ingrid Ferreira dos Santos para o(os) dia(as) selecionado(os), no setor Setor A da Unidade Blumenau.');
  cy.get('#button-fechar').click();
})


Cypress.Commands.add('editaReserva', () => {

  cy.get('#button_filtrar').click({ force: true });
  cy.get('tbody > tr > :nth-child(1)').should('contain', '2 May 2022');
  cy.get('#button_edit_consulta').click({ force: true });
  cy.get('#dropdown-toggle').click({ force: true });
  cy.get('#dropdown-menu-unit > :nth-child(1)').click({ force: true });
  cy.get(':nth-child(3) > #dropdown-toggle').click({ force: true });
  cy.get('#dropdown-menu-reserva > :nth-child(1)').click({ force: true });
  cy.get(':nth-child(4) > #dropdown-toggle').click({ force: true })
  cy.get('.mt-3.show > #dropdown-menu-unit > :nth-child(1)').click({ force: true })
  cy.get('.DayPicker-NavButton--next').click({ force: true });
  cy.get('[aria-label="Tue May 03 2022"]').click({ force: true });
  cy.get('input#64.seats').click({ force: true });
  cy.get('[value="Confirmar Seleção"]').click({ force: true });
  cy.get('#button-form-reservarmesa').click({ force: true });
  cy.get('#p-text').should('contain', 'Reserva editada no nome de Ingrid Ferreira dos Santos no Setor A andar para o dia 3 May 2022 na Unidade Blumenau.');
  cy.get('#button-fechar').click({ force: true });
  cy.get('tbody > tr > :nth-child(1)').should('contain', '3 May 2022');
  cy.get('#button_delete_consulta').click({ force: true });
})

Cypress.Commands.add('api', (method, rota) => {
  cy.request({
    method: method,
    url: rota,
    failOnStatusCode: false
  })
})

