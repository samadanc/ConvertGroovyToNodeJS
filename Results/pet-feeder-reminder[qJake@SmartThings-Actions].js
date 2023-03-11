
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('1. Choose your pet feeder sensor.', section => {
            section.deviceSetting('feeder1').capability(['contactSensor']).name('Which sensor?');

        });


        page.section('2. Specify when you feed your pets.', section => {
            section.timeSetting('timefrom').name('Between...');
            section.timeSetting('timeto').name('And...');

        });


        page.section('3. If I forget by the ending time, text me.', section => {
            section.textSetting('msg').name('Message? (Optional)');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

    })

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        let now = new Date()
        let from = Date.parse('yyyy-MM-dd\'T\'HH:mm:ss.SSSZ', timefrom)
        from.date = now.date
        from.month = now.month
        from.year = now.year
        
        context.api.devices.sendCommands(context.config.feeder1, 'contactSensor', eventsBetween)
    
        let feederOpened = feederEvents.count({
        it.value && it.value == 'open'
        }) > 0
        let textMsg = msg ? msg : 'Oops! Don\'t forget to feed the pets!'
        if (!feederOpened) {
        this.sendSms(phone1, textMsg)
        if (phone2) {
        this.sendSms(phone2, textMsg)
        }
        }
        

	})
