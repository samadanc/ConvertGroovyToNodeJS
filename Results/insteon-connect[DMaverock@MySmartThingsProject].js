
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Add a New Insteon Device'', section => {

        });


        page.section(''Initial Install'', section => {

        });


    })
