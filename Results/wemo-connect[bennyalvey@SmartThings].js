
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('doDeviceSync', delay);

        context.api.schedules.runIn('refresh', delay);

        context.api.schedules.runIn('subscribeToDevices', delay);

    })

    .scheduledEventHandler('subscribeToDevices', (context, event) => {
        
                let devices = this.getAllChildDevices()
                devices.each({ let d ->
                    d.subscribe()
                })
            

	})

    .scheduledEventHandler('doDeviceSync', (context, event) => {
        
                console.log('Doing Device Sync!')
                this.runIn(300, 'doDeviceSync', ['overwrite': false])
                if (!state.subscribe) {
                    this.subscribe(location, null, locationHandler, ['filterEvents': false])
                    state.subscribe = true
                }
                this.discoverAllWemoTypes()
            

	})

    .scheduledEventHandler('refresh', (context, event) => {
        
                console.log('refresh() called')
                this.runIn(1740, 'refresh', ['overwrite': false])
                let devices = this.getAllChildDevices()
                devices.each({ let d ->
                    console.log("Calling refresh() on device: ${d.id}")
                    d.refresh()
                })
            

	})
