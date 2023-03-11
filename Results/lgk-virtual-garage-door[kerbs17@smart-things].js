
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
            section.numberSetting('openThreshold').name('Warn when open longer than (optional)');

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
        
        context.api.devices.sendCommands(context.config.virtualgd, 'doorControl', open)
    
        }
        this.schedule('0 * * * * ?', 'doorOpenCheck')
        } else {
        if ('closed' == event.value) {
        console.log("Contact is in ${event.value} state")
        if (virtualgdstate != 'closed') {
        
        context.api.devices.sendCommands(context.config.virtualgd, 'doorControl', close)
    
        }
        if (state.openDoorNotificationSent) {
        this.mysend('Garage door is now closed')
        state.openDoorNotificationSent = false
        }
        this.unschedule('doorOpenCheck')
        }
        }
        

	})

    .subscribedEventHandler('virtualgdcontactHandler', (context, event) => {
        
        let realgdstate = sensor.currentContact
        if ('open' == event.value) {
        console.log("Contact is in ${event.value} state")
        if (realgdstate != 'open') {
        console.log('opening real gd to correspond with button press')
        this.mysend('143 Virtual Garage Door Opened syncing with Actual Garage Door!')
        
        context.api.devices.sendCommands(context.config.opener, 'switch', on)
    
        this.runIn(checkTimeout, checkIfActuallyOpened)
        }
        } else {
        if ('closed' == event.value) {
        console.log("Contact is in ${event.value} state")
        if (realgdstate != 'closed') {
        console.log('closing real gd to correspond with button press')
        this.mysend('152 Virtual Garage Door Closed syncing with Actual Garage Door!')
        
        context.api.devices.sendCommands(context.config.opener, 'switch', on)
    
        this.runIn(checkTimeout, checkIfActuallyClosed)
        }
        }
        }
        

	})
