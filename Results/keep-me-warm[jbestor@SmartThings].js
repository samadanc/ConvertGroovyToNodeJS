
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the temperature...', section => {
            section.deviceSetting('tempSensor').capability(['temperatureMeasurement']).name('');

        });


        page.section('When the temperature drops below...', section => {
            section.numberSetting('coldTemp').name('Temperature?');

        });


        page.section('When the temperature climbs above...', section => {
            section.numberSetting('hotTemp').name('Temperature?');

        });


        page.section('Control a heater...', section => {
            section.deviceSetting('heaterSwitch').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.tempSensor, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        log.trace("temperature: ${event.value}, $evt")
        let currentTemp = event.doubleValue
        let tooCold = coldTemp
        let tooHot = hotTemp
        let mySwitch = settings.heaterSwitch
        let switchState = heaterSwitch.currentSwitch
        console.log("Switch $switchState")
        if (currentTemp <= tooCold ) {
        if (switchState == 'on') {
        console.log("Current Temp is $currentTemp, $mySwitch is already on")
        } else {
        console.log("Current temp is $currentTemp, Turning on $mySwitch")
        this.sendNotificationEvent("Current Temp is $currentTemp, Turning on $mySwitch")
        }
        heaterSwitch?.on()
        }
        if (currentTemp >= tooHot ) {
        if (switchState == 'off') {
        console.log("Current Temp is $currentTemp, $mySwitch is already off")
        } else {
        console.log("Current Temp is $currentTemp, Turning off $mySwitch")
        this.sendNotificationEvent("Current Temp is $currentTemp, Turning off $mySwitch")
        }
        heaterSwitch?.off()
        }
        

	})
