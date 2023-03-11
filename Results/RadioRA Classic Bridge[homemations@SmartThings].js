
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery30Minutes('pollZones', delay);

        context.api.schedules.runEvery5Minutes('pollZones', delay);

        context.api.schedules.runEvery15Minutes('pollZones', delay);

        context.api.schedules.runEvery10Minutes('pollZones', delay);

    })

    .scheduledEventHandler('pollZones', (context, event) => {
        
                log.info('Entered Method: pollZones()')
                try {
                    let httpRequest = ['method': 'GET', 'path': this.getPlatformUri() + '/zones/', 'headers': ['HOST': this.getHostAddress(), 'Content-Type': 'application/json']]
                    let hubAction = new physicalgraph.device.HubAction(httpRequest, null, ['callback': pollCallbackHandler ])
                    this.sendHubCommand(hubAction)
                } 
                catch (let all) {
                    log.error('Connection to RadioRA Classic Smart Bridge failed. Message: ' + all )
                } 
                return null
            

	})
