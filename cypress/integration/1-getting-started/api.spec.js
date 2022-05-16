describe('Testa API', () => {


  
    it('Listar usuários', () => {
      cy.api('GET', 'http://localhost:5000/cadastro')
        .then(response => {
          expect(response.status).to.equal(200)
          cy.log(JSON.stringify(response.body))
  
        })
    })
  
  
    it('Criar usuário', function () {
  
    
        cy.request({
          method: 'POST',
          url: 'http://localhost:5000/cadastro',
          failOnStatusCode: false,
          body: {
            'matricula': `000${i}`,
            "nome": nomes[i - 4]
          }
        }).then((res) => {
  
          expect(res.status).to.eq(201)
          expect(res.body).to.have.property('matricula', `000${i}`)
          expect(res.body).to.have.property('nome', nomes[i - 4])
        })
      
    })
  
    it('Atualizar usuário', function () {
  
      cy.request({
        method: 'PUT',
        url: 'http://localhost:5000/cadastro/4',
        failOnStatusCode: false,
        body: {
          'matricula': "0004",
          "nome": "Val"
        }
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.have.property('matricula', '0004')
        expect(res.body).to.have.property('nome', 'Val')
      })
  
    })
    it('Deletar usuário', function () {
      for (let i = 4; i <= 7; i++) {
        cy.request({
          method: 'DELETE',
          url: `http://localhost:5000/cadastro/${i}`,
          failOnStatusCode: false,
        }).then((res) => {
          if (i == 7) {
            expect(res.status).to.eq(404)
          }
          else {
            expect(res.status).to.eq(200)
            expect(res.body).not.have.property('matricula', `000${i}`)
            expect(res.body).not.have.property('nome', nomes[i - 4])
          }
        })
  
      }
  
  
    })
    it('Listar adm', () => {
  
      cy.api('GET', 'http://localhost:5000/adm')
        .then(response => {
          expect(response.status).to.equal(200)
          cy.log(JSON.stringify(response.body))
        })
    })
  
  
  })
  
  
  
  
  
  
  
  
  
  
  
