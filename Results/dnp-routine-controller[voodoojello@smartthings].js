
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section('Select Presence Users', section => {
            section.deviceSetting('userPresenceList').capability(['presenceSensor']).name('Monitor These Presences');

        });


        page.section('Select Illuminance Measurement Source', section => {
            section.deviceSetting('illuminanceSource').capability(['illuminanceMeasurement']).name('Illuminance Measurement Source:');

        });


        page.section('Away Presence Change Delay', section => {
            section.numberSetting('presenceChangeDelay').name('Away Change Delay (in minutes)');

        });


        page.section('Low Light Threshold', section => {
            section.numberSetting('lightThreshold').name('Low light change threshold (lux)');

        });


        page.section('Light Change Tolerance', section => {
            section.numberSetting('lightTolerance').name('Light change tolerance (lux)');

        });


        page.section('Light Changes Trigger Routines', section => {
            section.booleanSetting('enableLightRoutineChanges').name('Run routines for day/night changes');

        });


        page.section('Notify on Change', section => {
            section.booleanSetting('appNotify').name('Notify everyone in "Hello Home');
            section.booleanSetting('devNotify').name('Notify everyone via push');
            section.booleanSetting('smsNotify').name('Notify only me via SMS');

        });


        page.section('Enable/Disable (bypass) DNP Routine Controller', section => {
            section.booleanSetting('appEnable').name('Enable Presence Monitor');

        });


        page.section('['hideable': true, 'hidden': true], 'Troubleshooting Options', section => {
            section.numberSetting('ideLogLevel').name('Logging Level');
            section.booleanSetting('luxInMsgs').name('Include illuminance levels in messages');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.illuminanceSource, 'illuminanceMeasurement', 'illuminance', 'illuminanceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.userPresenceList, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
        this.logger('info', 'illuminanceHandler', "Illuminance ${event.name} changed to ${event.value}")
        state.illuminanceStatus = event.value
        this.router()
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        this.logger('info', 'presenceHandler', "Presence ${event.name} changed to ${event.value}")
        state.presenceStatus = event.value
        this.router()
        

	})
