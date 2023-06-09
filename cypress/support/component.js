
import './commands'
import 'cypress-plugin-stripe-elements';
import './component.js';

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getSelectorForField = function (name) {
    return "input[data-elements-stable-field-name=\"" + name + "\"]";
};
Cypress.Commands.add('fillElementsInput', function (field, value) {
    if (Cypress.config('chromeWebSecurity')) {
        throw new Error("You must set `{ \"chromeWebSecurity\": false }` in `cypress.json`, " +
            "or cypress-plugin-stripe-elements cannot access the Stripe Elements " +
            "<iframe> to perform autofill.");
    }
    var selector = getSelectorForField(field);
    cy
        .get('iframe')
        .should(function (iframe) { return expect(iframe.contents().find(selector)).to.exist; })
        .then(function (iframe) { return cy.wrap(iframe.contents().find(selector)); })
        .within(function (input) {
        /**
         * The .should("not.be.disabled") check implements a Cypress-team-recommended
         * workaround for cases where the iframe isn't completely loaded,
         * so Cypress fails on the type() command because the input is
         * temporarily disabled.
         *
         * See https://github.com/cypress-io/cypress/issues/5827#issuecomment-751995883
         */
        cy
            .wrap(input)
            .should("not.be.disabled")
            .clear()
            .type(value);
    });

    // cypress/support/index.js

Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test
    return false;
  });
  
});
