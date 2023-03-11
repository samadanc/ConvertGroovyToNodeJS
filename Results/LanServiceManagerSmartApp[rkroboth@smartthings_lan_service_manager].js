
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('SmartThings Hub', section => {

        });


        page.section('LAN Service Manager endpoint', section => {
            section.textSetting('LANServiceAddress').name('LAN Service Manager Address');
            section.textSetting('LANServicePort').name('LAN Service Manager Port');

        });


        page.section('Enter a key string to use to authenticate communication between SmartThings hub and LAN Service Manager', section => {
            section.textSetting('apiKey').name('API key string');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'onHTTPRequest')

    })

    .subscribedEventHandler('onHTTPRequest', (context, event) => {
        
        let map = this.stringToMap(event.stringValue)
        let body = this.getHttpBody(map.body)
        if (!body) {
        return null
        }
        console.log("Incoming API request body: $body")
        if (apiKey && body.key != apiKey ) {
        console.log('Key in the incoming API request doesn\'t match the key set in the SmartApp')
        return null
        }
        if (!body.command) {
        console.log('No command provided by the incoming API request')
        return null
        }
        switch (body.command) {
        case 'updateDeviceList':
        this.updateDeviceList(body.data)
        break
        case 'processEvents':
        this.processEvents(body.data)
        break
        default:
        console.log("Unknown command ${body.command}")
        }
        

	})
