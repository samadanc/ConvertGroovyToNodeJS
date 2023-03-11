
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunriseSunsetTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseSunsetTimeHandler')

        context.api.schedules.schedule('checkPresenceTimeNow', delay);

    })

    .subscribedEventHandler('switchEnable', (context, event) => {
        
                state.sEnable = event.value
                this.LOGDEBUG("$enableSwitch = ${state.sEnable}")
                if (state.sEnable == 'on') {
                    state.appgo = true
                } else {
                    if (state.sEnable == 'off') {
                        state.appgo = false
                    }
                }
            

	})

    .subscribedEventHandler('group2Handler', (context, event) => {
        
                this.setPresence2()
            

	})

    .subscribedEventHandler('singlePresenceHandler', (context, event) => {
        
                state.privatePresence = event.value
                if (state.privatePresence == 'present') {
                    this.arrivalAction()
                }
                if (state.privatePresence == 'not present') {
                    this.departureAction()
                }
            

	})

    .subscribedEventHandler('group1Handler', (context, event) => {
        
                if (event.value == 'present') {
                    if (state.privatePresence1 != 'present') {
                        state.privatePresence1 = 'present'
                        state.privatePresence = 'present'
                        this.LOGDEBUG("A sensor arrived so setting group to '${state.privatePresence}'")
                        this.arrivalAction()
                    }
                } else {
                    if (event.value == 'not present') {
                        if (state.privatePresence1 != 'not present') {
                            state.privatePresence1 = 'not present'
                            state.privatePresence = 'not present'
                            this.LOGDEBUG("A sensor left so setting group to '${state.privatePresence}'")
                            this.departureAction()
                        }
                    }
                }
            

	})

    .subscribedEventHandler('sunriseSunsetTimeHandler', (context, event) => {
        
                log.trace('sunriseSunsetTimeHandler()')
                this.astroCheck()
            

	})

    .subscribedEventHandler('doorContactHandler', (context, event) => {
        
                state.contactDoor = event.value
                this.LOGDEBUG("state.contactDoor = ${state.contactDoor}")
            

	})

    .subscribedEventHandler('timePresenceHandler', (context, event) => {
        
                state.privatePresence = event.value
                this.LOGDEBUG("state.privatePresence = ${state.privatePresence}")
            

	})

    .scheduledEventHandler('checkPresenceTimeNow', (context, event) => {
        
                this.LOGDEBUG('Activating timed check now....')
                if (state.privatePresence == 'present') {
                    this.arrivalAction()
                }
                if (state.privatePresence == 'not present') {
                    this.departureAction()
                }
            

	})
