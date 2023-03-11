
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Trigger API Updates when these devices change state...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Which Dimmers?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Which Presence Sensors?');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Which Thermostats?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'level', 'dimmersHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchesHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'thermostat', 'thermostatsHandler')

    })

    .subscribedEventHandler('thermostatsHandler', (context, event) => {
        
        if (event.name == 'temperature') {
        this.SendUpdate("/set/Serial/1/${event.deviceId}=Temp=${event.value}")
        }
        if (event.name == 'heatingSetpoint') {
        this.SendUpdate("/set/Serial/1/${event.deviceId}=HeatSP=${event.value}")
        }
        if (event.name == 'coolingSetpoint') {
        this.SendUpdate("/set/Serial/1/${event.deviceId}=CoolSP=${event.value}")
        }
        if (event.name == 'thermostatMode') {
        this.SendUpdate("/set/Serial/1/${event.deviceId}=SystemMode=${event.value}")
        }
        if (event.name == 'thermostatFanMode') {
        this.SendUpdate("/set/Serial/1/${event.deviceId}=FanMode=${event.value}")
        }
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        if (event.value == 'present') {
        console.log("${(presence.label) ? presence.label : presence.name} has arrived at the $location")
        this.sendPush("${(presence.label) ? presence.label : presence.name} has arrived at the $location")
        } else {
        if (event.value == 'not present') {
        console.log("${(presence.label) ? presence.label : presence.name} has left the $location")
        let url = 'http://192.168.1.90:9050/Serial/1/SomeoneIsHome'
        this.httpGet(url, { let response ->
        if (response.status != 200) {
        console.log('Sending Off Status to Crestron Failed')
        }
        })
        this.sendPush("${(presence.label) ? presence.label : presence.name} has left the $location")
        }
        }
        

	})

    .subscribedEventHandler('dimmersHandler', (context, event) => {
        
        console.log('Event Occurred')
        if (event.value != null) {
        this.SendUpdate("/${event.deviceId}/${event.value}")
        }
        

	})

    .subscribedEventHandler('switchesHandler', (context, event) => {
        
        if (event.value == 'on') {
        this.SendUpdate("/${event.deviceId}/on")
        } else {
        if (event.value == 'off') {
        this.SendUpdate("/${event.deviceId}/off")
        }
        }
        

	})
