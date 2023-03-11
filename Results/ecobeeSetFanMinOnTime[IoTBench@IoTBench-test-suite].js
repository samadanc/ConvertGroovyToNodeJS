
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Change the following ecobee thermostat(s)...', section => {

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'device.myEcobeeDevice', 'climateName', 'changeFanMinOnTime')

    })

    .subscribedEventHandler('changeFanMinOnTime', (context, event) => {
        
        if (event.value != givenClimate && event.value != 'touch') {
        console.log("changeFanMinOnTime>not right climate (${event.value}), doing nothing...")
        return null
        }
        Integer min_fan_time = givenFanMinTime != null ? givenFanMinTime : 10
        let message = "ecobeeSetFanMinOnTime>changing fanMinOnTime to $min_fan_time at $thermostats.."
        this.send(message)
        thermostats.each({
        it?.setThermostatSettings('', ['fanMinOnTime': "$min_fan_time"])
        })
        

	})
