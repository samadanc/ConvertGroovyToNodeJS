
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this presence is on', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('');

        });


        page.section('Simulate motion', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log(event.value)
        if (event.value == 'present') {
        console.log("Simulating motion: $motion1")
        
        context.api.devices.sendCommands(context.config.motion1, 'motionSensor', active)
    
        this.runIn(30, 'deactivateMotion')
        }
        

	})
