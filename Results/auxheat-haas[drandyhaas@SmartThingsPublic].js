
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose thermostat... ', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Heat pump temp...', section => {
            section.numberSetting('heatpumpSetpoint').name('Turn on at degrees?');

        });


        page.section('Choose other thermostats to update too... ', section => {
            section.deviceSetting('otherthermostats').capability(['thermostat']).name('');

        });


        page.section('Choose hottub ... ', section => {
            section.deviceSetting('hottub').capability(['temperatureMeasurement']).name('');

        });


        page.section('Choose hottub power sensor... ', section => {
            section.deviceSetting('hottubpower').capability(['powerMeter']).name('');

        });


        page.section('Choose the weather to update... ', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.hottub, 'temperatureMeasurement', 'message', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.hottub, 'temperatureMeasurement', 'greeting', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'humidity', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'coolingSetpoint', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'heatingSetpoint', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'temperature', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.hottub, 'temperatureMeasurement', 'temperature', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'battery', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        console.log("evt: ${event.value} ${event.name} ${event.displayName} ")
        if ('greeting' == event.name && 'Hottub' == event.displayName) {
        console.log("message ${event.value} from hottub")
        this.sendPush("hotttub says ${event.value} ")
        if ('on' == event.value) {
        console.log('will turn off in 1 hour')
        this.sendPush('will turn off in 1 hour')
        this.runIn(3600, tuboff)
        }
        }
        let now = new Date().time
        console.log("$now : ${state.lastRun}")
        if (!state.lastRun) {
        state.lastRun = now
        }
        let timedif = now - state.lastRun / 1000
        console.log("timedif: $timedif s and handler: ${event.name}, $settings")
        if (timedif > 10 * 60) {
        state.lastRun = now
        this.appTouch(evt)
        }
        

	})
