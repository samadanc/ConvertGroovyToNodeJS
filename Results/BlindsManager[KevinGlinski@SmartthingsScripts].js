
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Raspberry Pi Setup', section => {
            section.textSetting('piIP').name('Raspberry Pi IP');
            section.textSetting('piPort').name('Raspberry Pi Port');

        });


        page.section('Device 1', section => {
            section.textSetting('deviceName1').name('Device Name');
            section.enumSetting('deviceType1').name('Device Type');
            section.textSetting('deviceConfig1').name('GPIO# or Device Name');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'response')

    })

    .subscribedEventHandler('response', (context, event) => {
        
        let msg = this.parseLanMessage(event.description)
        if (msg && msg.body) {
        let children = this.getChildDevices(false)
        if (msg.json) {
        msg.json.GPIO.each({ let item ->
        this.updateRelayDevice(item.key, item.value.value, children)
        })
        log.trace('Finished Getting GPIO State')
        }
        let tempContent = msg.body.tokenize('.')
        if (tempContent.size() == 2 && tempContent[0].isNumber() && tempContent[1].isNumber()) {
        let networkId = this.getTemperatureID(state.temperatureZone)
        let theDevice = this.getChildDevices().find({ let d ->
        d.deviceNetworkId.startsWith(networkId)
        })
        if (theDevice) {
        theDevice.setTemperature(msg.body, state.temperatureZone)
        log.trace("$theDevice set to ${msg.body}")
        }
        }
        }
        

	})
