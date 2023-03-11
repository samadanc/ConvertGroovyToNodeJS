
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('What Lock', section => {
            section.deviceSetting('lock1').capability(['lock']).name('Lock');

        });


        page.section('User', section => {
            section.enumSetting('delete1').name('Delete User');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'usercode', 'usercodeget')

    })

    .subscribedEventHandler('usercodeget', (context, event) => {
        
        console.log("Current Code for user $user1: ${lock1.currentUsercode}")
        

	})
