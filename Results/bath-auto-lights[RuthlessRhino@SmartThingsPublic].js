
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these lights...', section => {
            section.deviceSetting('lights').capability(['switch']).name('');

        });


        page.section('Turn on when it\'s dark and there\'s movement...', section => {
            section.deviceSetting('motionDevice').capability(['motionSensor']).name('Where?');

        });


        page.section('Using this lux sensor', section => {
            section.deviceSetting('luxDevice').capability(['illuminanceMeasurement']).name('');

        });


        page.section('Lux dark threshold for light sensor, defaults to 10', section => {
            section.enumSetting('luxCutoff').name('LUX?');

        });


        page.section('And off when there\'s been no movement for...', section => {
            section.enumSetting('delayMinutesMotion').name('Minutes?');

        });


        page.section('Unless humidity is detected... ', section => {
            section.deviceSetting('activeHumidityDevices').capability(['relativeHumidityMeasurement']).name('Where?');

        });


        page.section('Using this humidity sensor as the base line', section => {
            section.deviceSetting('baseHumidityDevice').capability(['relativeHumidityMeasurement']).name('Which?');

        });


        page.section('Humidity setpoint (above base line)', section => {
            section.enumSetting('humiditySetPoint').name('Percent?');

        });


        page.section('When humidity is detected, extend on time by... ', section => {
            section.enumSetting('delayMinutesHumidity').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionDevice, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'active') {
        if (this.luxEnabled()) {
        console.log('motionHandler- turning on lights due to motion')
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        state.lastStatus = 'on'
        }
        state.motionStopTime = null
        } else {
        console.log('motionHandler- motion stopped')
        state.motionStopTime = this.now()
        
        context.api.devices.sendCommands(context.config.delayMinutesMotion, 'enum', runIn)
    
        }
        

	})
