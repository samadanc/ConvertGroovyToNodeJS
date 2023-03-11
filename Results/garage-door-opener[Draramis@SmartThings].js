
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose the switch/relay that opens closes the garage?', section => {
            section.deviceSetting('opener').capability(['switch']).name('Physical Garage Opener?');

        });


        page.section('Choose the sensor that senses if the garage is open closed? ', section => {
            section.deviceSetting('sensor').capability(['contactSensor']).name('Physical Garage Door Open/Closed?');

        });


        page.section('Choose the Virtual Garage Door Device? ', section => {
            section.deviceSetting('virtualgd').capability(['doorControl']).name('Virtual Garage Door?');

        });


        page.section('Choose the Virtual Garage Door Device sensor (same as above device)?', section => {
            section.deviceSetting('virtualgdbutton').capability(['contactSensor']).name('Virtual Garage Door Open/Close Sensor?');

        });


        page.section('Timeout before checking if the door opened or closed correctly?', section => {
            section.numberSetting('checkTimeout').name('Door Operation Check Timeout?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.virtualgdbutton, 'contactSensor', 'contact', 'virtualgdcontactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'contactSensor', 'contact', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        let virtualgdstate = virtualgd.currentContact
        if ('open' == event.value) {
        console.log("Contact is in ${event.value} state")
        if (virtualgdstate != 'open') {
        this.mysend('Garage Door Opened Manually syncing with Virtual Garage Door!')
        
        context.api.devices.sendCommands(context.config.virtualgd, 'doorControl', open)
    
        }
        }
        if ('closed' == event.value) {
        console.log("Contact is in ${event.value} state")
        if (virtualgdstate != 'closed') {
        this.mysend('Garage Door Closed Manually syncing with Virtual Garage Door!')
        
        context.api.devices.sendCommands(context.config.virtualgd, 'doorControl', close)
    
        }
        }
        

	})

    .subscribedEventHandler('virtualgdcontactHandler', (context, event) => {
        
        let realgdstate = sensor.currentContact
        if ('open' == event.value) {
        console.log("Contact is in ${event.value} state")
        if (realgdstate != 'open') {
        console.log('opening real gd to correspond with button press')
        this.mysend('Virtual Garage Door Opened syncing with Actual Garage Door!')
        
        context.api.devices.sendCommands(context.config.opener, 'switch', on)
    
        this.runIn(checkTimeout, checkIfActuallyOpened)
        }
        }
        if ('closed' == event.value) {
        console.log("Contact is in ${event.value} state")
        if (realgdstate != 'closed') {
        console.log('closing real gd to correspond with button press')
        this.mysend('Virtual Garage Door Closed syncing with Actual Garage Door!')
        
        context.api.devices.sendCommands(context.config.opener, 'switch', on)
    
        this.runIn(checkTimeout, checkIfActuallyClosed)
        }
        }
        

	})
