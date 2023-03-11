
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Weather Devices', section => {

        });


        page.section('Update Frequency', section => {
            section.numberSetting('updateFrequency').name('Update every X minutes (0 for default)');

        });


    })

    .updated(async (context, updateData) => {

    })
