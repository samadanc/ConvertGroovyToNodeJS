
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Settings', section => {
            section.deviceSetting('thermos').capability(['thermostat']).name('Thermostats:');
            section.numberSetting('lower').name('Lower than');
            section.numberSetting('setToHeat').name('Heat At:');
            section.numberSetting('resetTo').name('Reset to:');

        });


        page.section('Send Notifications?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermos, 'thermostat', 'outsideTemp', 'temperatureChangeHandler')

    })

    .subscribedEventHandler('temperatureChangeHandler', (context, event) => {
        
        let outsideTemp = event.value
        console.log("Temp Event: $evt
        Outside Temp: $outsideTemp")
        this.CheckTemperature(outsideTemp)
        

	})
