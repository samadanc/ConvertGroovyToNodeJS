
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('What Lock', section => {
            section.deviceSetting('lock').capability(['lock']).name('Lock');

        });


        page.section('User', section => {
            section.textSetting('username').name('Name for User');
            section.numberSetting('user').name('User Slot (From 1 to 30) ');
            section.textSetting('code').name('Code (4 to 8 digits) or X to Delete');

        });


        page.section('Notifications', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock, 'lock', 'lock', 'codeUsed')

        await context.api.subscriptions.subscribeToDevices(context.config.lock, 'lock', 'codeReport', 'codeReturn')

    })

    .subscribedEventHandler('codeReturn', (context, event) => {
        
        let codenumber = event.data.replaceAll('\D+', '')
        console.log("codeReturn event contents: data: ${event.data}, value: ${event.value}, source: ${event.source}")
        if (event.value == user ) {
        if (codenumber == '') {
        let message = "User $username in user slot ${event.value} code is not set or was deleted on $lock"
        this.send(message)
        } else {
        let message = "Code for user $username in user slot ${event.value} was set to $codenumber on $lock"
        this.send(message)
        }
        }
        

	})

    .subscribedEventHandler('codeUsed', (context, event) => {
        
        console.log("codeUsed event contents: data: ${event.data}, value: ${event.value}, source: ${event.source}")
        if (event.value == 'unlocked' && event.data) {
        let codeData = new JsonSlurper().parseText(event.data)
        let message = "$lock was unlocked by $username in user slot ${codeData.usedCode}"
        if (codeData.usedCode == user && sendCode == 'Yes') {
        this.send(message)
        }
        }
        

	})
