
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Switches, Motions and Minutes', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motions');
            section.numberSetting('minutes').name('Minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion.inactive', 'inactiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion.active', 'activeHandler')

    })

    .subscribedEventHandler('inactiveHandler', (context, event) => {
        
        let noMotion = true
        motions.each({
        noMotion = noMotion && it.currentMotion == 'inactive'
        })
        state.pending = noMotion
        if (noMotion) {
        if (minutes) {
        this.runIn(minutes * 60, switchesOff)
        } else {
        this.switchesOff()
        }
        }
        

	})

    .subscribedEventHandler('activeHandler', (context, event) => {
        
        state.pending = false
        

	})
