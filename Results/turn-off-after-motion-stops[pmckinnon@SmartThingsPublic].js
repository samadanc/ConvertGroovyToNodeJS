
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Switches, Motions and Minutes', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('locks').capability(['lock']).name('Locks');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motions');
            section.numberSetting('minutes').name('Minutes');
            section.deviceSetting('gates').capability(['contactSensor']).name('Disable Gate Switches');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion.inactive', 'inactiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion.active', 'activeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.gates, 'contactSensor', 'contact.closed', 'contactClosedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.gates, 'contactSensor', 'contact.opened', 'contactOpenHandler')

    })

    .subscribedEventHandler('inactiveHandler', (context, event) => {
        
        this.scheduleOff()
        

	})

    .subscribedEventHandler('contactClosedHandler', (context, event) => {
        
        this.runIn(30, scheduleOff)
        

	})

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        state.pending = false
        

	})

    .subscribedEventHandler('activeHandler', (context, event) => {
        
        state.pending = false
        

	})
