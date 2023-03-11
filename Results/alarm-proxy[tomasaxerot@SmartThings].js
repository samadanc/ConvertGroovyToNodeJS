
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select away sensors:', section => {
            section.deviceSetting('awayMotionIn').capability(['motionSensor']).name('Away motion sensors');
            section.deviceSetting('awayContactIn').capability(['contactSensor']).name('Away contact sensors');

        });


        page.section('Select stay sensors:', section => {
            section.deviceSetting('stayMotionIn').capability(['motionSensor']).name('Stay motion sensors');
            section.deviceSetting('stayContactIn').capability(['contactSensor']).name('Stay contact sensors');

        });


        page.section('Select output sensor:', section => {

        });


        page.section('Entry Delay Configuration', section => {
            section.numberSetting('entryDelay').name('Seconds');
            section.booleanSetting('entrySendPush').name('Send Push Notification when entry delay starts?');
            section.deviceSetting('entrySirens').capability(['alarm']).name('Beep with siren when entry delay starts?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmSystemStatusHandler')

    })

    .subscribedEventHandler('alarmSystemStatusHandler', (context, event) => {
        
        log.trace("alarmSystemStatusHandler: ${event.value}")
        atomicState.alarmSystemStatus = event.value
        if (this.isOff()) {
        this.unschedule(activateVirtualSensor)
        this.unschedule(openVirtualSensor)
        }
        

	})
