
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a temperature sensor... ', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Sensor');

        });


        page.section('Choose a motion sensor... ', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion');

        });


        page.section('Select the heater or air conditioner outlet(s)... ', section => {
            section.deviceSetting('outlets').capability(['switch']).name('Outlets');

        });


        page.section('Set the desired temperature (F)...', section => {

        });


        page.section('Set the desired threshold (F)...', section => {

        });


        page.section('Refresh rate (min)', section => {
            section.numberSetting('refresh_rate_min').name('check temperature every x minutes');

        });


        page.section('Select \'heat\' for a heater and \'cool\' for an air conditioner...', section => {
            section.enumSetting('mode').name('Heating or cooling?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'motionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log('motion detected')
        this.checkTemp()
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        console.log('temperature change detected')
        this.checkTemp()
        

	})
