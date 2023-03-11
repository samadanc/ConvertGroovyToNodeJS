
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Set the sensors', section => {
            section.deviceSetting('sensorMotion').capability(['motionSensor']).name('Pick your motion sensors');
            section.deviceSetting('sensorDoor').capability(['contactSensor']).name('Pick your contact sensors');

        });


        page.section('Set the logger', section => {
            section.deviceSetting('logger').capability(['notification']).name('Pick your logger');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensorDoor, 'contactSensor', 'contact', 'communicateEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.sensorMotion, 'motionSensor', 'motion', 'communicateEvent')

    })

    .subscribedEventHandler('communicateEvent', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.logger, 'notification', addEvent)
    
        

	})
