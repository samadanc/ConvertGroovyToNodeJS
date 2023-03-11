
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('plantlinksensors').capability(['sensor']).name('Select PlantLink sensors to connect');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.plantlinksensors, 'sensor', 'battery_status', 'batteryHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.plantlinksensors, 'sensor', 'moisture_status', 'moistureHandler')

    })

    .subscribedEventHandler('batteryHandler', (context, event) => {
        
        let expected_plant_name = "SmartThings - ${event.displayName}"
        let device_serial = this.getDeviceSerialFromEvent(event)
        if (!(atomicState.attached_sensors.containsKey(device_serial))) {
        this.dock_sensor(device_serial, expected_plant_name)
        } else {
        let measurement_post_params = ['uri': 'https://oso-tech.appspot.com', 'path': "/api/v1/smartthings/links/$device_serial/measurements", 'headers': ['Content-Type': 'application/json', 'Authorization': "Bearer ${atomicState.authToken}"], 'contentType': 'application/json', 'body': event.value]
        this.httpPost(measurement_post_params, { let measurement_post_response ->
        this.parse_api_response(measurement_post_response, 'creating battery measurement')
        })
        }
        

	})

    .subscribedEventHandler('moistureHandler', (context, event) => {
        
        console.log("Received event value on moisture handler ${event.value}")
        let expected_plant_name = "SmartThings - ${event.displayName}"
        let device_serial = this.getDeviceSerialFromEvent(event)
        if (!(atomicState.attached_sensors.containsKey(device_serial))) {
        this.dock_sensor(device_serial, expected_plant_name)
        } else {
        let measurement_post_params = ['uri': 'https://oso-tech.appspot.com', 'path': "/api/v1/smartthings/links/$device_serial/measurements", 'headers': ['Content-Type': 'application/json', 'Authorization': "Bearer ${atomicState.authToken}"], 'contentType': 'application/json', 'body': event.value]
        this.httpPost(measurement_post_params, { let measurement_post_response ->
        if (this.parse_api_response(measurement_post_response, 'creating moisture measurement') && measurement_post_response.data.size() > 0) {
        let measurement = measurement_post_response.data[0]
        let plant = measurement.plant
        this.checkAndUpdatePlantIfNeeded(plant, expected_plant_name)
        plantlinksensors.each({ let sensor_device ->
        if (sensor_device.id == event.deviceId) {
        sensor_device.setStatusIcon(plant.status)
        if (plant.last_measurements && plant.last_measurements[0].plant_fuel_level) {
        sensor_device.setPlantFuelLevel(plant.last_measurements[0].plant_fuel_level * 100)
        }
        if (plant.last_measurements && plant.last_measurements[0].battery) {
        sensor_device.setBatteryLevel(plant.last_measurements[0].battery * 100)
        }
        }
        })
        }
        })
        }
        

	})
