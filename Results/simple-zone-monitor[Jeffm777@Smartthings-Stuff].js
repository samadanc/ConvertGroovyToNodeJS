
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'Simple Zone Monitor.Entry/Exit Beep', 'entryExitBeepHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'CoRE', 'coreHandler')

        context.api.schedules.schedule('scheduledTaskBackupHandler', delay);

    })

    .subscribedEventHandler('entryExitBeepHandler', (context, event) => {
        
                let beepFrequency = this.getCurrentEntryExitBeepFrequency()
                if (state.beepStatus && beepFrequency ) {
                    this.runIn(beepFrequency, playEntryExitBeep)
                }
            

	})

    .subscribedEventHandler('coreHandler', (context, event) => {
        
                this.logTrace('Updating CoRE Piston List')
                state.pistons = event.jsonData?.pistons
            

	})

    .scheduledEventHandler('scheduledTaskBackupHandler', (context, event) => {
        
                if (state.pendingOff) {
                    this.logTrace('Scheduled Task Backup: Executing turnOffDevice()')
                    this.turnOffDevice()
                }
                if (state.entryEventTime && this.timeElapsed(state.entryEventTime, this.getCurrentEntryExitDelay() + 10)) {
                    this.logTrace('Scheduled Task Backup: Executing delayedSecurityEventHandler()')
                    this.delayedSecurityEventHandler()
                }
            

	})
