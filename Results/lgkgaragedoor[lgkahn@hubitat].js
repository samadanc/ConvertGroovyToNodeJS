
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
            section.deviceSetting('virtualgd').capability(['garageDoorControl']).name('Virtual Garage Door?');

        });


        page.section('Choose the Virtual Garage Door Device sensor (same as above device)?', section => {
            section.deviceSetting('virtualgdbutton').capability(['contactSensor']).name('Virtual Garage Door Open/Close Sensor?');

        });


        page.section('Timeout before checking if the door opened or closed correctly?', section => {
            section.numberSetting('checkTimeout').name('Door Operation Check Timeout?');

        });


        page.section('Notifications', section => {
            section.deviceSetting('sendPushMessage').capability(['notification']).name('Send Push Notifications? - Notification Devices: Hubitat PhoneApp or Other?');

        });


        page.section('Logging', section => {
            section.booleanSetting('debug').name('Enable logging?');
            section.booleanSetting('descLog').name('Enable descriptionText logging');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.virtualgdbutton, 'contactSensor', 'contact', 'virtualgdcontactHandler')

        context.api.schedules.runIn('logsOff', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'contactSensor', 'contact', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        let virtualgdstate = virtualgd.currentContact
        if ('open' == event.value) {
        if (debug) {
        log.info("Contact is in ${event.value} state")
        }
        if (virtualgdstate != 'open') {
        this.mysend("${virtualgd.displayName} Opened. Manually syncing with Virtual Device!")
        
        context.api.devices.sendCommands(context.config.virtualgd, 'garageDoorControl', open)
    
        }
        }
        if ('closed' == event.value) {
        if (debug) {
        console.log("Contact is in ${event.value} state")
        }
        if (virtualgdstate != 'closed') {
        this.mysend("${virtualgd.displayName} Closed. Manually syncing with Virtual Device!")
        
        context.api.devices.sendCommands(context.config.virtualgd, 'garageDoorControl', close)
    
        }
        }
        

	})

    .subscribedEventHandler('virtualgdcontactHandler', (context, event) => {
        
        let realgdstate = sensor.currentContact
        if (debug) {
        console.log("in virtualgd contact handler check timeout = $checkTimeout")
        }
        if ('open' == event.value) {
        if (debug) {
        console.log("Contact is in ${event.value} state")
        }
        if (realgdstate != 'open') {
        if (desclog) {
        console.log('Opening real gd to correspond with button press.')
        }
        this.mysend("${virtualgd.displayName} Opened. Syncing with Actual Device!")
        
        context.api.devices.sendCommands(context.config.opener, 'switch', on)
    
        if (debug) {
        console.log("scheduling checkifActuallyOpened via runin for $checkTimeout seconds.")
        }
        this.runIn(checkTimeout, checkIfActuallyOpened)
        }
        }
        if ('closed' == event.value) {
        if (debug) {
        console.log("Contact is in ${event.value} state")
        }
        if (realgdstate != 'closed') {
        if (descLog) {
        log.info('closing real gd to correspond with button press.')
        }
        this.mysend("${virtualgd.displayName} Closed. Syncing with Actual Device!")
        
        context.api.devices.sendCommands(context.config.opener, 'switch', on)
    
        if (debug) {
        console.log("Schedulng checkIfActuallyClosed via runIn for $checkTimeout seconds.")
        }
        this.runIn(checkTimeout, checkIfActuallyClosed)
        }
        }
        

	})

    .scheduledEventHandler('logsOff', (context, event) => {
        
        log.info('Turning off Logging!')
        device.updateSetting('debug', ['value': 'false', 'type': 'bool'])
        

	})
