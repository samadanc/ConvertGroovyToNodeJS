
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Canary Bulb', section => {
            section.deviceSetting('canary').capability(['switch']).name('Who sings?');

        });


        page.section('Zigbee bulbs to monitor', section => {
            section.deviceSetting('slaves').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.canary, 'switch', 'switch.on', 'checkRestore')

        context.api.schedules.runEvery5Minutes('checkRestore', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.slaves, 'switch', 'switch', 'saveStates')

    })

    .subscribedEventHandler('checkRestore', (context, event) => {
        
        console.log('Checking Restore')
        this.pollCanary()
        console.log("Canary is ${canary.currentSwitch}")
        if ('on' == canary.currentSwitch) {
        console.log('Turning stuff off')
        this.restoreState()
        
        context.api.devices.sendCommands(context.config.canary, 'switch', off)
    
        }
        this.pollSlaves()
        this.saveStates(evt)
        

	})

    .subscribedEventHandler('saveStates', (context, event) => {
        
        console.log('Checking States')
        if ('off' == canary.currentSwitch) {
        let lightsOff = [:]
        slaves?.each({
        if (it.currentSwitch == 'off') {
        console.log("${it.displayName} value ${it.currentSwitch}")
        lightsOff[it.id] = 'off'
        }
        })
        state.lOff = lightsOff
        }
        

	})

    .scheduledEventHandler('checkRestore', (context, event) => {
        
        console.log('Checking Restore')
        this.pollCanary()
        console.log("Canary is ${canary.currentSwitch}")
        if ('on' == canary.currentSwitch) {
        console.log('Turning stuff off')
        this.restoreState()
        
        context.api.devices.sendCommands(context.config.canary, 'switch', off)
    
        }
        this.pollSlaves()
        this.saveStates(evt)
        

	})
