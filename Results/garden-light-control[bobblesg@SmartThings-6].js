
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section('', section => {

        });


        page.section('', section => {
            section.booleanSetting('enableApp').name('Enable App');

        });


        page.section('', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Control these switches');
            section.numberSetting('offset').name('Turn on this many minutes before sunset');
            section.timeSetting('offTime').name('Turn Off - At what time?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('offNow', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunsetTimeHandler')

    })

    .subscribedEventHandler('sunsetTimeHandler', (context, event) => {
        
        if (state.appGo == true) {
        this.scheduleTurnOn(event.value)
        } else {
        if (state.appGo == false) {
        log.info('App is diaabled so doing nothing')
        }
        }
        

	})

    .scheduledEventHandler('offNow', (context, event) => {
        
        console.log('Turning off lights')
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        

	})
