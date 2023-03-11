
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s water detected...', section => {
            section.deviceSetting('alarm').capability(['waterSensor']).name('Where?');

        });


        page.section('Turn this valve off...', section => {
            section.deviceSetting('valve').capability(['valve']).name('Which Valve?');

        });


        page.section('Text me at...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.alarm, 'waterSensor', 'water.wet', 'waterWetHandler')

    })

    .subscribedEventHandler('waterWetHandler', (context, event) => {
        
        let deltaSeconds = 60
        let timeAgo = new Date(this.now() - 1000 * deltaSeconds )
        
        context.api.devices.sendCommands(context.config.alarm, 'waterSensor', eventsSince)
    
        console.log("Found ${(recentEvents?.size()) ? recentEvents?.size() : 0} events in the last $deltaSeconds seconds")
        let alreadySentSms = recentEvents.count({
        it.value && it.value == 'wet'
        }) > 1
        if (alreadySentSms) {
        console.log("SMS already sent to $phone within the last $deltaSeconds seconds")
        } else {
        if (valve) {
        valve?.close()
        console.log("${valve.name} is closing")
        }
        let msg = "${alarm.label} ${alarm.name} is wet! ${valve.label} ${valve.name} has been turned off."
        this.sendPush(msg)
        if (phone) {
        this.sendSms(phone, msg)
        console.log("$alarm is wet, texting $phone")
        }
        }
        

	})
