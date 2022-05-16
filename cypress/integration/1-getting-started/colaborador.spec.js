// <reference types = "cypress" />

import dayjs from 'dayjs'

const lista = []

describe('Reserva de Mesas via colaborador', () => {

  beforeEach(() => {

    Cypress.on('uncaught:exception', (err, runnable) => {

      return false
    })
    cy.visit('/')


  })

  it('Valida unidades de trabalho', () => {

    cy.api('GET', 'http://localhost:5000/unidades').then((response) => {
      const unidade = response.body
      const unidades = []
      for (const obj of unidade) {
        unidades.push(obj.name)

      }
      cy.get('#dropdown-toggle').click()
      for (let i = 1; i <= unidades.length; i++) {
        cy.get(`#dropdown-menu-unit > :nth-child(${i})`).should('have.text', unidades[i - 1])
      }
    })
  })

  it('Valida o limite de 15 dias de reserva', () => {



    var mes = new Date(2022, 4, 1);
    for (let i = 1; i <= 23; i++) {
      mes.setDate(`${i}`);
      const semana = mes.toDateString();
      cy.log(semana);

      lista.push(semana);;

    }
    var resultado = lista.filter(weekend => (weekend.charAt(0) != "S"));

    cy.clickUsuario()
    cy.get('.DayPicker-NavButton--next').click();

    for (let i = 1; i <= resultado.length; i++) {
      cy.get(`[aria-label="${resultado[i - 1]}"]`).click();



    }
    cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'O limite de reservas é 15 dias')

  })


  it('Valida reserva sem selecionar a mesa', function () {

    cy.reservaMesa();
    cy.on('window:alert', (selecionarmesa) => {
      expect(selecionarmesa).to.equal(`Por favor selecione uma mesa`)
    })

  })

  it('Reserva para usuário/data/andar válidos', function () {

    for (let i = 1; i <= 2; i++) {

      if (i == 1) {

        cy.reservaMesa();
        cy.confirmaReserva();
      }
      else {

        cy.reservaMesa();
        cy.get('.Toastify__toast-body > :nth-child(2)').should('be.visible');
      }
    }

  })


  it('Valida edição/cancelamento de reservas', function () {

    cy.get('#iconAdmin').click();
    const dayBefore = dayjs().subtract(1, 'day').format('DD-MM-YYYY');
    const dayAfter = dayjs().add(60, 'day').format('DD-MM-YYYY');
    cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > input').clear();
    cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(`${dayBefore}`);
    cy.get('#button_filtrar').click();
    cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > input').should('not.have.value', `${dayBefore}`);
    cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(`${dayAfter}`);
    cy.editaReserva();
    cy.on('window:alert', (cancelamento) => {
      expect(cancelamento).to.equal(`Deseja realmente cancelar sua reserva?`)

    })

  })

  const usuarios = require('../../fixtures/usuario.json');

  it('Valida perfil do usuário', function () {


    cy.get('#dropdown-item-button-perfil').click();
    cy.get('#dropdown-item-button-item-perfil').click();
    cy.get('#nome', { timeout: 22000 }).should('have.value', usuarios.nome);
    cy.get('#Nascimento').should('have.value', usuarios.nascimento);
    cy.get('#matricula').should('have.value', usuarios.matricula);
    cy.get('#Admissão').should('have.value', usuarios.admissão);
    cy.get('#email').should('have.value', usuarios.email);
    cy.get('#cargo').should('have.value', usuarios.cargo);
    cy.get('#lider').should('have.value', usuarios.lider);
    cy.get('#cpf').should('have.value', usuarios.cpf);


    const dados = ['Presentes', 'camisa', 'babylook', 'calçado', 'tipoBebida', 'lactose', 'gluten']

    for (let i = 1; i <= dados.length; i++) {

      cy.xpath(`//*[@id="${dados[i - 1]}"]//option`).then(($elements) => {
        const randomOption = Math.floor(Math.random() * $elements.length);
        cy.xpath(`//*[@id="${dados[i - 1]}"]`).select(`${$elements[randomOption].innerText}`);
        cy.log(`random option selected is ${$elements[randomOption].innerText}}`);
      })
    }
    cy.get('#bebida').type('Guaraná Antarctica').clear();
    cy.get('#bebida').type('Guaraná Antarctica');
    cy.get('#intoleranciasOuPreferencias').clear();
    cy.get('#intoleranciasOuPreferencias').should('be.visible').type('camarão');
    cy.entrega();




  })
})
