
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a motion detector to use...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('motion');

        });


        page.section('Change to a new mode when...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        if (event.value == 'inactive') {
        this.changeMode(onMode)
        } else {
        this.changeMode(offMode)
        }
        

	})
