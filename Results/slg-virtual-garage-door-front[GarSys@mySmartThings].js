
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose the switch/relay that opens the garage.', section => {
            section.deviceSetting('opener').capability(['switch']).name('Physical Garage Opener?');

        });


        page.section('Choose the switch/relay that closes the garage.', section => {
            section.deviceSetting('closer').capability(['switch']).name('Physical Garage Closer?');

        });


        page.section('Choose the sensor that senses if the garage is open or closed?', section => {
            section.deviceSetting('sensor').capability(['contactSensor']).name('Physical Garage Door Open/Closed sensor?');

        });


        page.section('Choose the Virtual Garage Door device.', section => {
            section.deviceSetting('virtualgd').capability(['doorControl']).name('Virtual Garage Door?');

        });


        page.section('Choose the Virtual Garage Door device sensor (same as Virtual Garage Door device).', section => {
            section.deviceSetting('virtualgdsensor').capability(['contactSensor']).name('Virtual Garage Door Open/Close sensor?');

        });


        page.section('Timeout before checking if the door operated correctly.', section => {
            section.numberSetting('checkTimeout').name('Door Operation Check Timeout?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'contactSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualgdsensor, 'contactSensor', 'contact', 'virtualgdcontactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        let virtualgdstate = virtualgd.currentContact
        if ('open' == event.value) {
        console.log("Contact is in ${event.value} state")
        if (virtualgdstate != 'open') {
        this.mysend("${virtualgd.displayName} Opened Manually, syncing with Virtual Device!")
        
        context.api.devices.sendCommands(context.config.virtualgd, 'doorControl', open)
    
        }
        }
        if ('closed' == event.value) {
        console.log("Contact is in ${event.value} state")
        if (virtualgdstate != 'closed') {
        this.mysend("${virtualgd.displayName} Closed Manually, syncing with Virtual Device!")
        
        context.api.devices.sendCommands(context.config.virtualgd, 'doorControl', close)
    
        }
        }
        

	})

    .subscribedEventHandler('virtualgdcontactHandler', (context, event) => {
        
        let realgdstate = sensor.currentContact
        if ('open' == event.value) {
        console.log("Contact is in ${event.value} state")
        if (realgdstate != 'open') {
        console.log('opening physical door to correspond with button press')
        
        context.api.devices.sendCommands(context.config.opener, 'switch', on)
    
        this.mysend("${virtualgd.displayName} Opened, syncing with Physical Door!")
        this.runIn(checkTimeout, checkIfActuallyOpened)
        }
        }
        if ('closed' == event.value) {
        console.log("Contact is in ${event.value} state")
        if (realgdstate != 'closed') {
        console.log('closing physical door to correspond with button press')
        
        context.api.devices.sendCommands(context.config.closer, 'switch', on)
    
        this.mysend("${virtualgd.displayName} Closed, syncing with Physical Door!")
        this.runIn(checkTimeout, checkIfActuallyClosed)
        }
        }
        

	})
