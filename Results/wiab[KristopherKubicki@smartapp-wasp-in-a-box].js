
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control this Occupancy Sensor...', section => {
            section.deviceSetting('occupy').capability(['presenceSensor']).name('Which?');

        });


        page.section('When there\'s movement...', section => {
            section.deviceSetting('imotions').capability(['motionSensor']).name('Where?');
            section.deviceSetting('icontacts').capability(['contactSensor']).name('Where?');

        });


        page.section('And then off when any of these perimeter contact sensors are opened or tripped...', section => {
            section.deviceSetting('ocontacts').capability(['contactSensor']).name('Where?');
            section.deviceSetting('omotions').capability(['motionSensor']).name('Where?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.ocontacts, 'contactSensor', 'contact.open', 'outsideHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.omotions, 'motionSensor', 'motion.active', 'outsideHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.icontacts, 'contactSensor', 'contact.open', 'insideHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.imotions, 'motionSensor', 'motion.active', 'insideHandler')

    })

    .subscribedEventHandler('outsideHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        
        context.api.devices.sendCommands(context.config.occupy, 'presenceSensor', departed)
    
        

	})

    .subscribedEventHandler('insideHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        let success = 1
        for (let sensor : settings.ocontacts) {
        if (sensor.latestValue('contact') == 'open') {
        success = 0
        }
        }
        for (let sensor : settings.omotions) {
        if (sensor.latestValue('motion') == 'active') {
        success = 0
        }
        }
        if (success == 1) {
        
        context.api.devices.sendCommands(context.config.occupy, 'presenceSensor', arrived)
    
        }
        

	})
