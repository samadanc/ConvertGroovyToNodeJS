
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('reminderSwitch').capability(['switch']).name('Reminder Switch');

        });


        page.section('', section => {
            section.deviceSetting('cameras').capability(['switch']).name('Cameras');

        });


        page.section('', section => {
            section.booleanSetting('logEnable').name('Enable debug logging?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.person, 'device.PersonStatus', 'state', 'stateHandler')

    })

    .subscribedEventHandler('stateHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        if (event.value == 'home') {
        this.runIn(5, checkCameras)
        } else {
        
        context.api.devices.sendCommands(context.config.reminderSwitch, 'switch', off)
    
        }
        

	})

    .subscribedEventHandler('cameraHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        if (event.value == 'on') {
        if
        
        context.api.devices.sendCommands(context.config.reminderSwitch, 'switch', on)
    
        }
        } else {
        let allCameraOff = true
        for (let camera : cameras ) {
        if (camera.currentValue('switch') == 'on') {
        allCameraOff = false
        break
        }
        }
        if (allCameraOff == true) {
        
        context.api.devices.sendCommands(context.config.reminderSwitch, 'switch', off)
    
        }
        }
        

	})
