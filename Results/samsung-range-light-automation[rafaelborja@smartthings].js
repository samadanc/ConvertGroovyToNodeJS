
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select your range', section => {

        });


        page.section('Turn on the following lights light', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('');

        });


        page.section('Delay before turning off lights', section => {
            section.numberSetting('delaySecs').name('Seconds after turning off cooktop?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.therange, 'device.SamsungRange', 'operationStateCooktop.Ready', 'cooktopDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.therange, 'device.SamsungRange', 'operationStateCooktop', 'cooktopDetectedHandler')

    })

    .subscribedEventHandler('cooktopDetectedHandler', (context, event) => {
        
        console.log("cooktopDetectedHandler called: $evt")
        if (evt) {
        console.log("cooktopDetectedHandler ${event.name}")
        console.log("cooktopDetectedHandler ${event.value}")
        if (event.value == 'Run') {
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', on)
    
        } else {
        this.runIn(delaySecs, scheduleCheck, ['overwrite': false])
        }
        }
        

	})
