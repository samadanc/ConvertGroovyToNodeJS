
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select machines', section => {
            section.deviceSetting('washer').capability(['powerMeter']).name('Washer');
            section.deviceSetting('dryer').capability(['powerMeter']).name('Dryer');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');
            section.booleanSetting('repeat').name('Repeat notifications?');
            section.numberSetting('repeatInterval').name('Repeat interval (minutes)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.dryer, 'powerMeter', 'status', 'dryerHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.washer, 'powerMeter', 'status', 'washerHandler')

    })

    .subscribedEventHandler('dryerHandler', (context, event) => {
        
        console.log('checking dryer status')
        this.statusCheck(dryer, 'Dryer', 'dryerHandler')
        

	})

    .subscribedEventHandler('washerHandler', (context, event) => {
        
        console.log('checking washer status')
        this.statusCheck(washer, 'Washer', 'washerHandler')
        

	})
