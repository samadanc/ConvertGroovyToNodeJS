
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('If the door is left open...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Doors?');

        });


        page.section('And nobody is in the room...', section => {
            section.deviceSetting('sensors').capability(['motionSensor']).name('Motion Sensors?');

        });


        page.section('For too long...', section => {
            section.numberSetting('wait').name('Minutes?');

        });


        page.section('Turn on this light...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'motionSensor', 'motion', 'sensorHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log(' Contact changed state.')
        this.checkForWarning()
        

	})

    .subscribedEventHandler('sensorHandler', (context, event) => {
        
        console.log(" Sensor changed state (${event.displayName}: ${event.value}).")
        this.checkForWarning()
        

	})
