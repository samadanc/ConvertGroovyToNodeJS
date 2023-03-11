
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('At this time every day', section => {
            section.timeSetting('time').name('Time of Day');

        });


        page.section('Change to this mode', section => {

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('changeMode', delay);

    })

    .scheduledEventHandler('changeMode', (context, event) => {
        
        console.log("changeMode, location.mode = ${location.mode}, newMode = $newMode, location.modes = ${location.modes}")
        if (location.mode != newMode ) {
        if (location.modes?.find({
        it.name == newMode
        })) {
        this.setLocationMode(newMode)
        this.send("$label has changed the mode to '$newMode'")
        } else {
        this.send("$label tried to change to undefined mode '$newMode'")
        }
        }
        

	})
