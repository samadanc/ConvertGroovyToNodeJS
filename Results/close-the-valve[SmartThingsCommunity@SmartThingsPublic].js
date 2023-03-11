
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When water is sensed...', section => {
            section.deviceSetting('sensor').capability(['waterSensor']).name('Where?');

        });


        page.section('Close the valve...', section => {
            section.deviceSetting('valve').capability(['valve']).name('Which?');

        });


        page.section('Send this message (optional, sends standard status message if not specified)', section => {
            section.textSetting('messageText').name('Message Text');

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.enumSetting('pushAndPhone').name('Both Push and SMS?');

        });


        page.section('Minimum time between messages (optional)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'waterSensor', 'water', 'waterHandler')

    })

    .subscribedEventHandler('waterHandler', (context, event) => {
        
        console.log("Sensor says ${event.value}")
        if (event.value == 'wet') {
        
        context.api.devices.sendCommands(context.config.valve, 'valve', close)
    
        }
        if (frequency) {
        let lastTime = state[event.deviceId]
        if (lastTime == null || this.now() - lastTime >= frequency * 60000) {
        this.sendMessage(evt)
        }
        } else {
        this.sendMessage(evt)
        }
        

	})
