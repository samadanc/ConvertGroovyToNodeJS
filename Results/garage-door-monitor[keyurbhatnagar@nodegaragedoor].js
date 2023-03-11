
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the garage door is open...', section => {
            section.deviceSetting('multisensor').capability(['contactSensor']).name('Which?');

        });


        page.section('For too long...', section => {
            section.numberSetting('maxOpenTime').name('Minutes?');

        });


        page.section('', section => {
            section.deviceSetting('sonos').capability(['speechSynthesis']).name('On this Speaker player');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.multisensor, 'contactSensor', 'contact', 'accelerationHandler')

    })

    .subscribedEventHandler('accelerationHandler', (context, event) => {
        
        log.warn("Door open event = ${event.value}")
        if (event.value == 'open') {
        this.runIn(maxOpenTime * 60, sendTextMessage, ['overwrite': false])
        state.status = 'scheduled'
        log.warn('Door open event')
        } else {
        this.unschedule()
        log.warn('Door open event')
        }
        

	})
