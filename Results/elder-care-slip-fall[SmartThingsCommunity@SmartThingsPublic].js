
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Bedroom motion detector(s)', section => {
            section.deviceSetting('bedroomMotion').capability(['motionSensor']).name('');

        });


        page.section('Bathroom motion detector', section => {
            section.deviceSetting('bathroomMotion').capability(['motionSensor']).name('');

        });


        page.section('Active between these times', section => {
            section.timeSetting('startTime').name('Start Time');
            section.timeSetting('stopTime').name('Stop Time');

        });


        page.section('Send message when no return within specified time period', section => {
            section.textSetting('warnMessage').name('Warning Message');
            section.numberSetting('threshold').name('Minutes');

        });


        page.section('To these contacts', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.bedroomMotion, 'motionSensor', 'motion.active', 'bedroomActive')

        await context.api.subscriptions.subscribeToDevices(context.config.bathroomMotion, 'motionSensor', 'motion.active', 'bathroomActive')

    })

    .subscribedEventHandler('bedroomActive', (context, event) => {
        
        let start = this.timeToday(startTime, location?.timeZone)
        let stop = this.timeToday(stopTime, location?.timeZone)
        let now = new Date()
        console.log("bedroomActive, status: ${state.ststus}, start: $start, stop: $stop, now: $now")
        if (state.status == 'waiting') {
        console.log('motion detected in bedroom, disarming')
        this.unschedule('sendMessage')
        state.status = null
        } else {
        if (start.before(now) && stop.after(now)) {
        console.log('motion in bedroom, look for bathroom motion')
        state.status = 'pending'
        } else {
        console.log('Not in time window')
        }
        }
        

	})

    .subscribedEventHandler('bathroomActive', (context, event) => {
        
        console.log("bathroomActive, status: ${state.status}")
        if (state.status == 'pending') {
        
        context.api.devices.sendCommands(context.config.threshold, 'number', toInteger)
    
        state.status = 'waiting'
        console.log("runIn($delay)")
        this.runIn(delay, sendMessage)
        }
        

	})
