
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Fans', section => {
            section.deviceSetting('fans').capability(['switchLevel']).name('Ceiling Fan');

        });


        page.section('Thermostat', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Thermostat');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatMode', 'runFansOpState')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatOperatingState', 'runFansOpState')

    })

    .subscribedEventHandler('runFansOpState', (context, event) => {
        
        console.log('runFansOpState Received event')
        let thermostatMode = settings.thermostat.currentValue
        let thermostatOpState = settings.thermostat.currentValue
        console.log("thermostatMode: $thermostatMode")
        console.log("thermostatOpState: $thermostatOpState")
        let fanlevel = fans*.currentValue('level')
        let fanstate = fans*.currentValue('switch')
        let statestring = ''
        let levelstring = ''
        let idxstate = 0
        let idxlevel = 0
        if (thermostatOpState != 'idle') {
        fanlevel.eachWithIndex({ let val, let idx ->
        statestring = "FanState$idx"
        levelstring = "FanLevel$idx"
        state["$statestring"] = fanstate.getAt(idx)
        state["$levelstring"] = val
        console.log("Index: $idx State: ${fanstate.getAt(idx)} Level: $val")
        fans[ idx ].setLevel(40)
        })
        } else {
        console.log('Not running due to thermostat mode')
        fanlevel.eachWithIndex({ let val, let idx ->
        statestring = "FanState$idx"
        idxstate = state["$statestring"]
        levelstring = "FanLevel$idx"
        idxlevel = state["$levelstring"]
        console.log("Index: $idx Stored State: $idxstate Level: $idxlevel")
        console.log("Index: $idx Current State: ${fanstate.getAt(idx)} Level: $val")
        if (idxlevel < val ) {
        console.log("Setting level to $idxlevel")
        fans[ idx ].setLevel(idxlevel)
        }
        if (idxstate == 'on') {
        console.log('idxstate is on')
        if (fanstate.getAt(idx) == 'on') {
        console.log('fan is currently on')
        }
        } else {
        console.log('idxstate is off - turn fan off')
        fans[ idx ].off()
        }
        })
        }
        

	})
