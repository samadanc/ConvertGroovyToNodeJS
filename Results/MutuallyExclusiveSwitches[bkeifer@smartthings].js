
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Group 1:', section => {
            section.deviceSetting('group1').capability(['switch']).name('');

        });


        page.section('Group 2:', section => {
            section.deviceSetting('group2').capability(['switch']).name('');

        });


        page.section('Send Notifications?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.group1, 'switch', 'switch', 'group1Handler')

        await context.api.subscriptions.subscribeToDevices(context.config.group2, 'switch', 'switch', 'group2Handler')

    })

    .subscribedEventHandler('group1Handler', (context, event) => {
        
        if (event.value == 'on') {
        console.log('Switch in group 1 is on.  Turning off group 2.')
        group2*.off()
        }
        

	})

    .subscribedEventHandler('group2Handler', (context, event) => {
        
        if (event.value == 'on') {
        console.log('Switch in group 2 is on.  Turning off group 1.')
        group1*.off()
        }
        

	})
