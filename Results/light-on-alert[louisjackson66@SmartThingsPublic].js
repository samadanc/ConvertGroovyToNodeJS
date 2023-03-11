
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Things to Monitor:', section => {
            section.deviceSetting('switches').capability(['switch']).name('Select Lights...');

        });


        page.section('Via push notification and/or a SMS message', section => {

        });


        page.section(''Version 1.0.1'', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        log.info("(0D)  ${app.label} - onHandler - state.bSendMsg = ${state.bSendMsg}")
        switches.each({
        log.trace("(0E) ${app.label} - Checking ${it.label} - Before state:${it.latestState(switch).value}")
        if (state.bSendMsg && it.latestState('switch').value in ['on', 'setLevel']) {
        log.trace("(0F)  ${app.label} - onHandler - light attribute changed to ${it.latestState(switch).value}")
        this.send("${app.label} detected ${it.label} is on")
        }
        })
        state.bSendMsg = !state.bSendMsg
        log.trace("(10) ${app.label} - onHandler - state.bSendMsg = ${state.bSendMsg}")
        

	})
