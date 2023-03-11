
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section('', section => {

        });


        page.section('Select Enable/Disable Switch (Optional)', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Select \'Rain Sensor\', section => {
            section.deviceSetting('water1').capability(['waterSensor']).name('Select Rain Sensor');

        });


        page.section('Speaker Settings', section => {
            section.deviceSetting('speaker1').capability(['musicPlayer']).name('Choose a speaker');
            section.numberSetting('volume1').name('Speaker volume');
            section.numberSetting('delay1').name('Delay before speaking (Seconds - enter 0 for no delay)');
            section.textSetting('message1').name('Message to speak before list of open devices');
            section.numberSetting('msgDelay').name('Number of minutes between messages');

        });


        page.section('Allow messages between what times?', section => {
            section.timeSetting('fromTime').name('From');
            section.timeSetting('toTime').name('To');

        });


        page.section('Set different volume on messages between these times?', section => {
            section.numberSetting('volume2').name('Quiet Time Speaker volume');
            section.timeSetting('fromTime2').name('Quiet Time Start');
            section.timeSetting('toTime2').name('Quiet Time End');

        });


        page.section('\'Contact Sensors\' to check...', section => {
            section.deviceSetting('sensors').capability(['contactSensor']).name('');

        });


        page.section('Logging', section => {
            section.booleanSetting('debugMode').name('Enable logging');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.water1, 'waterSensor', 'water.wet', 'wetHandler1')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        state.currS1 = event.value
        this.LOGDEBUG("$switch1 = ${event.value}")
        

	})

    .subscribedEventHandler('wetHandler1', (context, event) => {
        
        this.LOGDEBUG(" It's raining! - Waiting $delay1 seconds before checking to see if I can play message")
        let myDelay1 = delay1
        if (state.currS1 != 'nul' && state.currS1 == 'on') {
        let between = this.timeOfDayIsBetween(fromTime, toTime, new Date(), location.timeZone)
        if (between) {
        this.runIn(myDelay1, talkNow1)
        } else {
        this.LOGDEBUG(' It\'s raining but it\'s not within the correct time window to say anything')
        }
        } else {
        if (state.currS1 != 'nul' && state.currS1 == 'off') {
        this.LOGDEBUG(" It's raining but '$switch1' is set to 'Off' so I'm doing as I'm told and keeping quiet!")
        }
        }
        

	})
