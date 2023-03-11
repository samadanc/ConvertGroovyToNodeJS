
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select HelloHome Indacator Switches', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch.on', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("changedLocationMode: ${event.displayName}")
        switches.each({
        if (it.displayName == event.displayName) {
        log.trace("${it.displayName} - ON")
        } else {
        log.trace("${it.displayName} - OFF")
        it.off()
        }
        })
        

	})
