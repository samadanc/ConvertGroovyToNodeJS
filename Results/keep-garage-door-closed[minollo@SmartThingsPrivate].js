
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Poller device...', section => {
            section.deviceSetting('pollerDevice').capability(['battery']).name('');

        });


        page.section('Garage door', section => {
            section.deviceSetting('contactSensor').capability(['contactSensor']).name('Open/close sensor?');
            section.deviceSetting('doorSwitch').capability(['switch']).name('Door switch?');

        });


        page.section('Away mode', section => {
            section.numberSetting('maxOpenTimeWhenAway').name('Minutes?');

        });


        page.section('Home mode', section => {
            section.numberSetting('maxOpenTimeWhenHome').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact.open', 'contactSensorOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact.closed', 'contactSensorClosedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.pollerDevice, 'battery', 'battery', 'pollerEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.doorSwitch, 'switch', 'switch.on', 'doorSwitchHandler')

    })

    .subscribedEventHandler('contactSensorClosedHandler', (context, event) => {
        
        console.log('Garage just closed; we are fine')
        try {
        this.unschedule(closeGarage)
        }
        catch (let e) {
        log.error("Ignoring error: $e")
        }
        

	})

    .subscribedEventHandler('contactSensorOpenHandler', (context, event) => {
        
        console.log('Garage just opened; start counting')
        this.updateState()
        

	})

    .subscribedEventHandler('doorSwitchHandler', (context, event) => {
        
        console.log('Button pushed')
        

	})

    .subscribedEventHandler('pollerEvent', (context, event) => {
        
        console.log('[PollerEvent]')
        if (state.timerLatest && this.now() - state.timerLatest > maxOpenTimeWhenAway + 1 * 60 * 1000) {
        log.error('Closing garage (timer was asleep)')
        this.closeGarage()
        }
        

	})
