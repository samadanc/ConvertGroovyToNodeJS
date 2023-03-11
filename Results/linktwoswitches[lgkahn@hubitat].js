
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Master Switch?', section => {
            section.deviceSetting('master').capability(['switch']).name('Where?');

        });


        page.section('Linked Switch?', section => {
            section.deviceSetting('linked').capability(['switch']).name('Where?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.linked, 'switch', 'switch.off', 'linkedOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.linked, 'switch', 'switch.on', 'linkedOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.off', 'offHandler')

    })

    .subscribedEventHandler('linkedOnHandler', (context, event) => {
        
        console.log('In Linked on handler')
        console.log(event.value)
        if (master.currentSwitch == 'off') {
        console.log('Linked turned On, (Master was off) turning it on')
        
        context.api.devices.sendCommands(context.config.master, 'switch', on)
    
        }
        

	})

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log('In Master on handler')
        console.log(event.value)
        if (linked.currentSwitch == 'off') {
        console.log('Master turned On, (Linked was off) turning it on')
        
        context.api.devices.sendCommands(context.config.linked, 'switch', on)
    
        }
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log(event.value)
        console.log('In Master off handler')
        if (linked.currentSwitch == 'on') {
        console.log('Master turned Off, (Linked was on) turning it off')
        
        context.api.devices.sendCommands(context.config.linked, 'switch', off)
    
        }
        

	})

    .subscribedEventHandler('linkedOffHandler', (context, event) => {
        
        console.log(event.value)
        console.log('In Linked off handler')
        if (master.currentSwitch == 'on') {
        console.log('Linked turned Off, (Master was on) turning it off')
        
        context.api.devices.sendCommands(context.config.master, 'switch', off)
    
        }
        

	})
