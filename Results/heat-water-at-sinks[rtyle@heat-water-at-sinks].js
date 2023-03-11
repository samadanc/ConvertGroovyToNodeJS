
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Home', section => {
            section.deviceSetting('pump').capability(['switch']).name('Pump');
            section.deviceSetting('valves').capability(['valve']).name('Valves');
            section.numberSetting('count').name('Triggers');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.valves, 'valve', 'valve', 'respondToValve')

    })
