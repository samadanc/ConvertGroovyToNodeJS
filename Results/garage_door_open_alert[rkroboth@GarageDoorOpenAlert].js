
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Send a push alert when this door is open...', section => {
            section.deviceSetting('garageDoorSensors').capability(['contactSensor']).name('Which?');

        });


        page.section('For this long...', section => {
            section.numberSetting('maxOpenTime').name('Minutes?');

        });


        page.section('Mute alerts?', section => {
            section.booleanSetting('mute_alerts').name('Mute alerts?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.garageDoorSensors, 'contactSensor', 'contact', 'onChange')

    })

    .subscribedEventHandler('onChange', (context, event) => {
        
        let door_status = 'open'
        garageDoorSensors.each({
        if (it.currentState('contact').value == 'closed') {
        door_status = null
        }
        })
        state.door_status = door_status
        if (state.door_status == 'open') {
        log.trace('Garage door is currently open.')
        this.schedulePushAlert(maxOpenTime * 60)
        } else {
        state.last_scheduled_push_alert_time = null
        log.trace('Garage door is currently closed.')
        }
        

	})
