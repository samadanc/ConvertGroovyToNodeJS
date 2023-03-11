
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Door', section => {
            section.deviceSetting('door1').capability(['contactSensor']).name('Door');

        });


        page.section('Lights', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Light');
            section.numberSetting('offTime').name('Turn off after X minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.door1, 'contactSensor', 'acceleration.active', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'sunriseHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.door1, 'contactSensor', 'contact', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunsetHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        console.log("doorHandler ${event.name} = ${event.value} (afterSunset = ${state.afterSunset})")
        if (this.isOpening(evt)) {
        console.log('Door is opening, turning on lights')
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        } else {
        if (this.isOpen(evt)) {
        console.log('Door open, turning on lights')
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        } else {
        if (this.isClosed(evt)) {
        console.log("Door closed, scheduling lights to turn off in $offTime minutes")
        this.runIn(offTime * 60, 'turnOff')
        }
        }
        }
        

	})

    .subscribedEventHandler('sunriseHandler', (context, event) => {
        
        state.afterSunset = false
        

	})

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
        state.afterSunset = true
        

	})
