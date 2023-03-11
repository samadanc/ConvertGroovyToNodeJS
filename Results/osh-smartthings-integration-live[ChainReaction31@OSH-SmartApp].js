
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('scheduleHandler', (context, event) => {
        
                let sensorMap = atomicState.URIs
                let capabilityConversion = atomicState.capConversion
                [ motiondevices , humiditydevices , leakdevices , thermodevices , tempdevices , contactdevices , lockdevices , alarmdevices , switchdevices , presencedevices , smokedevices , buttondevices ].each({ let n ->
                    if (n != null) {
                        for (let sensor : n ) {
                            for (let capability : sensorMap.getAt(this.removeSpaces(sensor.getLabel()))) {
                                let currDate = new Date(this.now())
                                String stringDate = currDate 
                                let time = this.getOSHDate(stringDate)
                                String dataString = sensor.currentValue(capabilityConversion.getAt(capability.getKey()))
                                try {
                                    let request = ['uri': endpoint , 'body': '<sos:InsertResult xmlns:sos="http://www.opengis.net/sos/2.0" service="SOS" version="2.0.0">\n    						        <sos:template>' + capability.getValue() + '</sos:template>\n   							        <sos:resultValues>' + time + ',' + dataString + '</sos:resultValues>\n    						        </sos:InsertResult>', 'requestContentType': 'application/xml']
                                    this.httpPost(request, { let resp2 ->
                                        resp2.headers.each({ 
                                        })
                                    })
                                } 
                                catch (let e) {
                                    log.error("Sending Data failed: $e")
                                } 
                            }
                        }
                    }
                })
            

	})
