
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is turned on:', section => {
            section.deviceSetting('thevirtualswitch').capability(['switch']).name('');

        });


        page.section('Turn on these lights', section => {
            section.deviceSetting('theswitch1').capability(['switch']).name('');
            section.deviceSetting('theswitch2').capability(['switch']).name('');
            section.deviceSetting('theswitch3').capability(['switch']).name('');
            section.deviceSetting('theswitch4').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thevirtualswitch, 'switch', 'switch.on', 'turnedOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thevirtualswitch, 'switch', 'switch.off', 'turnedOffHandler')

    })

    .subscribedEventHandler('turnedOffHandler', (context, event) => {
        
        console.log("Turned off handler with event: $evt")
        
        context.api.devices.sendCommands(context.config.theswitch1, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.theswitch2, 'switch', off)
    
        this.setSwitchOff(theswitch3)
        this.setSwitchOff(theswitch4)
        

	})

    .subscribedEventHandler('turnedOnHandler', (context, event) => {
        
        console.log("Turned on handler with event: $evt")
        
        context.api.devices.sendCommands(context.config.theswitch1, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.theswitch2, 'switch', on)
    
        this.setSwitchOn(theswitch3)
        this.setSwitchOn(theswitch4)
        

	})
