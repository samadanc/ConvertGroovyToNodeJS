
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('openHandler', (context, event) => {
        
        log.trace("openHandler(${event.name}: ${event.value})")
        if (allOk) {
        this.setColor()
        this.unschedule()
        }
        

	})

    .subscribedEventHandler('closedHandler', (context, event) => {
        
        log.trace("closedHandler(${event.name}: ${event.value})")
        if (allOk) {
        this.runIn(contactClosesTime * 60, scheduledColorReset)
        }
        

	})
