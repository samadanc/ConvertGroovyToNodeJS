
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Music Players, Motion Sensors and Wait Time', section => {
            section.deviceSetting('player').capability(['musicPlayer']).name('Player');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion Sensor');
            section.numberSetting('minutes').name('Minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion.inactive', 'inactiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion.active', 'activeHandler')

        context.api.schedules.runIn('pause', delay);

    })

    .subscribedEventHandler('inactiveHandler', (context, event) => {
        
        console.log('inactiveHandler')
        state.pending = !('active' in motions.currentMotion)
        if (state.pending) {
        if (minutes) {
        this.runIn(minutes * 60, pause)
        } else {
        this.pause()
        }
        }
        

	})

    .subscribedEventHandler('activeHandler', (context, event) => {
        
        console.log('activeHandler')
        state.pending = false
        

	})

    .scheduledEventHandler('pause', (context, event) => {
        
        console.log("pause $player")
        if (state.pending) {
        
        context.api.devices.sendCommands(context.config.player, 'musicPlayer', pause)
    
        state.pending = !('active' in motions.currentMotion)
        if (minutes) {
        this.runIn(minutes * 60, pause)
        }
        }
        

	})
