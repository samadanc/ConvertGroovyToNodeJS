
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Insteon Dimmer Name'', section => {

        });


        page.section('Hub Settings', section => {

        });


        page.section('Add an Insteon Dimmer Device', section => {

        });


    })
