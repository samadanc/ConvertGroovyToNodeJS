
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sensors', section => {
            section.deviceSetting('door1').capability(['contactSensor']).name('Door');
            section.deviceSetting('motion1').capability(['motionSensor']).name('Motion');

        });


        page.section('Lights', section => {
            section.deviceSetting('lights').capability(['switch']).name('Lights');

        });


        page.section('Notification Testing', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'motionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.door1, 'contactSensor', 'contact', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        let closed = event.value == 'closed'
        
        context.api.devices.sendCommands(context.config.motion1, 'motionSensor', latestValue)
    
        this.determineOccupation(closed, motion)
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.door1, 'contactSensor', latestValue)
    
        let motion = event.value == 'active'
        this.determineOccupation(closed, motion)
        

	})
