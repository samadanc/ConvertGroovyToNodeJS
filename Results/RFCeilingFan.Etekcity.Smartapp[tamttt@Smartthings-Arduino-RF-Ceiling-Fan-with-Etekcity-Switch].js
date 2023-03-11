
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Connect these virtual Fans to the Arduino', section => {
            section.deviceSetting('fan1').capability(['switchLevel']).name('Fan 1 for Arduino');
            section.deviceSetting('fan2').capability(['switchLevel']).name('Fan 2 for Arduino');
            section.deviceSetting('fan3').capability(['switchLevel']).name('Fan 3 for Arduino');
            section.deviceSetting('fan4').capability(['switchLevel']).name('Fan 4 for Arduino');

        });


        page.section('Connect these switches to the Arduino', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Switch 1 for Arduino');
            section.deviceSetting('switch2').capability(['switch']).name('Switch 2 for Arduino');
            section.deviceSetting('switch3').capability(['switch']).name('Switch 3 for Arduino');
            section.deviceSetting('switch4').capability(['switch']).name('Switch 4 for Arduino');

        });


        page.section('Which Arduino board to control?', section => {
            section.deviceSetting('arduino').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.fan3, 'switchLevel', 'fan', 'fan3val')

        await context.api.subscriptions.subscribeToDevices(context.config.fan2, 'switchLevel', 'fan', 'fan2val')

        await context.api.subscriptions.subscribeToDevices(context.config.switch4, 'switch', 'switch.on', 'switch4on')

        await context.api.subscriptions.subscribeToDevices(context.config.fan4, 'switchLevel', 'fan', 'fan4val')

        await context.api.subscriptions.subscribeToDevices(context.config.fan4, 'switchLevel', 'light', 'light4val')

        await context.api.subscriptions.subscribeToDevices(context.config.fan1, 'switchLevel', 'light', 'light1val')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switch.off', 'switch2off')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switch.on', 'switch2on')

        await context.api.subscriptions.subscribeToDevices(context.config.fan3, 'switchLevel', 'light', 'light3val')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'switch1off')

        await context.api.subscriptions.subscribeToDevices(context.config.fan2, 'switchLevel', 'light', 'light2val')

        await context.api.subscriptions.subscribeToDevices(context.config.switch3, 'switch', 'switch.on', 'switch3on')

        await context.api.subscriptions.subscribeToDevices(context.config.switch4, 'switch', 'switch.off', 'switch4off')

        await context.api.subscriptions.subscribeToDevices(context.config.switch3, 'switch', 'switch.off', 'switch3off')

        await context.api.subscriptions.subscribeToDevices(context.config.fan1, 'switchLevel', 'fan', 'fan1val')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'switch1on')

    })

    .subscribedEventHandler('fan2val', (context, event) => {
        
        java.lang.Integer level = fan2.currentValue
        console.log("level: $level")
        if (level >= 0 && level < 25) {
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', fan2Off)
    
        }
        if (level >= 25 && level < 50) {
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', fan2Low)
    
        }
        if (level >= 50 && level < 75) {
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', fan2Medium)
    
        }
        if (level >= 75) {
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', fan2High)
    
        }
        

	})

    .subscribedEventHandler('switch1on', (context, event) => {
        
        console.log("Switch 1 from smartapp: ${event.value}")
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', switch1On)
    
        

	})

    .subscribedEventHandler('switch2on', (context, event) => {
        
        console.log("Switch 2 from smartapp: ${event.value}")
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', switch2On)
    
        

	})

    .subscribedEventHandler('light2val', (context, event) => {
        
        console.log("Light 2 from smartapp: ${event.value}")
        if (event.value == 'on' || event.value == 'off') {
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', light2Toggle)
    
        }
        

	})

    .subscribedEventHandler('fan1val', (context, event) => {
        
        java.lang.Integer level = fan1.currentValue
        console.log("level: $level")
        if (level >= 0 && level < 25) {
        console.log('Fan 1 level from smartapp: 0')
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', fan1Off)
    
        }
        if (level >= 25 && level < 50) {
        console.log('Fan 1 level from smartapp: 25')
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', fan1Low)
    
        }
        if (level >= 50 && level < 75) {
        console.log('Fan 1 level from smartapp: 50')
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', fan1Medium)
    
        }
        if (level >= 75) {
        console.log('Fan 1 level from smartapp: 75')
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', fan1High)
    
        }
        

	})

    .subscribedEventHandler('fan3val', (context, event) => {
        
        java.lang.Integer level = fan3.currentValue
        console.log("level: $level")
        if (level >= 0 && level < 25) {
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', fan3Off)
    
        }
        if (level >= 25 && level < 50) {
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', fan3Low)
    
        }
        if (level >= 50 && level < 75) {
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', fan3Medium)
    
        }
        if (level >= 75) {
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', fan3High)
    
        }
        

	})

    .subscribedEventHandler('switch3off', (context, event) => {
        
        console.log("Switch 3 from smartapp: ${event.value}")
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', switch3Off)
    
        

	})

    .subscribedEventHandler('switch4off', (context, event) => {
        
        console.log("Switch 4 from smartapp: ${event.value}")
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', switch4Off)
    
        

	})

    .subscribedEventHandler('light3val', (context, event) => {
        
        console.log("Light 3 from smartapp: ${event.value}")
        if (event.value == 'on' || event.value == 'off') {
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', light3Toggle)
    
        }
        

	})

    .subscribedEventHandler('switch3on', (context, event) => {
        
        console.log("Switch 3 from smartapp: ${event.value}")
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', switch3On)
    
        

	})

    .subscribedEventHandler('light1val', (context, event) => {
        
        if (event.value == 'on' || event.value == 'off') {
        console.log("Light 1 from smartapp: ${event.value}")
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', light1Toggle)
    
        }
        

	})

    .subscribedEventHandler('switch2off', (context, event) => {
        
        console.log("Switch 2 from smartapp: ${event.value}")
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', switch2Off)
    
        

	})

    .subscribedEventHandler('switch1off', (context, event) => {
        
        console.log("Switch 1 from smartapp: ${event.value}")
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', switch1Off)
    
        

	})

    .subscribedEventHandler('fan4val', (context, event) => {
        
        java.lang.Integer level = fan4.currentValue
        console.log("level: $level")
        if (level >= 0 && level < 25) {
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', fan4Off)
    
        }
        if (level >= 25 && level < 50) {
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', fan4Low)
    
        }
        if (level >= 50 && level < 75) {
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', fan4Medium)
    
        }
        if (level >= 75) {
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', fan4High)
    
        }
        

	})

    .subscribedEventHandler('switch4on', (context, event) => {
        
        console.log("Switch 4 from smartapp: ${event.value}")
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', switch4On)
    
        

	})

    .subscribedEventHandler('light4val', (context, event) => {
        
        console.log("Light 4 from smartapp: ${event.value}")
        if (event.value == 'on' || event.value == 'off') {
        
        context.api.devices.sendCommands(context.config.arduino, 'switch', light4Toggle)
    
        }
        

	})
