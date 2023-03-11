
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow external service to control these things...', section => {
            section.deviceSetting('locks').capability(['lock']).name('');
            section.deviceSetting('thermostatDevice').capability(['thermostatMode']).name('Select Thermostats');
            section.deviceSetting('waterLeakageSensors').capability(['waterSensor']).name('Select Water Leak Sensors');
            section.deviceSetting('doorsensors').capability(['contactSensor']).name('Select Door Sensors');
            section.deviceSetting('doorControl').capability(['doorControl']).name('Select Door Opener');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatDevice, 'thermostatMode', 'thermostat', 'thermostatDeviceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.doorsensors, 'contactSensor', 'contact', 'doorSensorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'tamper', 'lockHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'battery', 'batteryHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'codeChanged', 'lockHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'lockHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.doorControl, 'doorControl', 'door', 'doorControlHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'codeReport', 'lockHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.waterLeakageSensors, 'waterSensor', 'water', 'waterLeakSensorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'reportAllCodes', 'lockHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.doorsensors, 'contactSensor', 'status', 'doorSensorHandler')

    })

    .subscribedEventHandler('doorSensorHandler', (context, event) => {
        
        console.log('doorSensorHandler is invoke')
        let evntDevice = event.getDevice()
        console.log("doorSensorHandler Device id is : ${evntDevice.getId()}")
        console.log("doorSensorHandler Hub name is : ${evntDevice.hub.name}")
        console.log("doorSensorHandler Hub id is : ${evntDevice.hub.id}")
        console.log("doorSensorHandler The device id for this event: ${event.deviceId}")
        console.log("doorSensorHandler event display name: ${event.displayName}")
        console.log("doorSensorHandler This event name is ${event.name}")
        console.log("doorSensorHandler The value of this event is different from its previous value: ${event.isStateChange()}")
        console.log("doorSensorHandler Date: ${event.date}")
        let deviceId = evntDevice.getId()
        console.log("doorSensorHandler Event happened on sensor $deviceId")
        console.log("doorSensorHandler event data ${event.data}")
        let paramsEvent = ['uri': 'https://api.getlynx.co/ProdV1.1/stwebhooks/handleDoorSensorEvent', 'query': ['deviceId': event.deviceId, 'date': event.date, 'name': event.name, 'value': event.value, 'id': String.valueOf(event.id), 'displayName': event.displayName], 'contentType': 'application/json']
        console.log("webhook call $paramsEvent")
        try {
        asynchttp_v1.get('responseHandlerMethod', paramsEvent)
        }
        catch (let e) {
        console.log("something went wrong: $e")
        }
        

	})

    .subscribedEventHandler('thermostatDeviceHandler', (context, event) => {
        
        console.log('thermostatDeviceHandler is invoke')
        let evntDevice = thermostatEvent.getDevice()
        console.log("Thermostats events belongs to Device id is : ${evntDevice.getId()}")
        

	})

    .subscribedEventHandler('waterLeakSensorHandler', (context, event) => {
        
        console.log('waterLeakSensorHandler is invoke')
        let evntDevice = event.getDevice()
        console.log("waterLeakSensorHandler Device id is : ${evntDevice.getId()}")
        console.log("waterLeakSensorHandler Hub name is : ${evntDevice.hub.name}")
        console.log("waterLeakSensorHandler Hub id is : ${evntDevice.hub.id}")
        console.log("waterLeakSensorHandler The device id for this event: ${event.deviceId}")
        console.log("waterLeakSensorHandler event display name: ${event.displayName}")
        console.log("waterLeakSensorHandler This event name is ${event.name}")
        console.log("waterLeakSensorHandler The value of this event is different from its previous value: ${event.isStateChange()}")
        console.log("waterLeakSensorHandler Date: ${event.date}")
        console.log("waterLeakSensorHandler event current water status ${evntDevice.currentWater}")
        console.log("waterLeakSensorHandler event current battery level ${evntDevice.currentBattery}")
        let water = evntDevice.currentWater
        let battery = evntDevice.currentBattery
        let temperature = evntDevice.currentTemperature
        let lock_id = evntDevice.getId()
        console.log("waterLeakSensorHandler Event happened on water leak sensor $lock_id")
        console.log("waterLeakSensorHandler event data ${event.data}")
        let jsonData = '{"water":"' + water + '","battery":' + battery + ',"temperature":' + temperature + ',"eventTypeId":158}'
        let paramsEvent2 = ['uri': 'https://api.getlynx.co/ProdV1.1/webhook/smartthings', 'query': ['lockId': lock_id , 'descriptionText': event.descriptionText, 'date': event.date, 'name': event.name, 'source': event.source, 'id': String.valueOf(event.id), 'data': jsonData ], 'contentType': 'application/json']
        console.log("webhook call for sqs endpoint $paramsEvent2")
        try {
        asynchttp_v1.get('responseHandlerMethod', paramsEvent2)
        }
        catch (let e) {
        console.log("something went wrong: $e")
        }
        

	})

    .subscribedEventHandler('doorControlHandler', (context, event) => {
        
        console.log('doorControlHandler is invoke')
        console.log("Webhook event data $evt")
        console.log("The device id for this event: ${event.deviceId}")
        console.log("data: ${event.data}")
        console.log("date ${event.date}")
        console.log("DateValue ${event.dateValue}")
        console.log("Description: ${event.description}")
        console.log("descriptionText ${event.descriptionText}")
        console.log("Device ${event.device}")
        console.log("event display name: ${event.displayName}")
        console.log("deviceId ${event.deviceId}")
        console.log("id ${event.id}")
        try {
        console.log("The jsonValue of this event is ${event.jsonValue}")
        }
        catch (let e) {
        console.log("Trying to get the jsonValue for ${event.name} threw an exception", e)
        }
        console.log("locationId ${event.locationId}")
        console.log("name ${event.name}")
        console.log("source ${event.source}")
        console.log("stringValue ${event.stringValue}")
        console.log("value ${event.value}")
        

	})

    .subscribedEventHandler('batteryHandler', (context, event) => {
        
        console.log('batteryHandler is invoke')
        let evntDevice = event.getDevice()
        console.log("Device id is : ${evntDevice.getId()}")
        console.log("Hub name is : ${evntDevice.hub.name}")
        console.log("Hub id is : ${evntDevice.hub.id}")
        console.log("The device id for this event: ${event.deviceId}")
        console.log("event display name: ${event.displayName}")
        console.log("This event name is ${event.name}")
        console.log("The value of this event is different from its previous value: ${event.isStateChange()}")
        console.log("Date: ${event.date}")
        let lock_id = evntDevice.getId()
        console.log("Event happened on lock $lock_id")
        console.log("battery handler event data ${event.data}")
        let slurper = new groovy.json.JsonSlurper()
        let result = slurper.parseText(event.data)
        console.log("battery handler vk data ${result.vkData}")
        if (result != null) {
        if (result.vkData != null) {
        let eventData = groovy.json.JsonOutput.toJson(result.vkData)
        let paramsEvent2 = ['uri': 'https://api.getlynx.co/ProdV1.1/webhook/smartthings', 'query': ['lockId': event.deviceId, 'descriptionText': event.descriptionText, 'date': event.date, 'name': event.name, 'source': event.source, 'id': String.valueOf(event.id), 'data': eventData ], 'contentType': 'application/json']
        console.log("webhook call for sqs endpoint $paramsEvent2")
        try {
        asynchttp_v1.get('responseHandlerMethod', paramsEvent2)
        }
        catch (let e) {
        console.log("something went wrong: $e")
        }
        }
        }
        

	})

    .subscribedEventHandler('lockHandler', (context, event) => {
        
        console.log('lockHandler is invoke')
        let evntDevice = event.getDevice()
        console.log("Device id is : ${evntDevice.getId()}")
        console.log("Hub name is : ${evntDevice.hub.name}")
        console.log("Hub id is : ${evntDevice.hub.id}")
        console.log("The device id for this event: ${event.deviceId}")
        console.log("event display name: ${event.displayName}")
        console.log("This event name is ${event.name}")
        console.log("The value of this event is different from its previous value: ${event.isStateChange()}")
        console.log("Date: ${event.date}")
        let lock_id = evntDevice.getId()
        console.log("Event happened on lock $lock_id")
        let paramsEvent2 = ['uri': 'https://api.getlynx.co/ProdV1.1/webhook/smartthings', 'query': ['lockId': event.deviceId, 'descriptionText': event.descriptionText, 'date': event.date, 'name': event.name, 'source': event.source, 'id': String.valueOf(event.id), 'data': event.data], 'contentType': 'application/json']
        console.log("webhook call for sqs endpoint $paramsEvent2")
        try {
        asynchttp_v1.get('responseHandlerMethod', paramsEvent2)
        }
        catch (let e) {
        console.log("something went wrong: $e")
        }
        

	})
