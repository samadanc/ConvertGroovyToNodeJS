
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('doDeviceSync', delay);

    })

    .scheduledEventHandler('doDeviceSync', (context, event) => {
        
                log.trace('Doing Hue Device Sync!')
                if (state.lastUpdateStarted < this.now() - 20 * 1000 && state.updating) {
                    state.updating = false
                    log.warn('state.updating failed to clear')
                }
                this.convertBulbListToMap()
                this.poll()
                this.ssdpSubscribe()
                this.discoverBridges()
                this.checkBridgeStatus()
            

	})
