
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Trigger switch', section => {
            section.deviceSetting('triggerSwitch').capability(['switch']).name('Select trigger switch:');
            section.enumSetting('triggerSwitchState').name('trigger state:');
            section.enumSetting('triggerSwitchReset').name('reset trigger after timer:');

        });


        page.section('Harmony Activities', section => {
            section.deviceSetting('harmonyActivities').capability(['switch']).name('Select only Harmony Activitis (other than All Off):');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.triggerSwitch, 'switch', 'switch.${triggerSwitchState.toLowerCase()}', 'triggerSwitchHandler')

    })

    .subscribedEventHandler('triggerSwitchHandler', (context, event) => {
        
        console.log("event handler: ${event.displayName}.${event.description}")
        
        context.api.devices.sendCommands(context.config.harmonyActivities, 'switch', refresh)
    
        console.log('activities refreshed')
        this.runIn(1, checkAndTurnOff)
        

	})
