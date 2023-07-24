const { defineConfig } = require("cypress");

module.exports = defineConfig({


  e2e:{ 
  chromeWebSecurity: false,
  
  
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  
  },

    viewportWidth: 1440,
    viewportHeight: 1024,

},
);
