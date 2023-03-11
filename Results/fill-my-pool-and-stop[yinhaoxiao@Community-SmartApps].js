
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pool Setup', section => {
            section.deviceSetting('valve').capability(['valve']).name('Which valve?');
            section.numberSetting('minutes').name('How many minutes do you want to fill the pool before automatic shutoff? Use whole numbers. 1 hour=60, 4 hours=240');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.valve, 'valve', 'valve.closed', 'closedValveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.valve, 'valve', 'valve.open', 'openValveHandler')

    })

    .subscribedEventHandler('closedValveHandler', (context, event) => {
        
        console.log("Valve closed. unscheduling all scheduled closures of $valve")
        this.unschedule()
        

	})

    .subscribedEventHandler('openValveHandler', (context, event) => {
        
        console.log("$valve detected opened")
        this.runIn(60 * ((int) minutes), closeValve)
        console.log("$valve scheduled to close in $minutes minutes")
        

	})
