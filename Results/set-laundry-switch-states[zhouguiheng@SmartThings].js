
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Washer:', section => {
            section.deviceSetting('washer').capability(['switch']).name('');
            section.numberSetting('minWasherPower').name('Minimum watts to turn on:');
            section.numberSetting('delayOffMinutes').name('Minutes at low power before turning off:');

        });


        page.section('Dryer:', section => {
            section.deviceSetting('dryer').capability(['switch']).name('');
            section.numberSetting('minDryerPower').name('Minimum watts to turn on:');

        });


        page.section('Power meter:', section => {
            section.deviceSetting('power').capability(['powerMeter']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.power, 'powerMeter', 'washerAttribute', 'washerHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.power, 'powerMeter', 'dryerAttribute', 'dryerHandler')

    })

    .subscribedEventHandler('dryerHandler', (context, event) => {
        
        try {
        let p = event.doubleValue
        console.log("Dryer power: $p")
        if (p >= minDryerPower ) {
        if (dryer.currentSwitch != 'on') {
        console.log('Turn on dryer')
        
        context.api.devices.sendCommands(context.config.dryer, 'switch', on)
    
        }
        } else {
        if (dryer.currentSwitch != 'off') {
        console.log('Turn off dryer')
        
        context.api.devices.sendCommands(context.config.dryer, 'switch', off)
    
        }
        }
        }
        catch (let e) {
        console.log("Failed to get double value for ${event.name}", e)
        }
        

	})

    .subscribedEventHandler('washerHandler', (context, event) => {
        
        try {
        let p = event.doubleValue
        console.log("Washer power: $p")
        if (p >= minWasherPower ) {
        state.tryingWasherOff = false
        this.unschedule(washerOff)
        this.washerOn()
        } else {
        if (washer.currentSwitch == 'on' && !state.tryingWasherOff) {
        console.log('Trying washer off')
        state.tryingWasherOff = true
        this.runIn(delayOffMinutes * 60, washerOff)
        }
        }
        }
        catch (let e) {
        console.log("Failed to get double value for ${event.name}", e)
        }
        

	})
