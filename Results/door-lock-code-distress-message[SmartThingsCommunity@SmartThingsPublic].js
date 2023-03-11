
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose Locks', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


        page.section('Enter User Code Number (This is not the code used to unlock the door)', section => {
            section.numberSetting('distressCode').name('');

        });


        page.section('Distress Message Details', section => {
            section.textSetting('distressMsg').name('Message to send');

        });


        page.section('User Code Discovery Mode (Enable and unlock the door using desired code. A message will be sent containing the user code used to unlock the door.)', section => {
            section.booleanSetting('discoveryMode').name('Enable');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock', 'checkCode')

    })

    .subscribedEventHandler('checkCode', (context, event) => {
        
        console.log("${event.value}: $evt, $settings")
        if (event.value == 'unlocked' && event.data) {
        let lockData = new JsonSlurper().parseText(event.data)
        if (discoveryMode) {
        this.sendPush("Door unlocked with user code ${lockData.usedCode}")
        }
        if (lockData.usedCode == distressCode && discoveryMode == false) {
        log.info('Distress Message Sent')
        this.sendSms(phone1, distressMsg)
        }
        }
        

	})
