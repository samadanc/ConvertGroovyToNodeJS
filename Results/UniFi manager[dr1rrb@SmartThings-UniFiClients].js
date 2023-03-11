
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Download and run the SmartThings UniFi client presence application, then tap \'Next\' to start the discovery.'', section => {

        });


        page.section('Send notification when the UniFi controller goes offline?', section => {

        });


    })
