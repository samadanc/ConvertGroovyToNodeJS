
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pet Water Fountain Sensor', section => {
            section.deviceSetting('waterSensor').capability(['waterSensor']).name('');

        });


        page.section('Pet Water Fountain Virtual Device', section => {
            section.deviceSetting('waterFountain').capability(['waterSensor']).name('Pet Water Fountain Virtual Device');

        });


        page.section('Notify Every X Hours', section => {
            section.numberSetting('hoursDelay').name('Hour Delay');

        });


        page.section('Auto Shutoff Options', section => {
            section.deviceSetting('waterSwitch').capability(['switch']).name('Pet Water Fountain Switch');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.waterSensor, 'waterSensor', 'water', 'waterLevelHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.waterFountain, 'waterSensor', 'switch', 'waterSwitchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.waterSwitch, 'switch', 'switch', 'waterSwitchHandler')

    })

    .subscribedEventHandler('waterSwitchHandler', (context, event) => {
        
        console.log('Switch Handler')
        
        context.api.devices.sendCommands(context.config.waterSensor, 'waterSensor', currentValue)
    
        console.log(waterLevel)
        console.log(event.value)
        if (event.value == 'on') {
        if (waterLevel == 'dry') {
        this.send('Pet Water Fountain is still EMPTY! It cant be turned on!')
        
        context.api.devices.sendCommands(context.config.waterFountain, 'waterSensor', off)
    
        
        context.api.devices.sendCommands(context.config.waterSwitch, 'switch', off)
    
        } else {
        
        context.api.devices.sendCommands(context.config.waterFountain, 'waterSensor', on)
    
        
        context.api.devices.sendCommands(context.config.waterSwitch, 'switch', on)
    
        }
        }
        if (event.value == 'off') {
        
        context.api.devices.sendCommands(context.config.waterFountain, 'waterSensor', off)
    
        
        context.api.devices.sendCommands(context.config.waterSwitch, 'switch', off)
    
        }
        

	})

    .subscribedEventHandler('waterLevelHandler', (context, event) => {
        
        if (event.value == 'dry') {
        console.log('Water Sensor Dry')
        this.runIn(3 * 60, notifyEmpty)
        }
        if (event.value == 'wet') {
        
        context.api.devices.sendCommands(context.config.waterFountain, 'waterSensor', wet)
    
        console.log('Water Sensor Wet')
        this.unschedule(notifyEmpty)
        
        context.api.devices.sendCommands(context.config.waterFountain, 'waterSensor', on)
    
        }
        

	})
