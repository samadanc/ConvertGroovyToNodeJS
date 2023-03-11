
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Canary Bulb', section => {
            section.deviceSetting('canarybulb').capability(['switch']).name('Which bulb?');

        });


        page.section('Devices you want to turn off if the Canary lights up', section => {
            section.deviceSetting('zigbeebulbs').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('checkCanary', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.canarybulb, 'switch', 'switch.on', 'checkCanary')

    })

    .subscribedEventHandler('checkCanary', (context, event) => {
        
        console.log('Checking Canary Bulb')
        this.pollCanary()
        console.log("Canary Bulb is ${canarybulb.currentSwitch}")
        if ('on' == canarybulb.currentSwitch) {
        console.log('Turning off Zig Bee bulbs')
        zigbeebulbs?.each({
        console.log("Turning ${it.label} off")
        it.off()
        })
        console.log("Turning ${canarybulb.label} off")
        
        context.api.devices.sendCommands(context.config.canarybulb, 'switch', off)
    
        }
        

	})

    .scheduledEventHandler('checkCanary', (context, event) => {
        
        console.log('Checking Canary Bulb')
        this.pollCanary()
        console.log("Canary Bulb is ${canarybulb.currentSwitch}")
        if ('on' == canarybulb.currentSwitch) {
        console.log('Turning off Zig Bee bulbs')
        zigbeebulbs?.each({
        console.log("Turning ${it.label} off")
        it.off()
        })
        console.log("Turning ${canarybulb.label} off")
        
        context.api.devices.sendCommands(context.config.canarybulb, 'switch', off)
    
        }
        

	})
