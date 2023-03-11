
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Battery Alarm Level', section => {
            section.numberSetting('alarmAt').name('Alert when below...');
            section.deviceSetting('batteryDevices').capability(['battery']).name('Which devices?');

        });


        page.section('Notifications', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('doBatteryCheck', delay);

    })

    .scheduledEventHandler('doBatteryCheck', (context, event) => {
        
        let belowLevelCntr = 0
        let pushMsg = ''
        for (let batteryDevice : batteryDevices ) {
        let batteryLevel = batteryDevice.currentValue('battery')
        if
        pushMsg += "${batteryDevice.name} named ${batteryDevice.label} is at: $batteryLevel%
        "
        belowLevelCntr++
        }
        }
        if (belowLevelCntr) {
        pushMsg = "You have $belowLevelCntr devices below the set alarm level.
        " + pushMsg
        } else {
        pushMsg = 'Battery Check App executed with no devices below alarm level'
        }
        console.log(pushMsg)
        this.sendSms(phoneNumber, pushMsg)
        

	})
