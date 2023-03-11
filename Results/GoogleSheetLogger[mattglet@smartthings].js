
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Google Spreadsheet Settings', section => {
            section.textSetting('urlKey').name('Spreadsheet key');

        });


        page.section('Log events for...', section => {
            section.deviceSetting('accelerationSensor').capability(['accelerationSensor']).name('Acceleration');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperatures');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.accelerationSensor, 'accelerationSensor', 'acceleration', 'accelerationHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatures, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('accelerationHandler', (context, event) => {
        
        let status = event.value
        let doLog = false
        console.log("Acceleration: $status")
        console.log("Now: ${this.now()}")
        console.log("Last Active: ${state.lastActive}")
        console.log("Last Inactive: ${state.lastInactive}")
        if (status == 'active' && this.now() > state.lastInactive + state.delayLoggingMilliseconds) {
        doLog = true
        state.lastActive = this.now()
        }
        if (status == 'inactive' && this.now() > state.lastActive + state.delayLoggingMilliseconds) {
        doLog = true
        state.lastInactive = this.now()
        }
        if (doLog) {
        this.logValue('Vibration', status)
        }
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        let temp = event.value
        console.log("Temperature: $temp")
        this.logValue('Temperature', temp)
        

	})
