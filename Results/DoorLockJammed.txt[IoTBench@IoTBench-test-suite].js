
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Check for jamms in lock...', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


        page.section('Via an SMS message', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock', 'doorHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        if (event.value != 'locked') {
        if (event.value != 'unlocked') {
        console.log("Lock ${event.displayName} is ${event.value}.")
        this.sendPush('Door lock is jammed, please check.')
        if (phone) {
        this.sendSms(phone, textMessage ? textMessage : 'Door lock is jammed, please check')
        }
        }
        }
        

	})
