
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Master Switch', section => {
            section.deviceSetting('master').capability(['color temperature']).name('Switch');

        });


        page.section('SmartThings Devices', section => {
            section.deviceSetting('controlledDevices').capability(['color temperature']).name('Controlled Devices');

        });


        page.section(''App Settings'', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'color temperature', 'colorTemperature', 'temperature')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'color temperature', 'level', 'level')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'color temperature', 'switch.on', 'on')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'color temperature', 'switch.setlevel', 'level')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'color temperature', 'switch.off', 'off')

    })

    .subscribedEventHandler('on', (context, event) => {
        
        console.log('turning on devices')
        controlledDevices.each({
        it.on()
        })
        

	})

    .subscribedEventHandler('level', (context, event) => {
        
        console.log('setting device level')
        controlledDevices.each({
        it.setLevel(event.value)
        })
        

	})

    .subscribedEventHandler('off', (context, event) => {
        
        console.log('turning off devices')
        controlledDevices.each({
        it.off()
        })
        

	})

    .subscribedEventHandler('temperature', (context, event) => {
        
        console.log('Setting color temp')
        controlledDevices.each({
        it.setColorTemperature(event.value)
        })
        

	})
