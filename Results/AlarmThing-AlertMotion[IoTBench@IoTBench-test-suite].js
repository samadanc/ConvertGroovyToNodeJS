
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there is motion on this alarm...', section => {
            section.deviceSetting('theAlarm').capability(['alarm']).name('');

        });


        page.section('for this sensor...', section => {

        });


        page.section('push me this message...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theAlarm, 'alarm', 'theSensor + '.active', 'sensorTriggered')

    })

    .subscribedEventHandler('sensorTriggered', (context, event) => {
        
        this.sendPush(theMessage)
        

	})
