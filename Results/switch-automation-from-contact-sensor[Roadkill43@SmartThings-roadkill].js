
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switches to control', section => {
            section.deviceSetting('CloseSwitches').capability(['switch']).name('');
            section.deviceSetting('OpenSwitches').capability(['switch']).name('');

        });


        page.section('Open/Close', section => {
            section.deviceSetting('sensors').capability(['contactSensor']).name('Sensors');
            section.numberSetting('delay').name('Delay (minutes) before turning on \');
            section.numberSetting('delayRestore').name('Delay (minutes) before turning on \');
            section.booleanSetting('toggle').name('Toggle Swiches on State Change?');

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
        this.turnOnOpenSwiches()
        } else {
        state.scheduled = true
        this.runIn(delay * 60, turnOnOpenSwiches)
        }
        } else {
        if (event.value == 'closed' && state.changed || state.scheduled) {
        if (!(this.isOpen())) {
        console.log("Everything is closed, Turn on the Closed switchs ($delayRestore minutes)")
        console.log("state: $state")
        if (state.scheduled) {
        state.scheduled = false
        this.unschedule('turnOnOpenSwiches')
        } else {
        if (delayRestore < 1) {
        this.restore()
        } else {
        state.scheduledRestore = true
        this.runIn(delayRestore * 60, this.restore('ClosedSwitches'))
        }
        }
        } else {
        console.log('Something is still open.')
        }
        }
        }
        

	})
