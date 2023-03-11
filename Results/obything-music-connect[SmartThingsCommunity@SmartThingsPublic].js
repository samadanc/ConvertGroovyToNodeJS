
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Get the IP address and port for your Mac computer using the ObyThing App (http://obything.obycode.com) and set up the SmartApp below:', section => {

        });


        page.section('on this hub...', section => {

        });


    })
