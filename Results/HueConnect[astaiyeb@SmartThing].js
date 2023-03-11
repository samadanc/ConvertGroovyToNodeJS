
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
                this.convertBulbListToMap()
                this.convertGroupListToMap()
                this.poll()
                try {
                    this.subscribe(location, null, locationHandler, ['filterEvents': false])
                } 
                catch (let all) {
                    log.trace('Subscription already exist')
                } 
                this.discoverBridges()
            

	})
