
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('if_switch').capability(['switch']).name('Select source switch');

        });


        page.section('', section => {
            section.deviceSetting('than_switch').capability(['switch']).name('Select target switch');
            section.numberSetting('on_delay').name('ON delay time');
            section.numberSetting('off_delay').name('OFF delay time');
            section.numberSetting('always_off_delay').name('will be off if sorcue is off');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.than_switch, 'switch', 'switch', 'than_switch_handler')

        await context.api.subscriptions.subscribeToDevices(context.config.if_switch, 'switch', 'switch', 'if_switch_handler')

    })

    .subscribedEventHandler('if_switch_handler', (context, event) => {
        
        this.unschedule()
        if (event.value == 'on') {
        console.log("$if_switch on event")
        if (on_delay instanceof Number) {
        if (on_delay > 0) {
        this.runIn(on_delay * 60, delayed_on_work)
        } else {
        
        context.api.devices.sendCommands(context.config.than_switch, 'switch', on)
    
        }
        }
        } else {
        if (event.value == 'off') {
        console.log("$if_switch off event")
        if (on_delay instanceof Number) {
        if (off_delay > 0) {
        this.runIn(off_delay * 60, delayed_off_work)
        } else {
        
        context.api.devices.sendCommands(context.config.than_switch, 'switch', off)
    
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('than_switch_handler', (context, event) => {
        
        this.unschedule()
        if (event.value == 'on') {
        console.log("$than_switch on event, unschedule all")
        
        context.api.devices.sendCommands(context.config.if_switch, 'switch', currentState)
    
        console.log("state value: ${ifState.value}")
        if (ifState.value == 'off' && always_off_delay instanceof Number) {
        console.log("$than_switch will be off after $always_off_delay min")
        this.runIn(always_off_delay * 60, delayed_off_work)
        }
        } else {
        if (event.value == 'off') {
        console.log("$than_switch off event, unschedule all")
        }
        }
        

	})
