
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select a humidity sensor', section => {
            section.deviceSetting('humiditysensor').capability(['relativeHumidityMeasurement']).name('Humidity sensor');

        });


        page.section('Select a switch', section => {
            section.deviceSetting('fanswitch').capability(['switch']).name('Switch to turn on');

        });


        page.section('Input humidity high point', section => {
            section.numberSetting('maxhumidity').name('Humidity threshold');

        });


        page.section('Input fan run time in minutes', section => {
            section.numberSetting('fantimer').name('Fan timer');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.humiditysensor, 'relativeHumidityMeasurement', 'humidity', 'checkTurnOn')

    })

    .subscribedEventHandler('checkTurnOn', (context, event) => {
        
        console.log("Unit reads ${event.value} and threshold is set to $maxhumidity")
        let unitvalue = Double.parseDouble("${event.value}")
        if (unitvalue >= maxhumidity ) {
        console.log("Turning on the switch and setting timer to $fantimer minutes.")
        
        context.api.devices.sendCommands(context.config.fanswitch, 'switch', on)
    
        this.runIn(fantimer * 60, turnoff)
        } else {
        console.log('Humidity test: pass')
        }
        

	})
