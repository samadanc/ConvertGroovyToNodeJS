
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About this'', section => {

        });


        page.section('When any of the following devices...', section => {
            section.deviceSetting('selectedMotionSensor').capability(['motionSensor']).name('Motion sensor?');
            section.deviceSetting('selectedContactSensor').capability(['contactSensor']).name('Contact sensor?');
            section.deviceSetting('selectedButton').capability(['button']).name('What button?');
            section.deviceSetting('selectedAccelerationSensor').capability(['accelerationSensor']).name('Acceleration sensor?');
            section.deviceSetting('selectedSwitch').capability(['switch']).name('Switch?');
            section.deviceSetting('selectedPresenceSensor').capability(['presenceSensor']).name('Presence sensor?');
            section.deviceSetting('selectedWaterSensor').capability(['waterSensor']).name('Moisture sensor?');

        });


        page.section('Recording setup', section => {
            section.deviceSetting('selectedVideoCapture').capability(['videoCapture']).name('Which camera?');
            section.numberSetting('clipLength').name('Clip length');
            section.textSetting('notifyMessage').name('Notification message');
            section.timeSetting('betweenTimeFrom').name('Time from');
            section.timeSetting('betweenTimeTo').name('Time to');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('startVideoCapture', (context, event) => {
        
        console.log('Begin...')
        let isTimeBetween = this.timeOfDayIsBetween(settings.betweenTimeFrom, settings.betweenTimeTo, new Date(), location.timeZone)
        if (isTimeBetween) {
        let now = new Date(this.now() + location.timeZone.rawOffset).format('dd/MM/yy\' at \'HH:mm:ss')
        let notification = 'Actioned on ' + now + " by ${event.device} the ${event.value} ${event.name}, refreshing cameras with ${settings.clipLength} seconds capture"
        console.log(notification)
        Date start = new Date()
        Date end = new Date()
        this.use(TimeCategory, {
        end = start + settings.clipLength.seconds
        })
        console.log('Capturing...')
        settings.selectedVideoCapture.capture
        if (settings.notifyMessage) {
        this.sendNotificationEvent(settings.notifyMessage + ' ' + notification )
        this.sendPush(settings.notifyMessage + ' ' + notification )
        }
        }
        console.log('...end')
        

	})
