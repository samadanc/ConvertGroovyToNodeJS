
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this Virtual Switch is turned on / off :', section => {

        });


        page.section('Sync this Virtual Switch:', section => {

        });


    })
