
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices', section => {
            section.deviceSetting('presenceSensor').capability(['presenceSensor']).name('Presence sensor(s):');
            section.deviceSetting('temperatureSensor').capability(['temperatureMeasurement']).name('Temperature sensor:');
            section.deviceSetting('heaterSwitch').capability(['switch']).name('Heater switch:');

        });


        page.section('Settings', section => {
            section.numberSetting('temperatureMin').name('Turn on when temperature under:');
            section.numberSetting('temperatureMax').name('Turn off when temperature over:');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensor, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensor, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("presenceHandler(${event.id}, ${event.value})")
        if (event.value == 'present') {
        console.log("${event.id} has arrived at the $location, turning heater on")
        
        context.api.devices.sendCommands(context.config.heaterSwitch, 'switch', on)
    
        }
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        let tooCold = temperatureMin
        let tooHot = temperatureMax
        
        context.api.devices.sendCommands(context.config.presenceSensor, 'presenceSensor', currentState)
    
        let tempScale = location.temperatureScale ? location.temperatureScale : 'C'
        if (presenceState.value.find({
        it == 'present'
        }) == 'present') {
        console.log('Users present, turning heater back on and exit')
        
        context.api.devices.sendCommands(context.config.heaterSwitch, 'switch', on)
    
        return null
        }
        console.log('No users present, checking states')
        if (event.doubleValue <= tooCold ) {
        console.log("Temperature dropped below $tooCold, activating $heaterSwitch")
        
        context.api.devices.sendCommands(context.config.heaterSwitch, 'switch', on)
    
        this.send("${temperatureSensor.displayName} is too cold (temperature: ${event.value}${(event.unit) ? event.unit : tempScale}), turning heating on (if not already on).")
        }
        if (event.doubleValue >= tooHot ) {
        console.log("Temperature dropped below $tooCold, activating $heaterSwitch")
        
        context.api.devices.sendCommands(context.config.heaterSwitch, 'switch', off)
    
        this.send("${temperatureSensor.displayName} is too hot (temperature: ${event.value}${(event.unit) ? event.unit : tempScale}), turning heating off.")
        }
        

	})
