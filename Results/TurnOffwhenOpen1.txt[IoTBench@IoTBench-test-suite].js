
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door opens...', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Where?');

        });


        page.section('Turn off an outlet...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('How long to delay', section => {
            section.numberSetting('delayMinutes').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.closed', 'contactClosedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        console.log("${event.value}: $evt, $settings")
        if (event.value == 'open') {
        log.info('Door has been opened')
        state.lastStatus = 'open'
        state.contactOpenTime = this.now()
        state.switchPreviousState = []
        switches.eachWithIndex({ let obj, let i ->
        state.switchPreviousState.putAt(i, obj.currentState('switch').value)
        })
        if (delayMinutes) {
        this.runIn(delayMinutes * 60, turnOffAfterDelay, ['overwrite': false])
        } else {
        this.turnOffAfterDelay()
        }
        }
        

	})

    .subscribedEventHandler('contactClosedHandler', (context, event) => {
        
        console.log("${event.value}: $evt, $settings")
        if (event.value == 'closed') {
        log.info('Door has been closed')
        state.lastStatus = 'closed'
        state.contactOpenTime = null
        this.turnOnIfOff()
        }
        

	})
