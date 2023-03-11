
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('syncSystem', delay);

    })

    .scheduledEventHandler('syncSystem', (context, event) => {
        
                console.log('Syncing system')
                let timeString = new Date(this.now()).format('yyyy-MM-dd h:mm a', location.timeZone)
                state.initTime = timeString 
                let result = new physicalgraph.device.HubAction(['method': 'GET', 'path': '/api/status', 'headers': ['HOST': configURL ]], null, ['callback': httpCallback ])
                try {
                    this.sendHubCommand(result)
                } 
                catch (let all) {
                    log.error("Error executing internal web request: $all")
                } 
            

	})
