
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Device Type', section => {
            section.enumSetting('deviceType').name('Which type of device do you want to search for?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('ssdpDiscover', delay);

    })
