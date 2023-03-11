
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Username and Password', section => {
            section.textSetting('particleUsername').name('Your Particle.io Username');

        });


    })
