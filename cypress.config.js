const { defineConfig } = require("cypress");

module.exports = defineConfig({


  e2e:{ 
  chromeWebSecurity: false,
  
  
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  
  },

    viewportWidth: 375,
    viewportHeight: 812,

},
);
