
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When any of these cars arrive...', section => {
            section.deviceSetting('cars').capability(['presenceSensor']).name('');

        });


        page.section('Open this garage door...', section => {
            section.deviceSetting('garageDoorContact').capability(['contactSensor']).name('');

        });


        page.section('With this relay...', section => {
            section.deviceSetting('garageDoorSwitch').capability(['momentary']).name('');

        });


        page.section('Turn on these lights...', section => {
            section.deviceSetting('lightSwitches').capability(['switch']).name('');

        });


        page.section('Wait this many minutes between presence changes to act (default: 10)...', section => {
            section.numberSetting('falseAlarmThreshold').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.cars, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        let threshold = falseAlarmThreshold != null && falseAlarmThreshold != '' ? ((falseAlarmThreshold * 60 * 1000) as Long) : 10 * 60 * 1000
        let t0 = new Date(this.now() - threshold )
        if (event.value == 'present') {
        let car = this.getCar(evt)
        let recentNotPresent = car.statesSince('presence', t0).find({
        it.value == 'not present'
        })
        if (recentNotPresent) {
        console.log("skipping open for ${car.displayName} because last departure was only ${(this.now() - recentNotPresent.date.time)} msec ago")
        } else {
        this.openDoor()
        }
        }
        

	})
