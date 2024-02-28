
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Lights', section => {
            section.deviceSetting('insideLights').capability(['switch']).name('Which inside lights?');
            section.deviceSetting('outsideLights').capability(['switch']).name('Which outside lights?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'onSunset')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'onModeChanged')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'onSunrise')

    })

    .subscribedEventHandler('onSunrise', (context, event) => {
        
        console.log('It\'s sunrise...')
        if (location.mode == 'Away') {
        console.log('... and you\'re away, so turning off outside lights')
        
        context.api.devices.sendCommands(context.config.outsideLights, 'switch', off)
    
        }
        

	})

    .subscribedEventHandler('onModeChanged', (context, event) => {
        
        console.log("modeChanged: $evt")
        console.log("previous mode: ${state.lastMode}")
        console.log("new mode: ${event.value}")
        if (event.value == 'Away' && state.lastMode == 'Home') {
        console.log('Mode changed from Home to Away. Checking if it\'s dark...')
        if (this.isDark()) {
        console.log('... it\'s dark, turning on outside lights')
        
        context.api.devices.sendCommands(context.config.outsideLights, 'switch', on)
    
        }
        this.unschedule(onFiveMinsAfterModeChangedToHome)
        }
        if (event.value == 'Home' && state.lastMode == 'Away') {
        console.log('Mode changed from Away to Home. Checking if it\'s dark...')
        if (this.isDark()) {
        console.log('... it\'s dark, turning on inside lights')
        
        context.api.devices.sendCommands(context.config.insideLights, 'switch', on)
    
        }
        this.runIn(60 * 5, onFiveMinsAfterModeChangedToHome)
        }
        state.lastMode = event.value
        

	})

    .subscribedEventHandler('onSunset', (context, event) => {
        
        console.log('It\'s sunset...')
        if (location.mode == 'Away') {
        console.log('... and you\'re away, so turning on outside lights')
        
        context.api.devices.sendCommands(context.config.outsideLights, 'switch', on)
    
        }
        

	})

        console.log("{{interesting}}")

