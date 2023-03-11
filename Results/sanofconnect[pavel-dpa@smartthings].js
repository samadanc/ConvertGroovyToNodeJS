
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sanof', section => {
            section.deviceSetting('sanof01').capability(['switch']).name('Sanof #01');

        });


        page.section('Lists of virtual switches', section => {
            section.deviceSetting('switch01').capability(['switch']).name('switch #01');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery10Minutes('syncswitchesall', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.switch01, 'switch', 'switch', 'syncswitchesall')

    })

    .subscribedEventHandler('syncswitchesall', (context, event) => {
        
        if (event.isStateChange()) {
        if (event.value == 'on') {
        console.log("switch turned on! ${event.displayName}")
        switch (event.displayName) {
        case 'switch01':
        
        context.api.devices.sendCommands(context.config.sanof01, 'switch', on)
    
        break
        case 'switch02':
        break
        }
        } else {
        if (event.value == 'off') {
        switch (event.displayName) {
        case 'switch01':
        
        context.api.devices.sendCommands(context.config.sanof01, 'switch', off)
    
        break
        case 'switch02':
        break
        }
        console.log("switch turned off! ${event.displayName}")
        }
        }
        }
        

	})

    .scheduledEventHandler('syncswitchesall', (context, event) => {
        
        if (event.isStateChange()) {
        if (event.value == 'on') {
        console.log("switch turned on! ${event.displayName}")
        switch (event.displayName) {
        case 'switch01':
        
        context.api.devices.sendCommands(context.config.sanof01, 'switch', on)
    
        break
        case 'switch02':
        break
        }
        } else {
        if (event.value == 'off') {
        switch (event.displayName) {
        case 'switch01':
        
        context.api.devices.sendCommands(context.config.sanof01, 'switch', off)
    
        break
        case 'switch02':
        break
        }
        console.log("switch turned off! ${event.displayName}")
        }
        }
        }
        

	})
