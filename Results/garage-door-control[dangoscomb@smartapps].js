
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sensor', section => {
            section.deviceSetting('sensor').capability(['presenceSensor']).name('');

        });


        page.section('Door', section => {
            section.deviceSetting('gdoor').capability(['garageDoorControl']).name('');

        });


        page.section('Light', section => {
            section.deviceSetting('glight').capability(['switch']).name('');

        });


        page.section('Timeframes', section => {
            section.numberSetting('minm').name('Min. Minutes Away?');
            section.numberSetting('maxm').name('Max. Minutes Away?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        console.log("event.name: ${event.value}")
        if (event.value == 'not present') {
        console.log('checking the garage door is closed')
        
        context.api.devices.sendCommands(context.config.gdoor, 'garageDoorControl', close)
    
        
        context.api.devices.sendCommands(context.config.glight, 'switch', off)
    
        } else {
        console.log('present; check we\'ve been out for a while...')
        
        context.api.devices.sendCommands(context.config.sensor, 'presenceSensor', events)
    
        let diff = event.date.getTime() - hist[1].date.getTime() / 1000 / 60
        console.log("Time away: $diff")
        if (diff > minm && diff < maxm ) {
        console.log('Timeframe constraint met... opening the garage')
        
        context.api.devices.sendCommands(context.config.gdoor, 'garageDoorControl', open)
    
        
        context.api.devices.sendCommands(context.config.glight, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.glight, 'switch', setLevel)
    
        } else {
        console.log("Timeframe constraint check failed. $minm - $maxm")
        }
        }
        

	})
