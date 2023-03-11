
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this device is away...', section => {
            section.deviceSetting('myMobileDevice').capability(['presenceSensor']).name('');

        });


        page.section('Turn something on if it\'s dark...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Sunset offset (optional)...', section => {
            section.textSetting('sunsetOffsetValue').name('HH:MM');
            section.enumSetting('sunsetOffsetDir').name('Before or After');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.myMobileDevice, 'presenceSensor', 'presence', 'presenceHandler')

        context.api.schedules.runOnce('presenceHandler', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        let switchIsOn = event.value == 'on'
        if (!switchIsOn) {
        this.manageSwitch()
        }
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        this.manageSwitch()
        

	})

    .scheduledEventHandler('presenceHandler', (context, event) => {
        
        this.manageSwitch()
        

	})
