
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this device stops sensing vibration', section => {
            section.deviceSetting('acceleration').capability(['accelerationSensor']).name('');
            section.numberSetting('cycle_end_wait').name('... for at least this long (min)');

        });


        page.section('Send this message', section => {
            section.textSetting('message').name('Notification message');

        });


        page.section('Notification method', section => {
            section.booleanSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('['hidden': this.hideOptionsSection(), 'hideable': true], 'Additionally', section => {
            section.deviceSetting('switches').capability(['switch']).name('Turn on this switch');
            section.deviceSetting('hues').capability(['colorControl']).name('Turn these hue bulbs');
            section.enumSetting('color').name('This color');
            section.enumSetting('lightLevel').name('This light Level');
            section.deviceSetting('speech').capability(['speechSynthesis']).name('Speak message via: ');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.acceleration, 'accelerationSensor', 'acceleration', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        let delay = cycle_end_wait * 60
        if
        this.cycleOn(evt)
        } else {
        if
        this.runIn(delay, 'cycleOff')
        }
        }
        

	})
