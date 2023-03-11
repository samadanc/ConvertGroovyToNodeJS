
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Title'', section => {

        });


        page.section('Days', section => {
            section.enumSetting('days').name('Day Pattern');

        });


        page.section(''Times'', section => {

        });


    })
