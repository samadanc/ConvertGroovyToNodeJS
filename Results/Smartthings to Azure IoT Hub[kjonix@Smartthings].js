
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Power Meter', section => {
            section.deviceSetting('powers').capability(['powerMeter']).name('Power Sensor');

        });


        page.section('Environment', section => {
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperature Sensors');

        });


        page.section('Security Sensors', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion Sensors');

        });


        page.section('Switches', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches');

        });


        page.section('Acceleration Sensors', section => {
            section.deviceSetting('acceleration sensors').capability(['accelerationSensor']).name('Acceleration Sensors');

        });


        page.section('Contact Sensors', section => {
            section.deviceSetting('contact sensors').capability(['contactSensor']).name('Contact Sensors');

        });


        page.section('Buttons', section => {
            section.deviceSetting('buttons').capability(['button']).name('Buttons');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'motionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.powers, 'powerMeter', 'power', 'powerHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatures, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('powerHandler', (context, event) => {
        
        this.sendEvent('powerMeter', event.displayName, 'power', event.value)
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        this.sendEvent(event.displayName + 'temp', event.displayName, 'temperature', event.value)
        

	})

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (event.value == 'on') {
        this.sendEvent(event.displayName + 'switch', event.displayName, 'switch', 'on')
        } else {
        if (event.value == 'off') {
        this.sendEvent(event.displayName + 'switch', event.displayName, 'switch', 'off')
        }
        }
        

	})

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        if (event.value == 'open') {
        this.sendEvent(event.displayName + 'contact', event.displayName, 'doorOpen', 'open')
        }
        if (event.value == 'closed') {
        this.sendEvent(event.displayName + 'contact', event.displayName, 'doorOpen', 'closed')
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        if (event.value == 'active') {
        this.sendEvent(event.displayName + 'motion', event.displayName, 'motion', 'motion detected')
        }
        if (event.value == 'inactive') {
        this.sendEvent(event.displayName + 'motion', event.displayName, 'motion', 'no motion detected')
        }
        

	})
