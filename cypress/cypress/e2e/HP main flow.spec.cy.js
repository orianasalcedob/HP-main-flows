import { faker } from '@faker-js/faker';
export let fakerEmail = faker.internet.email()
export let fakerAddress = faker.address.city()
import '../support/component.js';

  // Suite HP
  describe('Casos HP', function() {
      
    before(function () {
        //Cargamos los valores del archivo example.json en un objeto de datos
        cy.fixture('Data Shipping and Billing').then(function (datos) {
            this.datos = datos
    })
    })

    beforeEach(() => {
        //Ingresamos a la landing page
    cy.visit('https://qa.platinum-ink.com/?utm_campaign=AC', {
    failOnStatusCode: false,
            auth: {
              username:'hp',
              password:'NewPrinter',
            }
        })
    })

    
    //Caso 01 flujo E2E
    it('Ejecución de fujo E2E', function (){
        fakerEmail =  faker.internet.email()
        fakerAddress =  faker.address.city()
        cy.get('.styles_button__AVQaf').click()


    // Encontrar la seccion de choose your printer
        //cy.get('.styles_rightSectionContainer__2OXh-').should('be.visible')

    //Hacer clic en la Professional Printer y confirmar que la selección de impresora sea correcta
        //cy.get('.styles_buttonContainer__yFoLs .styles_container__rGGRd .styles_textContainer__O-pKD .styles_title__qbvpE').should('contain.text', 'Essential')
        cy.wait(3000)
        cy.contains('Professional').click({force:true})
        //cy.get('.styles_containerSelected__H\+9Nz')
        .then((response) => {
            cy.log('The selection was succesful')
        //cy.get('.styles_title__qbvpE').should('contain.text','Professional')
        //cy.get('.styles_planType__orkFx').should('contain.text', 'Professional')

    //Hacer clic en el plan Frequent de 100 pages y confirmar que se haya seleccionado el plan correcto
    cy.wait(3000)    
    cy.contains('Business').click()

    //Add paper to my subscription y confirmar que se haya seleccionado correctamente
    cy.wait(3000)    
    cy.contains('Yes').click()

    //Validar el resumen y pasar al checkout
        cy.get('.styles_leftContainer__rdQPU > h1').should('contain.text','$','14.48','/month')
        cy.get('.styles_button__OfL0V').click()

    //Confirmar la info del plan seleccionado en la pantalla del checkout
        cy.get('.styles_cardWithInfo__9Ta6b').should('contain.text','My Plan')
        cy.get('.styles_cardWithInfo__9Ta6b').should('contain.text','Your plan costs:')
        cy.get('.styles_pricePerMonth__LoF5P').should('contain.text','$')
        cy.get('.styles_pricePerMonth__LoF5P').should('contain.text','43.48')
        cy.get('.styles_contentBox__7q6CW > :nth-child(3)').should('contain.text','HP OfficeJet Pro')
        cy.get('.styles_pagesSection__s5RZs > :nth-child(1)').should('contain.text','Includes 700 pages/month')
        cy.get('.styles_pagesSection__s5RZs > :nth-child(2)').should('contain.text','Paper: Yes')

    //Fill and Save shipping form

        cy.get('.styles_button__LgfQA').click()
        cy.get('#shipping-first-name').type(this.datos.FirstName)
        cy.get('#shipping-last-name').type(this.datos.LastName)
        cy.get('#shipping-company').type(this.datos.CompanyName)
        cy.get('#shipping-mobile-number').type(this.datos.MobileNumber)
        cy.get('#shipping-email').type(fakerEmail)
        cy.get('#shipping-street1').type(fakerAddress)
        cy.get('#shipping-street2').type(this.datos.StreetAddress2)
        cy.get('#shipping-city').type(this.datos.City)
        cy.get('.css-yfhigx').click()
        cy.get('#shipping-state-option-3').click()
        cy.get('#shipping-zip').type(this.datos.Zip)
        cy.get('.styles_button__vgeeK').click()

    //Fill and Save Billing form

        cy.get('[class="styles_button__SmAII css-13gwoo4"]').click({force: true})
         cy.get('#billing-name').type(this.datos.CardName)
         cy.fillElementsInput('cardNumber', '4242424242424242');
         cy.fillElementsInput('cardExpiry', '0929');
         cy.fillElementsInput('cardCvc', '123');
         cy.get('.styles_button__QSd6O').click()

      
          
    
    //Confirming the purchase

        cy.get('.styles_confirmButtonContainer__lliKg > .styles_button__IIKnL').click()
        cy.get('#billing-confirmation').check()
        cy.get('.styles_confirmButton__cxaJH').click()
        cy.get('.styles_title__VC7n0').should('contain.text','Thank you for\nchoosing HP Instant\nInk Platinum Service')
        .then((response) => {
            cy.log('The purchase was succesful')
          })
    
      
    // Caso 02      
    it('Validar que los CTAs de la landing funcionen bien', function (){
        cy.get('.styles_button__AVQaf').click()
        cy.url('https://qa.platinum-ink.com/printerSelection')
        cy.get('.styles_inkLogo__wSlYf').click()
        cy.get('.styles_button__5-EL0').click()
        cy.url('https://qa.platinum-ink.com/printerSelection')
        cy.get('.styles_inkLogo__wSlYf').click()
        //cy.get('.styles_button__+0l5i css-13gwoo4').click()
        //cy.url('https://qa.platinum-ink.com/printerSelection')
        cy.get('.styles_inkLogo__wSlYf').click()
        cy.get('.styles_customizePlanButton__tQVl6').click()
        cy.url('https://qa.platinum-ink.com/printerSelection')

        .then((response) => {
            cy.log('The CTAs are working ok')
          })


        })

        
        
       
        
      




    })
})
    })