
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Set the ecobee thermostat(s)', section => {
            section.deviceSetting('ecobee').capability(['thermostat']).name('MyEcobee thermostat(s)?');

        });


        page.section('Configuration', section => {
            section.enumSetting('dayOfWeek').name('Which day of the week?');
            section.timeSetting('begintime').name('Beginning time');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Set for specific ST location mode(s) [default=all]', section => {
            section.enumSetting('selectedModes').name('Choose ST Mode(s) to run the smartapp');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('setClimate', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.ecobee, 'thermostat', 'climateList', 'climateListHandler')

    })

    .subscribedEventHandler('climateListHandler', (context, event) => {
        
        console.log("thermostat's Climates List: ${event.value}, $settings")
        

	})

    .scheduledEventHandler('setClimate', (context, event) => {
        
        let climateName = givenClimate ? givenClimate : 'Home'.capitalize()
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
        it.setThisTstatClimate(climateName)
        })
        this.send("ecobeeSetClimate>set $ecobee to $climateName program as requested")
        } else {
        console.log("climate change to $climateName not scheduled for today.")
        }
        console.log('End of Fcn')
        

	})
