
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery30Minutes('refreshAll', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'refreshAll')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'refreshAll')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'refreshAll')

    })

    .subscribedEventHandler('refreshAll', (context, event) => {
        
                this.getChildDevices().each({ 
                    this.syncDoorsWithSensors(it)
                })
            

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
                        let firstDoor = state.validatedDoors[0]
                        if (doors instanceof String) {
                            firstDoor = doors 
                        }
                        this.updateDoorStatus(firstDoor, door1Sensor, door1Acceleration, door1ThreeAxis, null)
                        break
                    case door2Sensor?.id:
                    case door2Acceleration?.id:
                        this.updateDoorStatus(state.validatedDoors[1], door2Sensor, door2Acceleration, door2ThreeAxis, null)
                        break
                    case door3Sensor?.id:
                    case door3Acceleration?.id:
                        this.updateDoorStatus(state.validatedDoors[2], door3Sensor, door3Acceleration, door3ThreeAxis, null)
                        break
                    case door4Sensor?.id:
                    case door4Acceleration?.id:
                        this.updateDoorStatus(state.validatedDoors[3], door4Sensor, door4Acceleration, door4ThreeAxis, null)
                        break
                    case door5Sensor?.id:
                    case door5Acceleration?.id:
                        this.updateDoorStatus(state.validatedDoors[4], door5Sensor, door5Acceleration, door5ThreeAxis, null)
                        break
                    case door6Sensor?.id:
                    case door6Acceleration?.id:
                        this.updateDoorStatus(state.validatedDoors[5], door6Sensor, door6Acceleration, door6ThreeAxis, null)
                        break
                    case door7Sensor?.id:
                    case door7Acceleration?.id:
                        this.updateDoorStatus(state.validatedDoors[6], door7Sensor, door7Acceleration, door7ThreeAxis, null)
                        break
                    case door8Sensor?.id:
                    case door8Acceleration?.id:
                        this.updateDoorStatus(state.validatedDoors[7], door8Sensor, door8Acceleration, door8ThreeAxis, null)
                        break
                    default: 
                    this.syncDoorsWithSensors()
                }
            

	})

    .scheduledEventHandler('refreshAll', (context, event) => {
        
                this.getChildDevices().each({ 
                    this.syncDoorsWithSensors(it)
                })
            

	})
