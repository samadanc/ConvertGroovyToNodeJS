
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Info'', section => {

        });


        page.section('Devices', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switch to turn on/off');

        });


        page.section('Preferences', section => {
            section.booleanSetting('onOff').name('Turn it ON or OFF');
            section.numberSetting('delayMinutes').name('Minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (event.value == 'off') {
        log.info('Turning off.')
        } else {
        if (event.value == 'on') {
        log.info('Turning on.')
        }
        }
        

	})
