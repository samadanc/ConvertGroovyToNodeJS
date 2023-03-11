
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('In addition to push notifications, send text alerts to...', section => {

        });


        page.section('Zip code (optional, defaults to location coordinates)...', section => {
            section.textSetting('zipcode').name('Zip Code');

        });


    })
