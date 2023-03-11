
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When water is sensed...', section => {
            section.deviceSetting('waterSensor').capability(['waterSensor']).name('Where? (sensors)');
            section.deviceSetting('contactSensor').capability(['contactSensor']).name('Where? (switches)');

        });


        page.section('Close a valve...', section => {
            section.deviceSetting('valve').capability(['switch']).name('Which?');

        });


        page.section('Push notification alerts?', section => {
            section.booleanSetting('pushNotification').name('Send a Push-notification Alert');

        });


        page.section('SMS message alerts?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact.open', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.valve, 'switch', 'switch.off', 'valveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact.closed', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.waterSensor, 'waterSensor', 'water.dry', 'waterHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.valve, 'switch', 'switch.on', 'valveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.waterSensor, 'waterSensor', 'water.wet', 'waterHandler')

    })

    .subscribedEventHandler('waterHandler', (context, event) => {
        
        let msg = "${waterSensor.displayName}: ${state.defaultWaterAlertMsg}"
        console.log("alertMessage: $msg")
        if (event.value == 'wet') {
        this.sendAlert(msg)
        
        context.api.devices.sendCommands(context.config.valve, 'switch', off)
    
        state.alertStart = true
        this.runIn(15, checkValve)
        }
        

	})

    .subscribedEventHandler('valveHandler', (context, event) => {
        
        let msg
        if (event.value == 'on') {
        msg = "${valve.displayName}: OPEN"
        } else {
        msg = "${valve.displayName}: CLOSE"
        }
        console.log("alertMessage: $msg")
        this.sendAlert(msg)
        state.alertStart = false
        

	})

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("contactHandler event created at: ${event.date}")
        let msg = "${contactSensor.displayName}: ${state.defaultWaterAlertMsg}"
        console.log("alertMessage: $msg")
        if (event.value == 'open') {
        this.sendAlert(msg)
        
        context.api.devices.sendCommands(context.config.valve, 'switch', off)
    
        state.alertStart = true
        this.runIn(15, checkValve)
        }
        

	})
