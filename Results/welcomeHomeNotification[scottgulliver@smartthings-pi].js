
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this person...', section => {
            section.deviceSetting('person').capability(['presenceSensor']).name('');

        });


        page.section('Enters this door...', section => {
            section.deviceSetting('contactSensor').capability(['contactSensor']).name('');

        });


        page.section('Play this notification...', section => {
            section.textSetting('soundName').name('');

        });


        page.section('On this speaker...', section => {
            section.deviceSetting('speaker').capability(['audioNotification']).name('');

        });


        page.section('Other settings', section => {
            section.numberSetting('entryTimeout').name('Time allowed between presence and entry (minutes)');
            section.numberSetting('audioTimeDelay').name('Audio time delay (seconds)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.person, 'presenceSensor', 'presence', 'presence')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact.open', 'contactOpen')

    })

    .subscribedEventHandler('contactOpen', (context, event) => {
        
        if (atomicState.waitingForEntry) {
        atomicState.waitingForEntry = false
        if (audioTimeDelay) {
        this.runIn(audioTimeDelay, playNotification)
        } else {
        this.playNotification()
        }
        }
        

	})

    .subscribedEventHandler('presence', (context, event) => {
        
        if (event.value == 'present') {
        atomicState.waitingForEntry = true
        this.runIn(60 * entryTimeout , entryTimeoutHandler)
        } else {
        atomicState.waitingForEntry = false
        }
        

	})
