
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Cameras', section => {
            section.deviceSetting('cameras').capability(['imageCapture']).name('');

        });


        page.section('How long to monitor after Moving to preset', section => {
            section.numberSetting('endTime').name('Number of Minutes, (Default 10)');

        });


        page.section('Camera burst', section => {
            section.numberSetting('burstCount').name('How many? (default 5)');

        });


        page.section('Sensors and Camera Position', section => {
            section.enumSetting('preseta').name('Sensor A - Preset');
            section.deviceSetting('sensora').capability(['contactSensor']).name('Contact Sensor A');
            section.enumSetting('presetb').name('Sensor B - Preset');
            section.deviceSetting('sensorb').capability(['contactSensor']).name('Contact Sensor B');
            section.enumSetting('presetc').name('Sensor C - Preset');
            section.deviceSetting('sensorc').capability(['contactSensor']).name('Contact Sensor C');

        });


        page.section('Notification', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensorc, 'contactSensor', 'contact', 'sensorAalarm')

        await context.api.subscriptions.subscribeToDevices(context.config.sensorb, 'contactSensor', 'contact', 'sensorAalarm')

        await context.api.subscriptions.subscribeToDevices(context.config.sensora, 'contactSensor', 'contact', 'sensorAalarm')

    })

    .subscribedEventHandler('sensorAalarm', (context, event) => {
        
        let ContactTrigger
        let FriendlyContactName
        let DisplayName
        DisplayName = event.displayName
        console.log(DisplayName)
        switch ( DisplayName ) {
        case sensora.label:
        ContactTrigger = preseta
        FriendlyContactName = sensora.label
        break
        case sensorb.label:
        ContactTrigger = presetb
        FriendlyContactName = sensorb.label
        break
        case sensorc.label:
        ContactTrigger = presetc
        FriendlyContactName = sensorc.label
        break
        }
        console.log("$FriendlyContactName : $ContactTrigger")
        console.log("$FriendlyContactName Activity ")
        if (event.value == 'open') {
        console.log("$FriendlyContactName has opened at $location")
        switch ( ContactTrigger ) {
        case '1':
        
        context.api.devices.sendCommands(context.config.cameras, 'imageCapture', preset1)
    
        break
        case '2':
        
        context.api.devices.sendCommands(context.config.cameras, 'imageCapture', preset2)
    
        break
        case '3':
        
        context.api.devices.sendCommands(context.config.cameras, 'imageCapture', preset3)
    
        break
        }
        this.enableAlarm()
        this.burstPicture()
        this.sendMessage("$FriendlyContactName opened, alarm enabled")
        } else {
        console.log("$FriendlyContactName closed")
        this.disableAlarmHandler()
        }
        

	})
