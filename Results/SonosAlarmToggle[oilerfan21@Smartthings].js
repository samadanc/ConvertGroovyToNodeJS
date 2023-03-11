
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this button is pressed...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Which button?');

        });


        page.section('Play message on this player', section => {
            section.deviceSetting('sonos').capability(['musicPlayer']).name('where to say state');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'lanResponseHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log('got a switch event')
        state.firstpass = '1'
        this.BuildgetAction()
        

	})

    .subscribedEventHandler('lanResponseHandler', (context, event) => {
        
        let hdr = this.parseLanMessage(event.description)
        log.trace("lan Response entry first pass status? - ${state.firstpass}")
        log.trace("header - ${hdr.header}")
        if (hdr.header) {
        log.trace('Looks like a valid HTTP response - reading Alarm response')
        let env = new XmlSlurper().parseText(hdr.body)
        if (env.Body.ListAlarmsResponse.size() > 0) {
        log.trace("looks like a valid Alarms list response - First time through? - ${state.firstpass}")
        if (state.firstpass == '1') {
        log.trace('changing state of firstpass')
        state.firstpass = '0'
        log.trace("getting the alarms and first pass is now ${state.firstpass}")
        let alarms = new XmlSlurper().parseText(env.Body.ListAlarmsResponse.CurrentAlarmList.text())
        alarms.children().each({
        this.processAlarm(it)
        })
        log.trace('finished running through each alarm')
        } else {
        log.trace('stepping through')
        }
        }
        }
        

	})
