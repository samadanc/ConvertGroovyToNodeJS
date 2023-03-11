
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this virtual switch is turned on...', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('What virtual switch?');

        });


        page.section('Check that this water sensor detects water...', section => {
            section.deviceSetting('alarm').capability(['waterSensor']).name('What water sensor?');

        });


        page.section('Before turning on this coffee maker (actual switch)...', section => {
            section.deviceSetting('coffee').capability(['switch']).name('What switch/outlet is the coffee maker connected to?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.On', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.alarm, 'waterSensor', 'water.dry', 'waterDryHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        this.checkWater()
        

	})

    .subscribedEventHandler('waterDryHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.theSwitch, 'switch', latestValue)
    
        if (switchValue == 'on') {
        
        context.api.devices.sendCommands(context.config.theSwitch, 'switch', off)
    
        this.sendPush('Your coffee is ready!')
        }
        

	})
