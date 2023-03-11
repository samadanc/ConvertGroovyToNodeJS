
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'runRefresh')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'runRefresh')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'runRefresh')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'runRefresh')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'runRefresh')

    })
