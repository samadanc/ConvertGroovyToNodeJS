
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When movement is detected...', section => {
            section.deviceSetting('accelerationSensor').capability(['accelerationSensor']).name('Where?');

        });


        page.section('Text me at...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.accelerationSensor, 'accelerationSensor', 'acceleration.active', 'accelerationActiveHandler')

    })

    .subscribedEventHandler('accelerationActiveHandler', (context, event) => {
        
        let deltaSeconds = 5
        let timeAgo = new Date(this.now() - 1000 * deltaSeconds )
        
        context.api.devices.sendCommands(context.config.accelerationSensor, 'accelerationSensor', eventsSince)
    
        let alreadySentSms = recentEvents.count({
        it.value && it.value == 'active'
        }) > 1
        if (alreadySentSms) {
        console.log("SMS already sent within the last $deltaSeconds seconds")
        } else {
        if (location.contactBookEnabled) {
        console.log("accelerationSensor has moved, texting contacts: ${recipients?.size()}")
        this.sendNotificationToContacts("${(accelerationSensor.label) ? accelerationSensor.label : accelerationSensor.name} moved", recipients)
        } else {
        console.log('accelerationSensor has moved, sending text message')
        this.sendSms(phone1, "${(accelerationSensor.label) ? accelerationSensor.label : accelerationSensor.name} moved")
        }
        }
        

	})
