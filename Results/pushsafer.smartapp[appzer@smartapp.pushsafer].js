
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Which Motion Sensors?');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Which Contact Sensors?');
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Which Presence Sensors?');
            section.deviceSetting('accelerationSensors').capability(['accelerationSensor']).name('Which Acceleration Sensors?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');

        });


        page.section('Application...', section => {
            section.enumSetting('push').name('SmartThings App Notification?');

        });


        page.section('Pushsafer...', section => {
            section.textSetting('privatekey').name('Private or Alias Key');
            section.textSetting('Pushtitle').name('Title');
            section.textSetting('Pushdevice').name('Device or Device Group ID (blank for all)');
            section.textSetting('PushURL').name('URL or URL scheme');
            section.textSetting('PushURLtitle').name('Title of URL');
            section.textSetting('PushTime2Live').name('Time 2 Live');
            section.textSetting('Pushicon').name('Icon');
            section.textSetting('Pushsound').name('Sound');
            section.textSetting('Pushvibration').name('Vibration');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensors, 'contactSensor', 'contact', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.accelerationSensors, 'accelerationSensor', 'acceleration', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensors, 'presenceSensor', 'presence', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        console.log("${event.displayName} is ${event.value}")
        if (push == 'Yes') {
        this.sendPush("${event.displayName} is ${event.value} [Sent from 'Pushsafer']")
        }
        let postBody = ['k': "$privatekey", 'm': "${event.displayName} is ${event.value}"]
        if (Pushdevice) {
        postBody['d'] = "$Pushdevice"
        }
        if (Pushicon) {
        postBody['i'] = "$Pushicon"
        }
        if (Pushsound) {
        postBody['s'] = "$Pushsound"
        }
        if (Pushvibration) {
        postBody['v'] = "$Pushvibration"
        }
        if (PushURL) {
        postBody['u'] = "$PushURL"
        }
        if (PushURLtitle) {
        postBody['ut'] = "$PushURLtitle"
        }
        if (Pushtitle) {
        postBody['t'] = "$Pushtitle"
        }
        if (PushTime2Live) {
        postBody['l'] = "$PushTime2Live"
        }
        let params = ['uri': 'https://www.pushsafer.com/api', 'body': postBody ]
        console.log(postBody)
        console.log("Sending Pushsafer: Private/Alias key '$privatekey'")
        this.httpPost(params, { let response ->
        if (response.status != 200) {
        this.sendPush("ERROR: 'Pushsafer' received HTTP error ${response.status}. Check your key!")
        log.error("Received HTTP error ${response.status}. Check your key!")
        } else {
        console.log("HTTP response received [${response.status}]")
        }
        })
        

	})
