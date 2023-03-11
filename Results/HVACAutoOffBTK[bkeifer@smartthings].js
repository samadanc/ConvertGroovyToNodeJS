
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Thermostat');

        });


        page.section('Open/Close', section => {
            section.deviceSetting('sensors').capability(['contactSensor']).name('Sensors');
            section.numberSetting('delay').name('Delay (seconds)');

        });


        page.section('Send Notifications?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'contactSensor', 'contact', 'sensorChange')

    })

    .subscribedEventHandler('sensorChange', (context, event) => {
        
        this.stash("Sensor Changed: ${event.value}")
        if (event.value == 'open' && !state.pending) {
        this.unschedule()
        state.pending = true
        this.runIn(delay, 'turnOff')
        } else {
        if (event.value == 'closed' && state.changed || state.pending) {
        let isOpen = false
        for (let sensor : sensors ) {
        if (sensor.id != event.deviceId && sensor.currentValue('contact') == 'open') {
        isOpen = true
        }
        }
        if (!isOpen) {
        this.unschedule()
        if (state.pending) {
        state.pending = false
        } else {
        if (state.changed) {
        this.runIn(delay, 'restore')
        }
        }
        }
        }
        }
        

	})
