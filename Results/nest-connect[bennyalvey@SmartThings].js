
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log in to your Nest account', section => {
            section.textSetting('username').name('Email Address');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('poll', delay);

    })

    .scheduledEventHandler('poll', (context, event) => {
        
        console.log('Executing \'poll\'')
        this.api(null, 'status', [], {
        it.data.device.each({ let serial, let value ->
        let child = this.getChildDevice(serial)
        if (child) {
        let structure = it.data.structure[state.structures[ serial ]]
        let shared = it.data.shared[ serial ]
        child?.sendEvent(['name': 'humidity', 'value': value.current_humidity])
        child?.sendEvent(['name': 'temperature', 'value': ((this.cToF(shared.current_temperature)) as Integer), 'state': value.target_temperature_type])
        child?.sendEvent(['name': 'thermostatFanMode', 'value': value.fan_mode == 'duty-cycle' ? 'circulate' : value.fan_mode])
        child?.sendEvent(['name': 'thermostatMode', 'value': shared.target_temperature_type])
        child?.sendEvent(['name': 'coolingSetpoint', 'value': ((this.cToF(shared.target_temperature)) as Integer)])
        child?.sendEvent(['name': 'heatingSetpoint', 'value': ((this.cToF(shared.target_temperature)) as Integer)])
        child?.sendEvent(['name': 'presence', 'value': structure.away ? 'away' : 'present'])
        }
        })
        })
        

	})
