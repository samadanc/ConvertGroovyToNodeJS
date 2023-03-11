
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Thermostat');

        });


        page.section('Open/Close', section => {
            section.deviceSetting('sensors').capability(['contactSensor']).name('Sensors');
            section.numberSetting('delay').name('Delay (minutes) before turning thermostat off');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'contactSensor', 'contact', 'sensorChange')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatMode', 'thermostatChange')

    })

    .subscribedEventHandler('sensorChange', (context, event) => {
        
        console.log("Desc: sensor event happened ${event.value} , $state")
        let result = this.contactOpenList()
        console.log("Desc: ${event.value} , $result , ${result.size}")
        if (event.value == 'open' && result.size() <= 1) {
        state.thermostatMode = thermostat.currentValue
        console.log("Thermostat mode is ${state.thermostatMode}")
        console.log("Scheduling to turn off $thermostat")
        this.runIn(delay * 60, 'turnOff')
        } else {
        if (event.value == 'closed' && !result) {
        console.log("getting ready to run restore $thermostat")
        this.unschedule()
        this.restore()
        } else {
        if (event.value == 'closed' && result ) {
        let sensorList = result.join(', ')
        this.sendPush("left the thermostat off because these contacts are open: $sensorList")
        }
        }
        }
        

	})

    .subscribedEventHandler('thermostatChange', (context, event) => {
        
        console.log("$thermostat ${event.value} happened")
        if
        state.thermostatMode = thermostat.currentValue
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', log)
    
        this.turnOff()
        }
        

	})
