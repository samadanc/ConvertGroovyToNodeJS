
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('At Candlelighting Change Mode To:', section => {

        });


        page.section('At Havdalah Change Mode To:', section => {

        });


        page.section('Your ZipCode', section => {
            section.textSetting('zipcode').name('ZipCode');

        });


        page.section('Havdalah Offset: Time to add to sundown time in order to calculate Havdalah time (Default: 50)', section => {
            section.numberSetting('havdalahOffset').name('Havdalah Offset');

        });


        page.section('Optional Shabbat Switch: The switch will turn ON when shabbat or holiday time is properly set. Good for knowing if app _did or did not_ schedule Shabbat mode.', section => {
            section.deviceSetting('shabbatSwitch').capability(['switch']).name('Select a virtual switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.shabbatSwitch, 'switch', 'switch', 'handler')

        context.api.schedules.schedule('poll', delay);

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        log.info("${event.device} ${event.value}")
        

	})

    .scheduledEventHandler('poll', (context, event) => {
        
        this.unschedule('endChag')
        this.unschedule('setChag')
        if (shabbatSwitch) {
        
        context.api.devices.sendCommands(context.config.shabbatSwitch, 'switch', off)
    
        }
        this.Hebcal_WebRequest()
        

	})
