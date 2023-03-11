
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Display Sensor', section => {
            section.deviceSetting('displayTemp').capability(['temperatureMeasurement']).name('');

        });


        page.section('Allow external service to get the temperature ...', section => {
            section.deviceSetting('temps').capability(['temperatureMeasurement']).name('');

        });


        page.section('Allow external service to get the alarm status ...', section => {
            section.deviceSetting('alarms').capability(['alarm']).name('');

        });


        page.section('Allow external service to get the contact status ...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('');

        });


        page.section('Allow external service to get the switches ...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Allow external service to get the thermostat status ...', section => {
            section.deviceSetting('thermos').capability(['thermostat']).name('');

        });


        page.section('Allow external service to get the motion status ...', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('');

        });


        page.section('Allow external service to get the presence status ...', section => {
            section.deviceSetting('presences').capability(['presenceSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmHandler')

    })

    .subscribedEventHandler('alarmHandler', (context, event) => {
        
        console.log("Alarm Handler value: ${event.value}")
        state.shm = location.currentState('alarmSystemStatus')?.value
        console.log("alarm state: ${location.currentState(alarmSystemStatus)?.value}")
        

	})

    .subscribedEventHandler('thermostatOperatingStateHandler', (context, event) => {
        
        console.log('thermostatOperatingStateHandler received event')
        state.lastThermostatOperatingState = this.now()
        

	})
