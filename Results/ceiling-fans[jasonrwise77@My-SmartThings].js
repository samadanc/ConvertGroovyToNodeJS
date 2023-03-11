
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Fans', section => {
            section.deviceSetting('myFans').capability(['switch']).name('Ceiling Fans');

        });


        page.section('Temperature', section => {
            section.deviceSetting('myTempSensor').capability(['temperatureMeasurement']).name('Temperature Sensor');

        });


        page.section('Motion', section => {
            section.deviceSetting('myMotionSensors').capability(['motionSensor']).name('Motion Sensors');
            section.numberSetting('myInactivityDelay').name('Inactivity Minutes');

        });


        page.section('Modes (default Home)', section => {

        });


        page.section('['mobileOnly': true]', section => {

        });


        page.section(''Users Guide'', section => {

        });


        page.section(''Overview'', section => {

        });


        page.section(''Ceiling Fans'', section => {

        });


        page.section(''Temperature Sensor'', section => {

        });


        page.section(''Motion Sensors'', section => {

        });


        page.section(''Inactivity Minutes'', section => {

        });


        page.section(''Operating Modes'', section => {

        });


        page.section(''Tips and Tricks'', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.myTempSensor, 'temperatureMeasurement', 'temperature', 'temperatureChangedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.myMotionSensors, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('modeChangedHandler', (context, event) => {
        
        this.LOG("Mode Changed: ${location.mode}")
        this.checkConditions()
        

	})

    .subscribedEventHandler('temperatureChangedHandler', (context, event) => {
        
        state.insideTemp = event.doubleValue
        this.LOG("Inside Temp: ${state.insideTemp}")
        this.checkConditions()
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        this.LOG("motionHandler: ${event.value}")
        if ('active' == event.value) {
        this.checkConditions()
        } else {
        if ('inactive' == event.value) {
        state.waitingForTimeout = true
        this.runIn(state.delay * 60, completeTimeout)
        }
        }
        

	})
