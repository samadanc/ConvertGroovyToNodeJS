
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log devices...', section => {
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperatures');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contacts');
            section.deviceSetting('accelerations').capability(['accelerationSensor']).name('Accelerations');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motions');
            section.deviceSetting('switches').capability(['switch']).name('Switches');

        });


        page.section('ThinkSpeak channel id...', section => {
            section.numberSetting('channelId').name('Channel id');

        });


        page.section('ThinkSpeak write key...', section => {
            section.textSetting('channelKey').name('Channel key');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperatures, 'temperatureMeasurement', 'temperature', 'handleTemperatureEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'handleMotionEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'handleContactEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.accelerations, 'accelerationSensor', 'acceleration', 'handleAccelerationEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handleSwitchEvent')

    })

    .subscribedEventHandler('handleContactEvent', (context, event) => {
        
        console.log('[handleContactEvent]')
        this.logField(evt, {
        it == 'open' ? '1' : '0'
        })
        

	})

    .subscribedEventHandler('handleTemperatureEvent', (context, event) => {
        
        console.log('[handleTemperatureEvent]')
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleAccelerationEvent', (context, event) => {
        
        console.log('[handleAccelerationEvent]')
        this.logField(evt, {
        it == 'active' ? '1' : '0'
        })
        

	})

    .subscribedEventHandler('handleMotionEvent', (context, event) => {
        
        console.log('[handleMotionEvent]')
        this.logField(evt, {
        it == 'active' ? '1' : '0'
        })
        

	})

    .subscribedEventHandler('handleSwitchEvent', (context, event) => {
        
        console.log('[handleSwitchEvent]')
        this.logField(evt, {
        it == 'on' ? '1' : '0'
        })
        

	})
