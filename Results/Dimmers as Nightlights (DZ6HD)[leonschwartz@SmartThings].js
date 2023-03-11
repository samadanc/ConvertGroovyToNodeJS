
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Dimmers', section => {
            section.deviceSetting('nightlightSwitches').capability(['switchLevel']).name('Select dimmers to use as nightlights');
            section.deviceSetting('limitSwitches').capability(['switchLevel']).name('Select dimmers to keep off, but limit how bright they turn on at night');

        });


        page.section('Presence', section => {
            section.deviceSetting('presenceTrigger').capability(['presenceSensor']).name('Only turn on if this presence sensor is present?');
            section.booleanSetting('keepOn').name('Prevent the lights from being turned off at the switch while in nightlight mode?');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'routineChanged')

        await context.api.subscriptions.subscribeToDevices(context.config.nightlightSwitches, 'switchLevel', 'switch.off', 'nightlightTurnedOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.limitSwitches, 'switchLevel', 'switch.off', 'limitTurnedOffHandler')

    })

    .subscribedEventHandler('limitTurnedOffHandler', (context, event) => {
        
        

	})

    .subscribedEventHandler('nightlightTurnedOffHandler', (context, event) => {
        
        

	})

    .subscribedEventHandler('routineChanged', (context, event) => {
        
        if (event.name == 'routineExecuted') {
        console.log("routine: ${event.displayName}")
        for (let routine : routinesForOn ) {
        if (event.displayName == routine ) {
        this.turnOn()
        }
        }
        for (let routine : routinesForOff ) {
        if (event.displayName == routine ) {
        this.turnOff()
        }
        }
        }
        

	})
