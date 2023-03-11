
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
                this.settingsToRooms().findAll({ let key, let room ->
                    room.Sensor.toString().equals(event.getDevice().toString())
                }).each({ let key, let room ->
                    console.log("Found sensor ${room.Sensor} for ${room.Name}, handling...")
                    let thermostat = this.getThermostateDeviceForRoom(key)
                    thermostat.updateTemperature(event.value)
                    thermostat.evaluate(room.Switches)
                })
            

	})
