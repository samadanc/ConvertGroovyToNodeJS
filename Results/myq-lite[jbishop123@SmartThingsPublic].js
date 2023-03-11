
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('sensorHandler', (context, event) => {
        
                console.log('Sensor change detected: Event name  ' + event.name + ' value: ' + event.value + ' deviceID: ' + event.deviceId)
                if (event.value == 'active' || event.value == 'inactive') {
                    if (state.lastCommandSent == null || state.lastCommandSent > this.now() - 30000) {
                        return 0
                    }
                }
                switch (event.deviceId) {
                    case door1Sensor.id:
                    case door1Acceleration?.id:
                        let firstDoor = doors[0]
                        if (doors instanceof String) {
                            firstDoor = doors 
                        }
                        this.updateDoorStatus(firstDoor, door1Sensor, door1Acceleration, door1ThreeAxis, null)
                        break
                    case door2Sensor?.id:
                    case door2Acceleration?.id:
                        this.updateDoorStatus(doors[1], door2Sensor, door2Acceleration, door2ThreeAxis, null)
                        break
                    case door3Sensor?.id:
                    case door3Acceleration?.id:
                        this.updateDoorStatus(doors[2], door3Sensor, door3Acceleration, door3ThreeAxis, null)
                        break
                    case door4Sensor?.id:
                    case door4Acceleration?.id:
                        this.updateDoorStatus(doors[3], door4Sensor, door4Acceleration, door4ThreeAxis, null)
                        break
                    default: 
                    this.syncDoorsWithSensors()
                }
            

	})
