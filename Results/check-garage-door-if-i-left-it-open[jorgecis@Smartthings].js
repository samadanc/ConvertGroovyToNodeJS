
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I leave...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Monitor this door or window', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('');

        });


        page.section('Via text message at this number (or via push notification if not specified', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        if (event.value == 'present') {
        console.log('somebody arrive ignore it')
        } else {
        
        context.api.devices.sendCommands(context.config.contact, 'contactSensor', currentState)
    
        if (contactState.value == 'open') {
        console.log('Contact leave and the door is open')
        this.sendMessage(event.displayName)
        }
        }
        

	})
