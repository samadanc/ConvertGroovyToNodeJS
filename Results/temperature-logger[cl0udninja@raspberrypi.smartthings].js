
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Temperature Sensors', section => {
            section.deviceSetting('tempSensors').capability(['temperatureMeasurement']).name('Temperature Sensors');

        });


        page.section('Enter endpoint URI (ie.: http:mydomain.com:8080/api/temprecord', section => {
            section.textSetting('ip').name('Endpoint IP');
            section.numberSetting('port').name('Endpoint port');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery30Minutes('reportTemp', delay);

    })

    .scheduledEventHandler('reportTemp', (context, event) => {
        
        for (let tempSensor : tempSensors ) {
        log.trace("${tempSensor.getDisplayName()} - ${tempSensor.currentValue(temperature)}")
        let result = new physicalgraph.device.HubAction(['method': 'POST', 'path': '/api/temprecord', 'body': "{"name":"${tempSensor.getDisplayName()}", "temperature":${tempSensor.currentValue(temperature)}}", 'headers': ['HOST': "$ip:$port", 'Content-Type': 'application/json']], null, ['callback': parse ])
        console.log(result.toString())
        this.sendHubCommand(result)
        }
        

	})
