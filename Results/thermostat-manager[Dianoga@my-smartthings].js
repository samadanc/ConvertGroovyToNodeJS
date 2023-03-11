
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Thermostat');

        });


        page.section(''Settings'', section => {

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('sensorChange', (context, event) => {
        
        console.log("Desc: ${event.value} , $state")
        if (event.value == 'open' && !state.changed) {
        this.unschedule()
        this.runIn(delay, 'turnOff')
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
        this.runIn(delay, 'restore')
        }
        }
        }
        

	})
