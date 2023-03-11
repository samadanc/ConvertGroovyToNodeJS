
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow External Service to Control These Things...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Which Switches?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'onSwitchOff')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'onSwitchOn')

    })
