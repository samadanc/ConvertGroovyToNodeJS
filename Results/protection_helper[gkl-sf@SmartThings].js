
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('protectionSwitch').capability(['switch']).name('Select the virtual switch');
            section.deviceSetting('dimmer').capability(['switchLevel']).name('Select the RF9540 dimmer');
            section.enumSetting('protectionEnabled').name('Choose the Protection Enabled mode');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.protectionSwitch, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmer, 'switchLevel', 'protection', 'dimmerProtectionChanged')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.dimmer, 'switchLevel', currentValue)
    
        console.log("virtual switch flipped to ${event.value}, current dimmer Protection Mode is $protectionMode")
        if (event.value == 'on' && protectionMode != state.protectionEnabled) {
        if (state.protectionEnabled == 'sequence') {
        
        context.api.devices.sendCommands(context.config.dimmer, 'switchLevel', protectionSequenceControl)
    
        } else {
        if (state.protectionEnabled == 'remote') {
        
        context.api.devices.sendCommands(context.config.dimmer, 'switchLevel', protectionRemoteOnly)
    
        }
        }
        } else {
        if (event.value == 'off' && protectionMode != 'disabled') {
        
        context.api.devices.sendCommands(context.config.dimmer, 'switchLevel', protectionDisabled)
    
        }
        }
        

	})

    .subscribedEventHandler('dimmerProtectionChanged', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.protectionSwitch, 'switch', currentValue)
    
        console.log("dimmer reports Protection Mode changed to ${event.value}, current virtual switch state is $switchState")
        if (event.value == 'disabled' && switchState != 'off') {
        
        context.api.devices.sendCommands(context.config.protectionSwitch, 'switch', off)
    
        } else {
        if (event.value == state.protectionEnabled && switchState != 'on') {
        
        context.api.devices.sendCommands(context.config.protectionSwitch, 'switch', on)
    
        }
        }
        

	})
