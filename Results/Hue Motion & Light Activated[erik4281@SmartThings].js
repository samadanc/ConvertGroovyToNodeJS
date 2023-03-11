
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these lights (1)...', section => {
            section.deviceSetting('lights1').capability(['colorControl']).name('Which Hue Bulbs?');

        });


        page.section('With these light effects (1)...', section => {
            section.enumSetting('color1').name('Hue Color?');
            section.enumSetting('lightLevel1').name('Light Level?');

        });


        page.section('Also control these lights (2)... (optional)', section => {
            section.deviceSetting('lights2').capability(['colorControl']).name('Which Hue Bulbs?');

        });


        page.section('With light effects (2)...', section => {
            section.enumSetting('color2').name('Hue Color?');
            section.enumSetting('lightLevel2').name('Light Level?');

        });


        page.section('Also control these lights (3)... (optional)', section => {
            section.deviceSetting('lights3').capability(['colorControl']).name('Which Hue Bulbs?');

        });


        page.section('With light effects (3)...', section => {
            section.enumSetting('color3').name('Hue Color?');
            section.enumSetting('lightLevel3').name('Light Level?');

        });


        page.section('Choose Motion Sensor(s)...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Motion');

        });


        page.section('Switch lights off when it\'s light or there\'s been no movement for...', section => {
            section.numberSetting('delayMinutes').name('Minutes?');

        });


        page.section('Using this light sensor (optional)', section => {
            section.deviceSetting('lightSensor').capability(['illuminanceMeasurement']).name('');

        });


        page.section('Using this light level as trigger (default is 50)', section => {
            section.numberSetting('lightValue').name('Lux?');

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
        
        if (starting && ending ) {
        let currTime = this.now()
        let start = this.timeToday(starting).time
        let stop = this.timeToday(ending).time
        log.info("$currTime")
        log.info("$start")
        log.info("$stop")
        log.info('Start & Stop time set')
        if (start < stop ? currTime >= start && currTime <= stop : currTime <= stop || currTime >= start ) {
        log.info('Within time-window!')
        this.illuminanceHandlerTimed(evt)
        }
        } else {
        log.info('No timing limits')
        this.illuminanceHandlerTimed(evt)
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        if (starting && ending ) {
        let currTime = this.now()
        let start = this.timeToday(starting).time
        let stop = this.timeToday(ending).time
        log.info("$currTime")
        log.info("$start")
        log.info("$stop")
        log.info('Start & Stop time set')
        if (start < stop ? currTime >= start && currTime <= stop : currTime <= stop || currTime >= start ) {
        log.info('Within time-window!')
        this.motionHandlerTimed(evt)
        }
        } else {
        log.info('No timing limits')
        this.motionHandlerTimed(evt)
        }
        

	})
