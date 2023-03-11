
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('tempChangeHandler', (context, event) => {
        
                Double newTemp 
                try {
                    newTemp = event.doubleValue
                    this.temperatureUpdate(newTemp)
                } 
                catch (let e) {
                    this.LOG("Invalid temp: $e", 2, null, 'warn')
                } 
            

	})
