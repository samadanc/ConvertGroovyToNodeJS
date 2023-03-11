
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Info'', section => {

        });


        page.section('Devices', section => {
            section.deviceSetting('switches').capability(['switch']).name('Device to turn on/off using a time delay');
            section.deviceSetting('vSwitch').capability(['switch']).name('The Virtual Switch');

        });


        page.section('Preferences', section => {
            section.booleanSetting('onOff').name('Do you want the device to turn on or off');
            section.numberSetting('delayMinutes').name('Minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.vSwitch, 'switch', 'switch', 'vSwitchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("Switch Handler: ${event.name}: ${event.value}, State: $state")
        if (event.value == 'off') {
        log.info('Turning off.')
        } else {
        if (event.value == 'on') {
        log.info('Turning on.')
        }
        }
        

	})

    .subscribedEventHandler('vSwitchHandler', (context, event) => {
        
        console.log("Virtual Switch Handler: ${event.name}: ${event.value}")
        if (event.value == 'on' || event.value == 'off') {
        this.eventHandler(evt)
        }
        

	})
