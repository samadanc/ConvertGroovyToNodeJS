
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'runRefresh')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'runRefresh')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'runRefresh')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'runRefresh')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'runRefresh')

    })

    .subscribedEventHandler('runRefresh', (context, event) => {
        
                if (evt) {
                    log.info('Event ' + event.displayName + ' triggered refresh')
                    this.runIn(30, delayedRefresh)
                }
                log.info('Last refresh was ' + this.now() - state.polling['last'] / 60000 + ' minutes ago')
                if (state.polling['last'] ? state.polling['last'] : 0 + settings.polling.toInteger() > 0 ? settings.polling.toInteger() : 1 * 60000 + 300000 < this.now() && this.canSchedule()) {
                    log.info('Scheduling Auto Refresh..')
                    this.schedule('* */' + settings.polling.toInteger() > 0 ? settings.polling.toInteger() : 1 + ' * * * ?', refresh)
                }
                this.refresh()
                if (!evt) {
                    state.polling['rescheduler'] = this.now()
                }
            

	})
