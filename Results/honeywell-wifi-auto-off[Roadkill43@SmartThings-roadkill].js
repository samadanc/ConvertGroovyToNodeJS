
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
            section.numberSetting('delay').name('Delay (minutes) before turning thermostat off');
            section.numberSetting('delayRestore').name('Delay (minutes) before restoring when closed');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'contactSensor', 'contact', 'sensorChange')

    })

    .subscribedEventHandler('sensorChange', (context, event) => {
        
        console.log("Desc: ${event.value} , $state")
        if (event.value == 'open' && !state.changed) {
        console.log("Scheduling turn off ($delay minutes)")
        if (state.scheduledRestore) {
        state.scheduledRestore = false
        this.unschedule('restore')
        }
        if (delay < 1) {
        this.turnOff()
        } else {
        state.scheduled = true
        this.runIn(delay * 60, turnOff)
        }
        } else {
        if (event.value == 'closed' && state.changed || state.scheduled) {
        if (!(this.isOpen())) {
        console.log("Everything is closed, restoring thermostat ($delayRestore minutes)")
        console.log("state: $state")
        if (state.scheduled) {
        state.scheduled = false
        this.unschedule('turnOff')
        } else {
        if (delayRestore < 1) {
        this.restore()
        } else {
        state.scheduledRestore = true
        this.runIn(delayRestore * 60, restore)
        }
        }
        } else {
        console.log('Something is still open.')
        }
        }
        }
        

	})
