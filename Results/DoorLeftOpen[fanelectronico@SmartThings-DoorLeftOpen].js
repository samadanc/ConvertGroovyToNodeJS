
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this door is left open...', section => {
            section.deviceSetting('contactSensor').capability(['contactSensor']).name('Door');

        });


        page.section('For this long...', section => {
            section.numberSetting('numSeconds').name('Seconds');

        });


        page.section('Send a message that says...', section => {
            section.textSetting('messageText').name('Message');

        });


        page.section('To...', section => {
            section.booleanSetting('pushAlert').name('Send push alert?');

        });


        page.section('Tell them this many times...', section => {
            section.numberSetting('repeatAlert').name('Number of alerts');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact', 'onContactChange')

    })

    .subscribedEventHandler('onContactChange', (context, event) => {
        
        console.log('onContactChange')
        if (event.value == 'open') {
        state.count = 0
        state.maxrepeat = repeatAlert
        this.runIn(numSeconds, onContactLeftOpenHandler)
        } else {
        this.unschedule(onContactLeftOpenHandler)
        state.count = 0
        }
        

	})
