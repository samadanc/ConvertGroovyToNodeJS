
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose Your Steps Sensor', section => {
            section.deviceSetting('theSteps').capability(['stepSensor']).name('');

        });


        page.section('Minimum Steps', section => {
            section.numberSetting('theMinimumSteps').name('');

        });


        page.section('Scheduled Time', section => {
            section.timeSetting('theTime').name('');

        });


        page.section('Notifications', section => {
            section.booleanSetting('sendPush').name('Push Notification');
            section.deviceSetting('ttsDevice').capability(['speechSynthesis']).name('Text To Speech');
            section.textSetting('notificationMessage').name('Message Template');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('handler', delay);

    })

    .scheduledEventHandler('handler', (context, event) => {
        
        if
        
        context.api.devices.sendCommands(context.config.theSteps, 'stepSensor', refresh)
    
        }
        if (theSteps.currentSteps < theMinimumSteps ) {
        let msg = notificationMessage
        msg = msg.replace('%STEPS%', theSteps.currentSteps.toString())
        msg = msg.replace('%GOAL%', theSteps.currentGoal.toString())
        if (sendPush) {
        this.sendPush(msg)
        }
        if (location.contactBookEnabled && recipients ) {
        this.sendNotificationToContacts(msg, recipients)
        } else {
        if (phone) {
        this.sendSms(phone, msg)
        }
        }
        if (ttsDevice) {
        
        context.api.devices.sendCommands(context.config.ttsDevice, 'speechSynthesis', speak)
    
        }
        }
        

	})
