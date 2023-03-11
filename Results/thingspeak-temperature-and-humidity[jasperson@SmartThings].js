
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices', section => {
            section.deviceSetting('tempDev').capability(['temperatureMeasurement']).name('Temperature');
            section.deviceSetting('RHDev').capability(['relativeHumidityMeasurement']).name('Humidity');

        });


        page.section('ThingSpeak Channel ID', section => {
            section.numberSetting('channelID').name('Channel ID');

        });


        page.section('ThingSpeak Write Key', section => {
            section.textSetting('channelKey').name('Channel Key');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('handleSchedule', delay);

    })

    .scheduledEventHandler('handleSchedule', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.tempDev, 'temperatureMeasurement', currentValue)
    
        let tempField = state.fieldMap['temperature']
        
        context.api.devices.sendCommands(context.config.RHDev, 'relativeHumidityMeasurement', currentValue)
    
        let RHField = state.fieldMap['humidity']
        let url = "https://api.thingspeak.com/update?api_key=$channelKey&$tempField=$tempCurrent&$RHField=$RHCurrent"
        this.httpGet(url, { let response ->
        if (response.status != 200) {
        this.send("ThingSpeak logging failed, status = ${response.status}")
        }
        })
        

	})
