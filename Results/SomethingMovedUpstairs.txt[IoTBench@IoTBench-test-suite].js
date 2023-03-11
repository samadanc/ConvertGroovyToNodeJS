
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When movement is detected upstairs...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Where?');

        });


        page.section('Text me at...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion.active', 'motionActiveHandler')

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        let deltaSeconds = 60
        let timeAgo = new Date(this.now() - 1000 * deltaSeconds )
        
        context.api.devices.sendCommands(context.config.motionSensor, 'motionSensor', eventsSince)
    
        log.trace("Found ${(recentEvents?.size()) ? recentEvents?.size() : 0} events in the last $deltaSeconds seconds")
        let alreadySentSms = recentEvents.count({
        it.value && it.value == 'active'
        }) > 1
        if (alreadySentSms) {
        console.log("SMS already sent to $phone1 within the last $deltaSeconds seconds")
        } else {
        console.log("$motionSensor has moved, texting $phone1")
        this.sendSms(phone1, "Dude! ${(motionSensor.label) ? motionSensor.label : motionSensor.name} detected that someting moved at Kokopelli!")
        }
        

	})
