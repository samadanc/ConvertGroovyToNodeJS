
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'X10RemoteEvent-${state.deviceString}', 'X10RemoteEventHandler')

    })

    .subscribedEventHandler('X10RemoteEventHandler', (context, event) => {
        
                let data = this.parseJson(event.data)
                this.setDeviceStatus(data.deviceString, data.status)
                return null
            

	})
