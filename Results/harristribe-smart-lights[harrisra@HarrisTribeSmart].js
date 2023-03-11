
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on these lights...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('When there\'s movement here...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Where?');

        });


        page.section('And low light is measured here', section => {
            section.deviceSetting('luxSensor').capability(['illuminanceMeasurement']).name('');

        });


        page.section('And off when there\'s been no movement for...', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.luxSensor, 'illuminanceMeasurement', 'illuminance', 'luxHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'active' && this.lightingIsNeeded()) {
        console.log('turning on lights')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        } else {
        if (event.value == 'inactive') {
        console.log("lights will turn off in $minutes mins")
        this.runIn(minutes * 60, scheduleCheck)
        }
        }
        

	})

    .subscribedEventHandler('luxHandler', (context, event) => {
        
        if (!(this.lightingIsNeeded())) {
        console.log('turning off lights')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        }
        

	})
