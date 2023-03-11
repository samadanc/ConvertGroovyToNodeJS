
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Hardware', section => {
            section.deviceSetting('bulbs').capability(['colorControl']).name('RGBW Bulbs');
            section.deviceSetting('virtualSwitch').capability(['switch']).name('Virtual Switch');
            section.deviceSetting('physicalSwitch').capability(['switch']).name('Physical Switch');

        });


        page.section('Behaviors', section => {
            section.booleanSetting('powerCycle').name('Power-cycle the bulbs after restoring color');
            section.booleanSetting('enabled').name('Change bulbs to warm light when virtual switch turned on');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.physicalSwitch, 'switch', 'switch.on', 'onPhysicalOn')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualSwitch, 'switch', 'switch.on', 'onVirtualOn')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualSwitch, 'switch', 'switch.off', 'onVirtualOff')

        await context.api.subscriptions.subscribeToDevices(context.config.physicalSwitch, 'switch', 'switch.off', 'onPhysicalOff')

    })

    .subscribedEventHandler('onPhysicalOff', (context, event) => {
        
        console.log('Physical switch off')
        atomicState.lastPhysicalState = 'off'
        
        context.api.devices.sendCommands(context.config.virtualSwitch, 'switch', off)
    
        

	})

    .subscribedEventHandler('onPhysicalOn', (context, event) => {
        
        console.log('Physical switch on')
        if (virtualSwitch.currentSwitch == 'off') {
        this.runIn(5, restoreTheColors)
        }
        

	})

    .subscribedEventHandler('onVirtualOn', (context, event) => {
        
        console.log('Virtual switch on')
        let hadToTurnOnPower = physicalSwitch.currentSwitch == 'off'
        if (hadToTurnOnPower) {
        console.log('Physical switch is off. Turning on.')
        
        context.api.devices.sendCommands(context.config.physicalSwitch, 'switch', on)
    
        } else {
        this.rememberTheColors()
        }
        if (enabled) {
        this.setWarmWhite()
        }
        atomicState.hadToTurnOnPower = hadToTurnOnPower
        

	})

    .subscribedEventHandler('onVirtualOff', (context, event) => {
        
        console.log('Virtual switch off')
        if (enabled) {
        this.restoreTheColors()
        }
        if (atomicState.hadToTurnOnPower) {
        
        context.api.devices.sendCommands(context.config.physicalSwitch, 'switch', off)
    
        } else {
        if (powerCycle) {
        this.runIn(10, powerCyclePhysicalSwitch)
        }
        }
        

	})
