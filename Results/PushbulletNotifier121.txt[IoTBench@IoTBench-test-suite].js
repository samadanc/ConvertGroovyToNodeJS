
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pushbullet device', section => {

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        this.TRACE("handler(evt: $evt)")
        if (theCapability == 'temperatureMeasurement') {
        if (aboveOrBelow == 'Above' && event.numericValue > temperatureThreshold ) {
        this.checkFrequency(evt)
        } else {
        if (aboveOrBelow == 'Below' && event.numericValue < temperatureThreshold ) {
        this.checkFrequency(evt)
        }
        }
        } else {
        this.checkFrequency(evt)
        }
        

	})
