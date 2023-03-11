
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When is the motion...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('Delay after motions stops to turn off lights...', section => {
            section.numberSetting('delayMinutes').name('Delay in Minutes?');

        });


        page.section('And it\'s dark...', section => {
            section.deviceSetting('lightSensor1').capability(['illuminanceMeasurement']).name('Where?');

        });


        page.section('Lux Value', section => {
            section.numberSetting('luxValue').name('Lux Value 0 - 1000?');

        });


        page.section('Turn on a light...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Turn on a dimmer...', section => {
            section.deviceSetting('dimmer1').capability(['switchLevel']).name('');

        });


        page.section('Dimmer Value', section => {
            section.numberSetting('dimmerValue').name('dimmer Value 10% - 100%?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'contactMotionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lightSensor1, 'illuminanceMeasurement', 'illuminance', 'lumHandler')

    })

    .subscribedEventHandler('contactMotionHandler', (context, event) => {
        
        let lightSensorState = state.luminance
        let lastStatus = state.lastStatus
        console.log("SENSOR = $lightSensorState")
        console.log("luxValue=$luxValue")
        if (event.value == 'active' && lightSensorState < luxValue ) {
        console.log('There is motion')
        state.motionStopTime = this.now()
        if (dimmer1 != null && state.lastStatus != 'on') {
        log.trace("dimmerValue = $dimmerValue")
        
        context.api.devices.sendCommands(context.config.dimmer1, 'switchLevel', setLevel)
    
        state.dimmerLastStatus = 'on'
        }
        if (switch1 != null && state.lastStatus != 'on') {
        log.trace("light.on() ... [luminance: $lightSensorState]")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        state.switchLastStatus = 'on'
        }
        } else {
        if (event.value == 'inactive' && state.lastStatus != 'off') {
        console.log('There is no motion')
        state.motionStopTime = this.now()
        if (delayMinutes) {
        this.runIn(delayMinutes * 60, turnOffMotionAfterDelay, ['overwrite': false])
        } else {
        this.turnOffMotionNoDelay()
        }
        }
        }
        

	})

    .subscribedEventHandler('lumHandler', (context, event) => {
        
        if (lightSensor1 != null) {
        state.luminance = event.integerValue
        } else {
        state.luminance = 0
        }
        

	})
