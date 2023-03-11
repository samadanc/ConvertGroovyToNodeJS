
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('hournotification', delay);

        context.api.schedules.runEvery5Minutes('refreshDevices', delay);

    })

    .subscribedEventHandler('eHumidityHandler', (context, event) => {
        
                let currentHumidity = event.device.currentState('humidity').value
                let currentPod = event.device.displayName
                let hour = new Date()
                if (this.inDateThreshold(evt, 'humidity') == true) {
                    if (maxHumidity != null) {
                        if (currentHumidity.toDouble() > maxHumidity ) {
                            let stext = "Humidity level is too high at $currentPod : $currentHumidity"
                            this.sendEvent(['name': 'lastHumidityPush', 'value': "$stext", 'displayed': 'true', 'descriptionText': "$stext"])
                            this.sendPush(stext)
                            state.lastHumidityPush = hour 
                        }
                    }
                    if (minHumidity != null) {
                        if (currentHumidity.toDouble() < minHumidity ) {
                            let stext = "Humidity level is too low at $currentPod : $currentHumidity"
                            this.sendEvent(['name': 'lastHumidityPush', 'value': "$stext", 'displayed': 'true', 'descriptionText': "$stext"])
                            this.sendPush(stext)
                            state.lastHumidityPush = hour 
                        }
                    }
                }
            

	})

    .subscribedEventHandler('eTemperatureHandler', (context, event) => {
        
                let currentTemperature = event.device.currentState('temperature').value
                let currentPod = event.device.displayName
                let hour = new Date()
                if (this.inDateThreshold(evt, 'temperature') == true) {
                    if (maxTemperature != null) {
                        if (currentTemperature.toDouble() > maxTemperature ) {
                            let stext = "Temperature level is too high at $currentPod : $currentTemperature"
                            this.sendEvent(['name': 'lastTemperaturePush', 'value': "$stext", 'displayed': 'true', 'descriptionText': "$stext"])
                            this.sendPush(stext)
                            state.lastTemperaturePush = hour 
                        }
                    }
                    if (minTemperature != null) {
                        if (currentTemperature.toDouble() < minTemperature ) {
                            let stext = "Temperature level is too low at $currentPod : $currentTemperature"
                            this.sendEvent(['name': 'lastTemperaturePush', 'value': "$stext", 'displayed': 'true', 'descriptionText': "$stext"])
                            this.sendPush(stext)
                            state.lastTemperaturePush = hour 
                        }
                    }
                }
            

	})

    .scheduledEventHandler('refreshDevices', (context, event) => {
        
                console.log('refreshDevices() called')
                let devices = this.getAllChildDevices()
                devices.each({ let d ->
                    console.log("Calling refresh() on device: ${d.id}")
                    d.refresh()
                })
            

	})

    .scheduledEventHandler('hournotification', (context, event) => {
        
                let hour = new Date()
                let curHour = hour.format('HH:mm', location.timeZone)
                let curDay = hour.format('EEEE', location.timeZone)
                let stext = ''
                if (startTimeEvent && endTimeEvent ) {
                    let minHour = new Date().parse(this.smartThingsDateFormat(), startTimeEvent)
                    let endHour = new Date().parse(this.smartThingsDateFormat(), endTimeEvent)
                    let minHourstr = minHour.format('HH:mm', location.timeZone)
                    let maxHourstr = endHour.format('HH:mm', location.timeZone)
                    if (curHour >= minHourstr && curHour <= maxHourstr ) {
                        let devices = this.getAllChildDevices()
                        devices.each({ let d ->
                            console.log("Notification every hour for device: ${d.id}")
                            let currentPod = d.displayName
                            let currentTemperature = d.currentState('temperature').value
                            let currentHumidity = d.currentState('humidity').value
                            let currentBattery = d.currentState('voltage').value
                            let sunit = d.currentState('temperatureUnit').value
                            stext = "$currentPod - Temperature: $currentTemperature $sunit Humidity: $currentHumidity% Battery: $currentBattery"
                            this.sendPush(stext)
                        })
                    }
                } else {
                    let devices = this.getAllChildDevices()
                    devices.each({ let d ->
                        console.log("Notification every hour for device: ${d.id}")
                        let currentPod = d.displayName
                        let currentTemperature = d.currentState('temperature').value
                        let currentHumidity = d.currentState('humidity').value
                        let currentBattery = d.currentState('voltage').value
                        let sunit = d.currentState('temperatureUnit').value
                        stext = "$currentPod - Temperature: $currentTemperature $sunit Humidity: $currentHumidity% Battery: $currentBattery"
                        this.sendPush(stext)
                    })
                }
            

	})
