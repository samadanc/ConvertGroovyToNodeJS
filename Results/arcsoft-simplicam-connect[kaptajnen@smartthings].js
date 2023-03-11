
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Closeli Credentials', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('syncState', delay);

    })

    .scheduledEventHandler('syncState', (context, event) => {
        
        let deviceData = this.closeliGetDevices()
        deviceData.each({
        let dni = [app.id, it.deviceid].join('.')
        let device = this.getChildDevice(dni)
        if (device) {
        let cloudStatus = it.deviceStatus == 'On' ? 'on' : 'off'
        let devStatus = device.currentSwitch
        if (devStatus != cloudStatus ) {
        console.log("Camera is not in sync with cloud. Cloud is $cloudStatus, device is $devStatus")
        device.sendEvent(['name': 'switch', 'value': cloudStatus , 'isStateChange': true])
        }
        }
        })
        

	})
