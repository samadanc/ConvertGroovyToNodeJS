
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Temperature Setpoints', section => {
            section.textSetting('piPort').name('Raspberry Pi Port');
            section.enumSetting('defaultDamperState').name('Default Damper State');

        });


        page.section('Temperature Sensor Configuration', section => {
            section.textSetting('deviceName1').name('Device Name');
            section.textSetting('piTempIP').name('RPi Temp IP');
            section.enumSetting('deviceType1').name('Device Type');
            section.textSetting('deviceConfig1').name('GPIO# or Device Name');

        });


        page.section('Relay Configuration', section => {
            section.textSetting('deviceName2').name('Device Name');
            section.textSetting('piRelayIP').name('RPi Relay IP');
            section.enumSetting('deviceType2').name('Device Type');
            section.textSetting('deviceConfig2').name('GPIO# or Device Name');

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
        log.trace('Temperature Received')
        java.lang.Float temp = ((float) tempContent[0].toInteger()) + ((float) tempContent[1].toInteger()) / ((float) 100)
        java.lang.Integer max = upperSetpoint.toInteger
        java.lang.Integer min = lowerSetpoint.toInteger
        if (temp > ((float) max) || temp < ((float) min)) {
        log.trace('Allow Air Flow')
        this.controlDampers(true)
        } else {
        log.trace('Don\'t Allow AirFlow')
        this.controlDampers(false)
        }
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
