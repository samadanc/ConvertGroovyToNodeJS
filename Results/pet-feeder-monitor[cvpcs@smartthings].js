
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor Settings', section => {
            section.deviceSetting('sensor').capability(['accelerationSensor']).name('Acceleration Sensor');
            section.deviceSetting('switches').capability(['switch']).name('Indicator Switches');
            section.timeSetting('resetBreakfast').name('Breakfast reset');
            section.timeSetting('resetLunch').name('Lunch reset');
            section.timeSetting('resetDinner').name('Dinner reset');
            section.numberSetting('ignoreDelay').name('Ignore delay');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('resetHandlerDinner', delay);

        context.api.schedules.schedule('resetHandlerLunch', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'accelerationSensor', 'acceleration.active', 'accelerationActiveHandler')

        context.api.schedules.schedule('resetHandlerBreakfast', delay);

    })

    .subscribedEventHandler('accelerationActiveHandler', (context, event) => {
        
        log.trace("${event.value}: $evt, $settings")
        
        context.api.devices.sendCommands(context.config.sensor, 'accelerationSensor', eventsSince)
    
        log.trace("Found ${(recentEvents?.size()) ? recentEvents?.size() : 0} events in the last $ignoreDelay seconds")
        let alreadyProcessedEvents = recentEvents.count({
        it.value && it.value == 'active'
        }) > 1
        if (alreadyProcessedEvents) {
        console.log("Ignoring events that have already been processed within the last $ignoreDelay seconds")
        } else {
        console.log('Turning on indicator switches')
        switches.each({
        it.on()
        })
        }
        

	})

    .scheduledEventHandler('resetHandlerDinner', (context, event) => {
        
        this.resetHandler()
        

	})

    .scheduledEventHandler('resetHandlerLunch', (context, event) => {
        
        this.resetHandler()
        

	})

    .scheduledEventHandler('resetHandlerBreakfast', (context, event) => {
        
        this.resetHandler()
        

	})
