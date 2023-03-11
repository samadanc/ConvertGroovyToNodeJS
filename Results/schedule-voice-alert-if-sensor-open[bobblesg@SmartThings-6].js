
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('''', section => {

        });


        page.section('', section => {
            section.timeSetting('checkTime1').name('1st Check - At what time?');

        });


        page.section('', section => {
            section.timeSetting('checkTime2').name('2nd Check - At what time?');

        });


        page.section('', section => {
            section.enumSetting('days').name('Select Days of the Week');

        });


        page.section('Message Settings', section => {
            section.deviceSetting('speaker1').capability(['musicPlayer']).name('Choose a speaker');
            section.numberSetting('volume1').name('Speaker volume');
            section.textSetting('message1').name('Message to speak');

        });


        page.section('Check if this contacts is \'Open\', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Door/Windows Contact');

        });


        page.section('Logging', section => {
            section.booleanSetting('debugmode').name('Enable logging');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact', 'contactHandler')

        context.api.schedules.schedule('checkNow', delay);

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        state.currS1 = event.value
        this.LOGINFO("$contact1 = ${event.value}")
        

	})

    .scheduledEventHandler('checkNow', (context, event) => {
        
        this.LOGINFO("Checking now... $contact1 is ${state.currS1}")
        let df = new java.text.SimpleDateFormat('EEEE')
        df.setTimeZone(location.timeZone)
        let day = df.format(new Date())
        
        context.api.devices.sendCommands(context.config.days, 'enum', contains)
    
        if (dayCheck) {
        this.LOGINFO('Scheduled for operation today')
        if (state.currS1 != 'closed') {
        this.speakNow()
        }
        if (state.currS1 == 'closed') {
        this.LOGINFO(" $contact1 is  ${state.currS1}")
        }
        } else {
        this.LOGINFO('Not scheduled for today!')
        }
        

	})
