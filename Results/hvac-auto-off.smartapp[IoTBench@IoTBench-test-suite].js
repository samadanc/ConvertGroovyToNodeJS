
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
            section.numberSetting('delay').name('Delay (seconds) before turning thermostat off');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'contactSensor', 'contact', 'sensorChange')

    })

    .subscribedEventHandler('sensorChange', (context, event) => {
        
        console.log("Desc: ${event.value} , $state")
        if (event.value == 'open' && !state.changed) {
        console.log("Scheduling turn off in $delay seconds")
        state.scheduled = true
        this.runIn(delay, 'turnOff')
        } else {
        if (event.value == 'closed' && state.changed || state.scheduled) {
        if (!(this.isOpen())) {
        console.log('Everything is closed, restoring thermostat')
        state.scheduled = false
        this.unschedule('turnOff')
        this.restore()
        } else {
        console.log('Something is still open.')
        }
        }
        }
        

	})
