
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('subscribeToDevices', delay);

    })

    .scheduledEventHandler('subscribeToDevices', (context, event) => {
        
                if (settings.detailDebug) {
                    console.log('subscribeToDevices() called')
                }
                let devices = this.getAllChildDevices()
                devices.each({ let d ->
                    d.subscribe()
                })
                java.lang.Integer refreshMin = settings.refreshTime ? settings.refreshTime : 5
                String refreshSchedule = '0 0/' + refreshMin.toString() + ' * 1/1 * ? *'
                this.schedule(refreshSchedule, 'refresh')
                this.schedule('0 0/30 * 1/1 * ? *', 'doDeviceSync')
            

	})
