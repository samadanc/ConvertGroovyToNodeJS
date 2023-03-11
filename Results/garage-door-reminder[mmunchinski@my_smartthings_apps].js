
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Version 1.1 1/12/2017'', section => {

        });


        page.section('Select Presence Sensors', section => {
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Presence Sensors');

        });


        page.section('Select Contact Sensors', section => {
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Contact Sensors');

        });


        page.section('Notifications', section => {
            section.booleanSetting('sendPush').name('Push notification');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensors, 'presenceSensor', 'presence.not present', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensors, 'contactSensor', 'contact.open', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.presenceSensors, 'presenceSensor', size)
    
        
        context.api.devices.sendCommands(context.config.contactSensors, 'contactSensor', size)
    
        let currPresenceSensors = presenceSensors.currentPresence
        let currContactSensors = contactSensors.currentContact
        let awayPresenceSensors = currPresenceSensors.findAll({ let currentPresence ->
        currentPresence == 'not present' ? true : false
        })
        let openContactSensors = currContactSensors.findAll({ let currentContact ->
        currentContact == 'open' ? true : false
        })
        let awaySize = awayPresenceSensors.size()
        let openSize = openContactSensors.size()
        console.log("Presence Sensor States: $currPresenceSensors")
        console.log("Contact Sensor States: $currContactSensors")
        console.log("Presence Sensor State:  Total Sensors=$totalPresenceSensors, Total Away=$awaySize")
        console.log("Contact Sensor State:  Total Sensors=$totalContactSensors, Total Open=$openSize")
        if (awaySize == totalPresenceSensors ) {
        if (openSize != 0) {
        console.log('Door Open')
        this.notificationHandler('Garage Door Is Open')
        } else {
        console.log('Door Closed')
        }
        } else {
        console.log('Someone still home')
        }
        

	})
