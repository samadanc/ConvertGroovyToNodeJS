
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Change status of the following Nest(s)...', section => {
            section.deviceSetting('nest').capability(['thermostat']).name('');

        });


        page.section('To home with the following mode...', section => {

        });


        page.section('To away with the following mode...', section => {

        });


        page.section(''Version 1.0.1'', section => {

        });


    })

    .updated(async (context, updateData) => {

    })
