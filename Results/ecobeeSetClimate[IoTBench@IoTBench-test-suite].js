
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Set the ecobee thermostat(s)', section => {

        });


        page.section('Configuration', section => {
            section.enumSetting('dayOfWeek').name('Which day of the week?');
            section.timeSetting('begintime').name('Beginning time');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.ecobee, 'device.myEcobeeDevice', 'climateList', 'climateListHandler')

        context.api.schedules.schedule('setClimate', delay);

    })

    .subscribedEventHandler('climateListHandler', (context, event) => {
        
        console.log("thermostat's Climates List: ${event.value}, $settings")
        

	})

    .scheduledEventHandler('setClimate', (context, event) => {
        
        let climateName = givenClimate ? givenClimate : 'Home'.capitalize()
        let doChange = this.IsRightDayForChange()
        if (doChange == true) {
        console.log("setClimate, location.mode = ${location.mode}, newMode = $newMode, location.modes = ${location.modes}")
        ecobee.each({
        it.setThisTstatClimate(climateName)
        })
        this.send("ecobeeSetClimate>set $ecobee to $climateName program as requested")
        } else {
        console.log("climate change to $climateName not scheduled for today.")
        }
        console.log('End of Fcn')
        

	})
