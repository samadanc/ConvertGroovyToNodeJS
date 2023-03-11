
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
                let sum = 0
                let count = 0
                Float average = 0
                for (let sensor : settings.temperatures) {
                    count += 1
                    sum += sensor.currentTemperature
                }
                average = sum / count .toFloat().round(1)
                console.log("average: $average")
                this.sendEvent(this.getChildDevice("${app.id}"), ['name': 'temperature', 'value': average ])
            

	})
