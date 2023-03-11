
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Monitoring group ${(i + 1)}', section => {
            section.deviceSetting('group_$i').capability(['battery']).name('Select devices to monitor');
            section.numberSetting('threshold_$i').name('Notify if battery is below');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('check_batteries', delay);

    })

    .scheduledEventHandler('check_batteries', (context, event) => {
        
        let size
        let batteries
        let device
        let threshold
        let value
        let sms
        for (java.lang.Integer i = 0; i < 4; i++) {
        size = settings["group_$i"]?.size() ? settings["group_$i"]?.size() : 0
        sms = settings."sms_$i".toString() ? settings."sms_$i".toString() : 0
        if (size > 0) {
        threshold = settings."threshold_$i".toInteger()
        console.log("***Checking batteries for group ${(i + 1)} (threshold $threshold)")
        batteries = settings."group_$i".currentValue('battery')
        for (java.lang.Integer j = 0; j < size ; j++) {
        device = settings["group_$i"][ j ]
        if (device != null) {
        value = batteries[ j ]
        if (value != null && value < threshold ) {
        console.log("The $device battery is at $value, below threshold ($threshold)")
        this.sendPush("The $device battery is at $value, below threshold ($threshold)")
        if (sms) {
        this.sendSms(sms, "The $device battery is at $value, below threshold ($threshold)")
        }
        } else {
        console.log("The $device battery is at $value")
        }
        }
        }
        } else {
        console.log("***Group ${(i + 1)} has no devices ($size devices)")
        }
        }
        

	})
