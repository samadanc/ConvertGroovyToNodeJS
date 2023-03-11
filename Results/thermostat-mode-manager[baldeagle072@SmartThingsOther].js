
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Thermostat', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Thermostat');

        });


        page.section('Outdoor Temperature Sensor', section => {
            section.deviceSetting('outdoorTemp').capability(['temperatureMeasurement']).name('Outdoor Temperature');

        });


        page.section('Doors and windows', section => {
            section.deviceSetting('doorsWindows').capability(['contactSensor']).name('Doors + Windows');

        });


        page.section('Notifications', section => {
            section.booleanSetting('recieveMsg').name('Turn on to recieve notifications');
            section.booleanSetting('pushMsg').name('Recieve push messages?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatMode', 'setTstatModeState')

        await context.api.subscriptions.subscribeToDevices(context.config.outdoorTemp, 'temperatureMeasurement', 'temperature', 'outdoorTempHandler')

    })

    .subscribedEventHandler('outdoorTempHandler', (context, event) => {
        
        let outdoorTemp = event.value.toDouble()
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', log)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', currentValue)
    
        let doorWindowOpen = this.checkDoorsAndWindows()
        if (state.tstatMode == 'cool') {
        console.log("checking (outdoorTemp > tstatTemp) ${(outdoorTemp > tstatTemp)}, doorWindowOpen $doorWindowOpen")
        if (outdoorTemp > tstatTemp && doorWindowOpen ) {
        this.notify('It\'s too warm outside - close everything')
        }
        }
        

	})

    .subscribedEventHandler('setTstatModeState', (context, event) => {
        
        console.log("isDigital: ${event.isDigital()}")
        if (!(event.isDigital())) {
        state.tstatMode = event.value
        console.log(state.tstatMode)
        }
        

	})
