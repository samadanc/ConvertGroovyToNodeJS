
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('SWANN Configuration', section => {
            section.textSetting('swannAddress').name('ISY Address');
            section.numberSetting('swannPort').name('Swann NVR Port');
            section.numberSetting('cameraCount').name('Camera Count');
            section.textSetting('swannUserName').name('User Name');
            section.textSetting('swannPassword').name('Password');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'locationHandler')

    })

    .subscribedEventHandler('locationHandler', (context, event) => {
        
        let msg = this.parseLanMessage(event.description)
        if (!msg.xml) {
        if (msg.body && msg.body.length() > 0) {
        msg.xml = new XmlSlurper().parseText(msg.body)
        }
        }
        if (msg.xml) {
        this.handleXmlMessage(msg.xml)
        } else {
        if (atomicState.activeSnapshotCameraId != -1) {
        let cameraDni = atomicState.cameraMap[atomicState.activeSnapshotCameraId.toString()]
        let cameraDevice = this.getChildDevice(cameraDni)
        if (cameraDevice != null) {
        cameraDevice.parse(event.description)
        }
        }
        }
        

	})
