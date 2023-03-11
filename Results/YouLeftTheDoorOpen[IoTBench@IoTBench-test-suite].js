
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Notify me when the door named...', section => {

        });


        page.section('On this alarm...', section => {
            section.deviceSetting('theAlarm').capability(['alarm']).name('');

        });


        page.section('Is left open for more than...', section => {
            section.numberSetting('maxOpenTime').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theAlarm, 'alarm', 'theSensor', 'sensorTriggered')

    })

    .subscribedEventHandler('sensorTriggered', (context, event) => {
        
        if (event.value == 'closed') {
        this.clearStatus()
        } else {
        if (event.value == 'open' && state.status != 'scheduled') {
        this.runIn(maxOpenTime * 60, takeAction, ['overwrite': false])
        state.status = 'scheduled'
        }
        }
        

	})
