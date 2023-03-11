
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Temperature Sensors', section => {
            section.deviceSetting('sensors').capability(['temperatureMeasurement']).name('Temperature Sensors:');

        });


        page.section('Select Humidity Sensors', section => {
            section.deviceSetting('humsensors').capability(['relativeHumidityMeasurement']).name('Humidity Sensors:');

        });


        page.section('Select Switches', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches:');

        });


        page.section('Select Contact', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('pick a contact sensor');

        });


        page.section('Select Acceleration', section => {
            section.deviceSetting('accelerationSensor').capability(['accelerationSensor']).name('Sensors:');

        });


        page.section('Select Battery', section => {
            section.deviceSetting('battery').capability(['battery']).name('Sensors with Battery:');

        });


        page.section('Select Power Meters', section => {
            section.deviceSetting('power').capability(['powerMeter']).name('Power Meter Sensors:');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.battery, 'battery', 'battery', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.accelerationSensor, 'accelerationSensor', 'acceleration', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'temperatureMeasurement', 'temperature', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.humsensors, 'relativeHumidityMeasurement', 'humidity', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.power, 'powerMeter', 'power', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        let evtValue
        let binValue = null
        try {
        evtValue = event.doubleValue
        }
        catch (let e) {
        evtValue = event.stringValue
        }
        switch ( evtValue ) {
        case ['open', 'inactive', 'off']:
        binValue = 0.0
        break
        case ['closed', 'active', 'on']:
        binValue = 1.0
        break
        }
        try {
        let data = ['date': event.date.getTime(), 'name': event.displayName, 'source': event.source, 'event': ['sensor': event.name, 'value': evtValue , 'binValue': binValue , 'unit': event.unit]]
        this.sendInflux(data)
        }
        catch (let e) {
        console.log("Trying to build data for ${event.name} threw an exception: $e")
        }
        

	})
