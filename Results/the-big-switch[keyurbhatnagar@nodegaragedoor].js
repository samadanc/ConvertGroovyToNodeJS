
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is turned on, off or dimmed', section => {
            section.deviceSetting('master').capability(['switch']).name('Where?');

        });


        page.section('Turn on or off all of these switches as well', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('And turn off but not on all of these switches', section => {
            section.deviceSetting('offSwitches').capability(['switch']).name('');

        });


        page.section('And turn on but not off all of these switches', section => {
            section.deviceSetting('onSwitches').capability(['switch']).name('');

        });


        page.section('And Dim these switches', section => {
            section.deviceSetting('dimSwitches').capability(['switchLevel']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'level', 'dimHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("switchHandler ${event.value} - master.switch  ${master.currentSwitch}")
        let numSwitches = 0
        
        context.api.devices.sendCommands(context.config.switches, 'switch', size)
    
        if (event.value == 'off') {
        console.log('Off')
        if (master.currentSwitch == 'on') {
        console.log('master current = On')
        for (let offSwitch : switches ) {
        console.log("For $offSwitch")
        if (offSwitch.currentSwitch == 'off') {
        numSwitches = numSwitches + 1
        }
        }
        if (numSwitches > totalSwitches / 2) {
        console.log('turning master off')
        state.ignoreTrigger = true
        
        context.api.devices.sendCommands(context.config.master, 'switch', off)
    
        }
        } else {
        console.log('In else')
        }
        } else {
        console.log('On')
        if (master.currentSwitch == 'off') {
        console.log('master current = Off')
        for (let offSwitch : switches ) {
        console.log("For $offSwitch")
        if (offSwitch.currentSwitch == 'on') {
        numSwitches = numSwitches + 1
        }
        }
        if (numSwitches > totalSwitches / 2) {
        console.log('turning master on')
        state.ignoreTrigger = true
        
        context.api.devices.sendCommands(context.config.master, 'switch', on)
    
        }
        } else {
        console.log('In else')
        }
        }
        

	})

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log("onHandler ${event.value}")
        if (state.ignoreTrigger) {
        console.log('onHandler Ignoring trigger')
        state.ignoreTrigger = false
        } else {
        this.onSwitches()?.on()
        }
        

	})

    .subscribedEventHandler('dimHandler', (context, event) => {
        
        console.log("Dim level: ${event.value}")
        dimSwitches?.setLevel(event.value)
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log("offHandler ${event.value}")
        if (state.ignoreTrigger) {
        console.log('offHandler Ignoring trigger')
        state.ignoreTrigger = false
        } else {
        this.offSwitches()?.off()
        }
        

	})
