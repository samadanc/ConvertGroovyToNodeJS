
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('What Locks', section => {
            section.deviceSetting('locks').capability(['lockCodes']).name('Locks');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('User 1', section => {
            section.textSetting('username1').name('Name for User');
            section.textSetting('code1').name('Code (4 to 8 digits) or X to Delete');
            section.enumSetting('sendCode1').name('Send notification when users code is used');

        });


        page.section('User 2', section => {
            section.textSetting('username2').name('Name for User');
            section.textSetting('code2').name('Code (4 to 8 digits) or X to Delete');
            section.enumSetting('sendCode2').name('Send notification when users code is used');

        });


        page.section('User 3', section => {
            section.textSetting('username3').name('Name for User');
            section.textSetting('code3').name('Code (4 to 8 digits) or X to Delete');
            section.enumSetting('sendCode3').name('Send notification when users code is used');

        });


        page.section('User 4', section => {
            section.textSetting('username4').name('Name for User');
            section.textSetting('code4').name('Code (4 to 8 digits) or X to Delete');
            section.enumSetting('sendCode4').name('Send notification when users code is used');

        });


        page.section('User 5', section => {
            section.textSetting('username5').name('Name for User');
            section.textSetting('code5').name('Code (4 to 8 digits) or X to Delete');
            section.enumSetting('sendCode5').name('Send notification when users code is used');

        });


        page.section('User 6', section => {
            section.textSetting('username6').name('Name for User');
            section.textSetting('code6').name('Code (4 to 8 digits) or X to Delete');
            section.enumSetting('sendCode6').name('Send notification when users code is used');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lockCodes', 'codeReport', 'codereturn')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lockCodes', 'lock', 'codeUsed')

    })

    .subscribedEventHandler('codeUsed', (context, event) => {
        
        if (event.value == 'unlocked' && event.data) {
        let username
        let sendCode
        let codeData = new JsonSlurper().parseText(event.data)
        settings.each({
        if (it.key == "username${codeData.usedCode}") {
        username = "${it.value}"
        }
        if (it.key == "sendCode${codeData.usedCode}") {
        sendCode = "${it.value}"
        }
        })
        let message = "${event.displayName} was unlocked by $username in user slot ${codeData.usedCode}"
        if (sendCode == 'Yes') {
        this.send(message)
        }
        }
        

	})

    .subscribedEventHandler('codereturn', (context, event) => {
        
        console.log('codereturn')
        let username = "${event.value}"
        let code = event.data.replaceAll('\D+', '')
        settings.each({
        if (it.key == "username${event.value}") {
        username = "${it.value}"
        }
        })
        if (code == '') {
        let message = "User in slot ${event.value} was deleted from ${event.displayName}"
        this.send(message)
        } else {
        let message = "Code for user $username in user slot ${event.value} was set to $code on ${event.displayName}"
        this.send(message)
        }
        

	})
