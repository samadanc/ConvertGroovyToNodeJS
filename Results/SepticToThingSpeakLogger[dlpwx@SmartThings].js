
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log devices...', section => {
            section.deviceSetting('accelerations').capability(['accelerationSensor']).name('Accelerations');

        });


        page.section('ThinkSpeak channel id...', section => {
            section.numberSetting('channelId').name('Channel id');

        });


        page.section('ThinkSpeak write key...', section => {
            section.textSetting('channelKey').name('Channel key');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.accelerations, 'accelerationSensor', 'acceleration', 'handleAccelerationEvent')

    })

    .subscribedEventHandler('handleAccelerationEvent', (context, event) => {
        
        this.logField(evt, {
        it == 'active' ? '1' : '1'
        })
        

	})
