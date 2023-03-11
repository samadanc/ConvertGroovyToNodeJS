
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which contact sensor will detect your cat?', section => {
            section.deviceSetting('catContact').capability(['accelerationSensor']).name('Contact');

        });


        page.section('How many days should be used to calculate the average?', section => {
            section.numberSetting('daysAverage').name('Days');

        });


        page.section('How far below the average should you be alerted?', section => {
            section.numberSetting('underAverage').name('Defecit');

        });


        page.section('Where wold you like to be notified?', section => {
            section.booleanSetting('push').name('Send an push notification?');

        });


        page.section('Send a message with a daily usage count?', section => {
            section.booleanSetting('sendDailyUsage').name('');

        });


        page.section('When should we check if usage is under average and send daily usage count?', section => {
            section.timeSetting('dailyCheck').name('Select a time');

        });


        page.section('What is your cats name?', section => {
            section.textSetting('catName').name('name');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.catContact, 'accelerationSensor', 'acceleration.active', 'contactEvent')

        context.api.schedules.schedule('checkDailyCount', delay);

    })

    .subscribedEventHandler('contactEvent', (context, event) => {
        
        if (this.now() - state.lastTime > 300000 || state.lastTime == 0) {
        this.usageCounter()
        state.lastTime = this.now()
        console.log('Cat is using the litter box')
        }
        

	})

    .scheduledEventHandler('checkDailyCount', (context, event) => {
        
        if (this.now() - state.lastTimeDaily > 60000 || state.lastTimeDaily == 0) {
        let dailyCount = 0
        console.log('checkDailyCount()')
        state.averageList.each({ let it ->
        if (this.now() - it <= 86400000) {
        dailyCount = dailyCount + 1
        }
        })
        let deficit = state.average - dailyCount
        if (deficit >= underAverage ) {
        state.lastTimeDaily = this.now()
        let alertMessage = "$catName has only used the litter box $dailyCount times today. That is $deficit times below average"
        if (recipients) {
        this.sendNotificationToContacts(alertMessage, recipients)
        } else {
        if (!recipients) {
        if (push) {
        this.sendPush(alertMessage)
        }
        if (phone) {
        this.sendSms(phone, alertMessage)
        }
        }
        }
        }
        if (sendDailyUsage) {
        state.lastTimeDaily = this.now()
        let dailyMessage = "$catName has used the litter box $dailyCount times today."
        if (recipients) {
        this.sendNotificationToContacts(dailyMessage, recipients)
        } else {
        if (!recipients) {
        if (push) {
        this.sendPush(dailyMessage)
        }
        if (phone) {
        this.sendSms(phone, dailyMessage)
        }
        }
        }
        }
        }
        

	})
