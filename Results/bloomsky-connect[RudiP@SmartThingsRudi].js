
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('refreshBloomsky', delay);

    })

    .scheduledEventHandler('refreshBloomsky', (context, event) => {
        
                log.info('--- Refresh Devices')
                state.lastTime = this.now()
                let devices = this.getChildDevices()
                devices.each({ 
                    if (settings.detailDebug) {
                        console.log("Calling Refresh on BloomSky device: ${it.id}")
                    }
                    it.callAPI()
                })
            

	})
