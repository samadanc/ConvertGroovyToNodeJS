
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Lights:', section => {
            section.deviceSetting('lights').capability(['switchLevel']).name('');

        });


        page.section('Motion Sensor:', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('');

        });


        page.section('Time Interval #$i', section => {
            section.timeSetting('startTime_$i').name('Starting at:');
            section.timeSetting('endTime_$i').name('Ending at:');
            section.numberSetting('level_$i').name('Level in percent (1-100)');
            section.numberSetting('duration_$i').name('Minutes to keep the light on after motion stops:');

        });


        page.section('Logstash Server', section => {
            section.textSetting('logstash_host').name('Logstash Hostname/IP');
            section.numberSetting('logstash_port').name('Logstash Port');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion.active', 'motionActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion.inactive', 'motionInactiveHandler')

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        let i = this.getInterval()
        let level = settings."level_$i"
        state.offDelay = settings."duration_$i" * 60
        this.stash("Turning $lights on to $level!  When motion stops, will turn off in ${state.offDelay} seconds.  (Interval $i)")
        lights?.setLevel(level)
        if (state.scheduled) {
        this.unschedule()
        state.scheduled = false
        }
        

	})

    .subscribedEventHandler('motionInactiveHandler', (context, event) => {
        
        let allQuiet = true
        motionSensor.each({
        if (it.currentValue == 'active') {
        allQuiet == false
        }
        })
        if (allQuiet) {
        this.stash("Motion has stopped on all sensors.  Turning lights off in ${state.offDelay} seconds.")
        this.runIn(state.offDelay, lightsOff)
        state.scheduled = true
        }
        

	})
