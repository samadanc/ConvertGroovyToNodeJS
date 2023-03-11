
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When . . .', section => {
            section.deviceSetting('accSensor').capability(['accelerationSensor']).name('Pump sensor inactive');
            section.numberSetting('numHours').name('For how many hours');
            section.textSetting('messageText').name('Send notification that says');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.accSensor, 'accelerationSensor', 'acceleration', 'onAccelerationChange')

    })

    .subscribedEventHandler('onAccelerationChange', (context, event) => {
        
        console.log('onAccelerationChange')
        if (event.value == 'inactive') {
        this.runIn(numHours * 3600, onAccelerationInactiveHandler)
        } else {
        this.unschedule(onAccelerationInactiveHandler)
        }
        

	})
