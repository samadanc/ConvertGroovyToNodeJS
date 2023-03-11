
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Motion Sensor(s)', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Pick your sensors');

        });


        page.section('Lights', section => {
            section.deviceSetting('lights').capability(['switch']).name('Pick your swithces');

        });


        page.section('Misc.', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion.active', 'motionActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion.inactive', 'motionInactiveHandler')

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        this.unschedule(turnOff)
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        

	})

    .subscribedEventHandler('motionInactiveHandler', (context, event) => {
        
        let motionValue = motion.find({
        it.currentValue == 'active'
        })
        if (!motionValue) {
        console.log('there\'s legit no motion anywhere...scheduling lights off')
        let threshold = thresh * 60
        this.runIn(threshold, turnOff)
        }
        

	})
