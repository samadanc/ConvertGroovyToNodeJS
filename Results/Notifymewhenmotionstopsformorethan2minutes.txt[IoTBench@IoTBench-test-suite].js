
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When motion stops...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('Text me at...', section => {

        });


        page.section('If lights are on...', section => {
            section.deviceSetting('light1').capability(['illuminanceMeasurement']).name('Where?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion.active', 'motionActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion.inactive', 'motionInactiveHandler')

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        state.count = state.count + 1
        log.trace("${state.count}, motion occured")
        

	})

    .subscribedEventHandler('motionInactiveHandler', (context, event) => {
        
        if (state.count != 0) {
        state.count = state.count - 1
        }
        log.trace("${state.count}, in Handler")
        this.runIn(10, 'takeAction', ['overwrite': false])
        

	})
