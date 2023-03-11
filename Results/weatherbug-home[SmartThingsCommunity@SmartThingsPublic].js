
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select thermostats', section => {
            section.deviceSetting('thermostatDevice').capability(['thermostat']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatDevice, 'thermostat', 'coolingSetpoint', 'pushLatest')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatDevice, 'thermostat', 'temperature', 'pushLatest')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatDevice, 'thermostat', 'thermostatFanMode', 'pushLatest')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatDevice, 'thermostat', 'thermostatSetpoint', 'pushLatest')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatDevice, 'thermostat', 'thermostatMode', 'pushLatest')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatDevice, 'thermostat', 'heatingSetpoint', 'pushLatest')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatDevice, 'thermostat', 'thermostatOperatingState', 'pushLatest')

    })

    .subscribedEventHandler('pushLatest', (context, event) => {
        
        let unixTime = ((int) new Date().getTime() / 1000)
        let device = thermostatDevice.find({
        it.id == event.deviceId
        })
        let postParams = ['uri': 'https://smartthingsrec.api.earthnetworks.com/api/v1/receive', 'body': ['DeviceId': event.deviceId, 'LocationId': location.id, 'ReportType': 2, 'ReportList': [['Key': 'Temperature', 'Value': this.GetOrDefault(device, 'temperature')], ['Key': 'ThermostatSetpoint', 'Value': this.GetOrDefault(device, 'thermostatSetpoint')], ['Key': 'CoolingSetpoint', 'Value': this.GetOrDefault(device, 'coolingSetpoint')], ['Key': 'HeatingSetpoint', 'Value': this.GetOrDefault(device, 'heatingSetpoint')], ['Key': 'ThermostatMode', 'Value': this.GetOrDefault(device, 'thermostatMode')], ['Key': 'ThermostatFanMode', 'Value': this.GetOrDefault(device, 'thermostatFanMode')], ['Key': 'ThermostatOperatingState', 'Value': this.GetOrDefault(device, 'thermostatOperatingState')]], 'UnixTime': unixTime ]]
        console.log(postParams)
        this.sendToWeatherBug(postParams)
        

	})
