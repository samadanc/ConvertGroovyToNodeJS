
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery15Minutes('updateDeviceStatuses', delay);

    })

    .scheduledEventHandler('updateDeviceStatuses', (context, event) => {
        
                this.logMethod('updateDeviceStatuses')
                this.getTelemetryData({ let telemetryData ->
                    childDevices.each({ let device ->
                        let omnilogicId = device.currentValue('omnilogicId').toInteger()
                        let deviceStatus = telemetryData.children().find({ 
                            it.systemId?.text().toInteger() == omnilogicId 
                        })
                        device.parseStatus(deviceStatus, telemetryData)
                    })
                })
            

	})
