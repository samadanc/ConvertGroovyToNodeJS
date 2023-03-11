
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these lights (set 1)', section => {
            section.deviceSetting('lights1').capability(['colorControl']).name('Which bulbs?');
            section.enumSetting('color1').name('Set this color?');
            section.enumSetting('lightLevel1').name('And this light Level?');

        });


        page.section('Control these lights (set 2)', section => {
            section.deviceSetting('lights2').capability(['colorControl']).name('Which bulbs?');
            section.enumSetting('color2').name('Set this color?');
            section.enumSetting('lightLevel2').name('And this light Level?');

        });


        page.section('Control these lights (set 3)', section => {
            section.deviceSetting('lights3').capability(['colorControl']).name('Which bulbs?');
            section.enumSetting('color3').name('Set this color?');
            section.enumSetting('lightLevel3').name('And this light Level?');

        });


        page.section('Control these lights (set 4)', section => {
            section.deviceSetting('lights4').capability(['colorControl']).name('Which bulbs?');
            section.enumSetting('color4').name('Set this color?');
            section.enumSetting('lightLevel4').name('And this light Level?');

        });


        page.section('Control these lights (set 5)', section => {
            section.deviceSetting('lights5').capability(['colorControl']).name('Which bulbs?');
            section.enumSetting('color5').name('Set this color?');
            section.enumSetting('lightLevel5').name('And this light Level?');

        });


        page.section('Choose Motion Sensor(s)...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Motion');

        });


        page.section('Switch lights off when it\'s light or there\'s been no movement for...', section => {
            section.numberSetting('delayMinutes').name('Minutes?');

        });


        page.section('Using this light sensor (optional)', section => {
            section.deviceSetting('lightSensor').capability(['illuminanceMeasurement']).name('');
            section.numberSetting('lightValue').name('Switch at intensity (Lux)?');

        });


        page.section('Only during certain modes', section => {

        });


        page.section('Only during a certain time', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lightSensor, 'illuminanceMeasurement', 'illuminance', 'illuminanceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}, lastStatus: ${state.lastStatus}, motionStopTime: ${state.motionStopTime}")
        let lastStatus = state.lastStatus
        this.timeCheck()
        if (state.timeCheck) {
        if (lastStatus != 'off' && event.integerValue > lightValue ? lightValue : 100) {
        this.deactivateHue()
        } else {
        if (state.motionStopTime) {
        if (lastStatus != 'off') {
        let elapsed = this.now() - state.motionStopTime
        if (elapsed >= delayMinutes ? delayMinutes : 0 * 60000 - 2000) {
        this.deactivateHue()
        }
        }
        } else {
        if (lastStatus != 'on' && event.integerValue + 20 < lightValue ? lightValue : 100) {
        this.activateHue()
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}, lastStatus: ${state.lastStatus}, motionStopTime: ${state.motionStopTime}")
        
        context.api.devices.sendCommands(context.config.motionSensor, 'motionSensor', currentValue)
    
        let motionValue = motionSensor.find({
        it.currentMotion == 'active'
        })
        this.darkCheck()
        this.timeCheck()
        if (state.timeCheck) {
        if (motionValue) {
        state.motionStopTime = null
        if (state.darkCheck) {
        this.activateHue()
        }
        } else {
        state.motionStopTime = this.now()
        if (delayMinutes) {
        this.runIn(delayMinutes * 60, turnOffMotionAfterDelay, ['overwrite': false])
        log.info("Delay: $delayMinutes minutes")
        } else {
        this.turnOffMotionAfterDelay()
        }
        }
        } else {
        if (motionValue) {
        state.motionStopTime = null
        } else {
        state.motionStopTime = this.now()
        this.runIn(30 * 60, turnOffMotionAfterDelay, ['overwrite': false])
        log.info('Delay: 30 minutes')
        }
        }
        

	})
