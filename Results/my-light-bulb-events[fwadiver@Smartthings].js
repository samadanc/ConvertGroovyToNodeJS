
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Light Bulb being tested:', section => {
            section.deviceSetting('TestBulbs').capability(['switch']).name('Bulb List?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkRestore', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.TestBulbs, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        log.info("${event.displayName} ${event.value} at hub ${evt?.hub.id}")
        if (event.physical) {
        log.trace('Event is physical')
        } else {
        log.trace('Event is digital')
        }
        let lightsState = [:]
        lightsState = state.lStates
        lightsState[event.deviceId] = event.value
        log.info("$lightsState")
        state.lStates = lightsState
        

	})

    .scheduledEventHandler('checkRestore', (context, event) => {
        
        console.log('Checking Restore')
        TestBulbs?.each({
        console.log("Switch id = ${it.id} : ${it.displayName} value ${it.currentSwitch}")
        })
        this.pollBulbs()
        

	})
