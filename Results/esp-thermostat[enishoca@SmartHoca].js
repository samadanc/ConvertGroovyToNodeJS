
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Device IP Addreess... ', section => {
            section.numberSetting('confTcpPort').name('Thermostat TCP Port');

        });


        page.section('Select the heater outlet(s)... ', section => {
            section.deviceSetting('outlets').capability(['switch']).name('Outlets');

        });


        page.section('Only heat when contact isnt open (optional, leave blank to not require contact sensor)...', section => {
            section.deviceSetting('motion').capability(['contactSensor']).name('Contact');

        });


        page.section('Never go below this temperature: (optional)', section => {

        });


        page.section('Temperature Threshold (Don\'t allow heating to go above or bellow this amount from set temperature)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'lanResponseHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'contactSensor', 'contact', 'motionHandler')

    })

    .subscribedEventHandler('thermostatTemperatureHandler', (context, event) => {
        
        let temperature = event.doubleValue
        console.log("Desired Temperature set to: $temperature ${state.contact}")
        let thermostat = this.getThermostat()
        let thisTemp = thermostat.currentTemperature
        if (state.contact) {
        this.evaluate(thisTemp, temperature)
        } else {
        this.heatingOff()
        }
        

	})

    .subscribedEventHandler('thermostatModeHandler', (context, event) => {
        
        let mode = event.value
        console.log("Mode Changed to: $mode")
        let thermostat = this.getThermostat()
        let thisTemp = thermostat.currentTemperature
        if (state.contact) {
        this.evaluate(thisTemp, thermostat.currentValue('thermostatSetpoint'))
        } else {
        this.heatingOff(mode == 'heat' ? false : true)
        }
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        if (state.contact || emergencySetpoint ) {
        this.evaluate(event.doubleValue, thermostat.currentValue('thermostatSetpoint'))
        state.lastTemp = event.doubleValue
        } else {
        this.heatingOff()
        }
        

	})

    .subscribedEventHandler('lanResponseHandler', (context, event) => {
        
        console.log("lanResponseHandler state: $state")
        let thermostat = this.getThermostat()
        let map = this.stringToMap(event.stringValue)
        console.log("map.mac ${map.mac} : map.ip ${map.ip} : map.port ${map.port}")
        if (map.mac != state.ESPMac) {
        if (map.ip == this.convertIPtoHex(settings.confIpAddr) && map.port == this.convertPortToHex(settings.confTcpPort)) {
        console.log('Updating remote MAC')
        state.ESPMac = map.mac
        console.log("Updating remote MAC ${state.ESPMac}")
        } else {
        console.log('Not ours')
        return null
        }
        }
        if (!map.body) {
        log.error('HTTP response has no body')
        return null
        }
        let body = new String(map.body.decodeBase64())
        return thermostat.parseTstatData(body)
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        let thermostat = this.getThermostat()
        if (event.value == 'closed') {
        state.contact = true
        let thisTemp = thermostat.currentTemperature
        if (thisTemp != null) {
        this.evaluate(thisTemp, thermostat.currentValue('thermostatSetpoint'))
        state.lastTemp = thisTemp
        }
        } else {
        if (event.value == 'open') {
        state.contact = false
        this.heatingOff()
        }
        }
        

	})
