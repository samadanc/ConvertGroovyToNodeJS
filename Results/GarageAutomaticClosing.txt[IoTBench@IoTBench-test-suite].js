
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Garage Door Controls:', section => {
            section.deviceSetting('doorSensor').capability(['contactSensor']).name('Which Sensor?');
            section.deviceSetting('doorSwitch').capability(['momentary']).name('Which Door?');

        });


        page.section('Close at Sunset?', section => {
            section.booleanSetting('closeSunsetAsk').name('Garage door closing at sunset?');
            section.textSetting('sunsetOffsetValue').name('HH:MM');
            section.enumSetting('sunsetOffsetDir').name('Before or After');
            section.textSetting('zipCode').name('Zip Code');

        });


        page.section('Close at Sepecific Time?', section => {
            section.booleanSetting('closeTimeAsk').name('Garage door closing at specific time?');
            section.timeSetting('closeTimeSet').name('When?');

        });


        page.section('Close when Entering Specific Mode?', section => {
            section.booleanSetting('closeModeAsk').name('Garage door closing when entering specific mode');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('closeTime', delay);

    })

    .scheduledEventHandler('closeTime', (context, event) => {
        
        if (state.timeClose == 'OK') {
        console.log("Closing Garage Door at $closeTimeSet...")
        if (doorSensor.currentContact == 'open') {
        if (sendPushMessage == 'Yes') {
        this.sendPush("$doorSensor is closing at scheduled time $closeTimeSet...")
        }
        this.closeDoor()
        this.unschedule('closeTime')
        } else {
        console.log("$doorSensor was already closed.")
        }
        }
        

	})
