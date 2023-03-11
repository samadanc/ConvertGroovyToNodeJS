
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Set the ecobee thermostat(s)', section => {
            section.deviceSetting('ecobee').capability(['thermostat']).name('My ecobee thermostat(s)?');

        });


        page.section('Configuration', section => {
            section.enumSetting('dayOfWeek').name('Which day of the week?');
            section.timeSetting('begintime').name('Beginning time');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Enable Amazon Echo/Ask Alexa Notifications (optional)', section => {
            section.booleanSetting('askAlexaFlag').name('Ask Alexa verbal Notifications [default=false]?');
            section.enumSetting('listOfMQs').name('List of the Ask Alexa Message Queues (default=Primary)');
            section.numberSetting('AskAlexaExpiresInDays').name('Ask Alexa\');

        });


        page.section('Set for specific ST location mode(s) [default=all]', section => {
            section.enumSetting('selectedModes').name('Choose ST Mode(s) to run the smartapp');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('setBacklight', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'askAlexaMQ', 'askAlexaMQHandler')

    })

    .subscribedEventHandler('askAlexaMQHandler', (context, event) => {
        
        if (!evt) {
        return null
        }
        switch (event.value) {
        case 'refresh':
        state?.askAlexaMQ = event.jsonData && event.jsonData?.queues ? event.jsonData.queues : []
        console.log("askAlexaMQHandler>new refresh value=${event.jsonData}?.queues")
        break
        }
        

	})

    .scheduledEventHandler('setBacklight', (context, event) => {
        
        let doChange = this.IsRightDayForChange()
        if (doChange == true) {
        java.lang.Boolean foundMode = selectedModes.find({
        it == (location.currentMode as String)
        })
        if (selectedModes != null && !foundMode) {
        console.log("not the right mode to run the smartapp, location.mode= ${location.mode}, selectedModes=$selectedModes,foundMode=$foundMode, exiting")
        return null
        }
        ecobee.each({
        if (backlightOffTime != null && backlightOffTime > 0) {
        console.log("About to change backlightOffTime, new value=$backlightOffTime")
        it.setBacklightOffTime(backlightOffTime)
        this.send("set $it with backlightOffTime=$backlightOffTime seconds as requested", settings.askAlexaFlag)
        }
        if (backlightSleepIntensity != null) {
        console.log("About to change backlightSleepIntensity, new value=$backlightSleepIntensity")
        it.setBacklightSleepIntensity(backlightSleepIntensity)
        this.send("set $it with backlightSleepIntensity=$backlightSleepIntensity as requested", settings.askAlexaFlag)
        }
        if (backlightOnIntensity != null) {
        console.log("About to change backlightOnIntensity, new value=$backlightOnIntensity")
        it.setBacklightOnIntensity(backlightOnIntensity)
        this.send("set $it with backlightOnIntensity=$backlightOnIntensity as requested", settings.askAlexaFlag)
        }
        })
        } else {
        console.log("setBacklight>not the right time to set $ecobee's backlight settings")
        }
        console.log('End of Fcn')
        

	})
