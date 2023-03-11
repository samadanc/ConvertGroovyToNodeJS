
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('healthCheck', delay);

        context.api.schedules.runIn('updateServicePrefs', delay);

        context.api.schedules.runIn('sendDeviceRefreshCmd', delay);

    })
