
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Things to Monitor:', section => {
            section.deviceSetting('switches').capability(['switch']).name('Select Lights/Switches...');

        });


        page.section(''Version 1.0.2'', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        let nOnCnt = 0
        let nTotalCnt = 0
        let strMessage = ''
        log.trace("(0D)  ${app.label} - onHandler checking switches")
        switches.each({
        nTotalCnt++
        if (it.latestState('switch').value in ['on', 'setLevel']) {
        nOnCnt++
        strMessage += "
        - ${it.label}"
        }
        })
        if (nOnCnt || nTotalCnt ) {
        strMessage = "${app.label} has detected the following $nOnCnt out of $nTotalCnt switch(s)\light(s) on:$strMessage"
        log.warn("(0F) ${app.label} - $strMessage")
        this.sendNotificationEvent(strMessage)
        }
        log.trace("(10) ${app.label} - onHandler completed check.")
        

	})
