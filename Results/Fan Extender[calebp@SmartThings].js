
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pick a thermostat and fan extension duration', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Choose a thermostat...');
            section.numberSetting('intervalInMin').name('Additional fan runtime in minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatOperatingState', 'operatingStateHandler')

    })

    .subscribedEventHandler('operatingStateHandler', (context, event) => {
        
        console.log("Operating state is ${event.value}")
        if (event.value == 'heating' || event.value == 'cooling') {
        if (state.fanBeingExtended == 0) {
        state.priorFanMode = thermostat.currentValue
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', fanOn)
    
        state.fanBeingExtended = 1
        } else {
        console.log('Hvac cycle repeated inside fan extension, unschedule and delay')
        this.unschedule()
        }
        console.log("Hvac cycle for ${event.value} entered, setting fan on, fan mode was ${state.priorFanMode}")
        } else {
        if (event.value == 'idle') {
        console.log("Hvac control is idle, setting fan timeout for $intervalInMin minutes")
        this.runIn(intervalInMin * 60, fanExtensionExpiryHandler)
        } else {
        console.log("Hvac state was unhandled: ${event.value}")
        }
        }
        

	})
