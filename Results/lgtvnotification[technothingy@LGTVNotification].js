
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''LGTVNotification'', section => {

        });


        page.section('Notify when motion detected:', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Where?');

        });


        page.section('Message to send:', section => {
            section.textSetting('message').name('Message');

        });


        page.section('LGTV Rest Server', section => {
            section.textSetting('ip').name('WebService IP Address');
            section.textSetting('port').name('WebService Port');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionDetectedHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        console.log("motionDetectedHandler called: $evt")
        console.log("event.displayName: ${event.displayName}")
        let json = new JsonBuilder()
        json.call(['msg': "${settings.message} in ${event.displayName}"])
        let headers = [:]
        headers.put('HOST', "${settings.ip}:${settings.port}")
        headers.put('Content-Type', 'application/json')
        console.log("The Header is $headers")
        let method = 'POST'
        try {
        let hubAction = new physicalgraph.device.HubAction(['method': method , 'path': '/toast', 'body': json.content, 'headers': headers ])
        console.log(hubAction)
        this.sendHubCommand(hubAction)
        }
        catch (Exception e) {
        console.log("Hit Exception $e on $hubAction")
        }
        

	})
