
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkForUpdates', delay);

    })

    .scheduledEventHandler('checkForUpdates', (context, event) => {
        
                this.checkForFusionUpdates()
                this.checkForTriggerUpdates()
                if (installCamaraDevices) {
                    this.checkForCameraUpdates()
                }
                if (usingBIServer) {
                    this.checkForServerUpdates()
                }
            

	})
