
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
            section.numberSetting('delay').name('Delay (minutes)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'contactSensor', 'contact', 'sensorChange')

    })

    .subscribedEventHandler('sensorChange', (context, event) => {
        
        console.log("Desc: ${event.value} , $state")
        if (event.value == 'open' && !state.changed) {
        this.unschedule()
        this.runIn(delay * 60, 'turnOff')
        } else {
        if (event.value == 'closed' && state.changed) {
        let isOpen = false
        for (let sensor : sensors ) {
        if (sensor.id != event.deviceId && sensor.currentValue('contact') == 'open') {
        isOpen = true
        }
        }
        if (!isOpen) {
        this.unschedule()
        this.runIn(delay * 60, 'restore')
        }
        }
        }
        

	})
