
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('lights').capability(['switch']).name('Which lights?');
            section.numberSetting('timeout').name('Timer length');
            section.deviceSetting('door1').capability(['contactSensor']).name('Which door?');
            section.booleanSetting('offWithDoor').name('Turn off with door opening?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.door1, 'contactSensor', 'contact.open', 'openHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lights, 'switch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.door1, 'contactSensor', 'contact.closed', 'closedHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        this.startIfNeeded()
        

	})

    .subscribedEventHandler('openHandler', (context, event) => {
        
        if (state.currentlyRunning) {
        console.log('The door opened, turning off the lights')
        this.stopTimer()
        } else {
        console.log('The timer is not currently running')
        }
        

	})

    .subscribedEventHandler('closedHandler', (context, event) => {
        
        this.startIfNeeded()
        

	})
