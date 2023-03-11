
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Thermostat to control', section => {
            section.deviceSetting('thermo').capability(['thermostat']).name('Which Thermostat?');

        });


        page.section('More options', section => {
            section.booleanSetting('pushbool').name('Send a push notification?');
            section.enumSetting('days').name('Set for specific day(s) of the week');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

    })

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
        console.log(event.value)
        let thermoSensorStateold = thermo.currentThermostatMode
        console.log("Old mode is $thermoSensorStateold")
        console.log("Days selected $days")
        let temp = DaysOK
        console.log("Days ok? $temp")
        switch (event.value) {
        case 'Away':
        thermo?.setThermostatMode('Economy')
        console.log('Setting to Eco as AWAY')
        this.notifications('economy', thermoSensorStateold)
        break
        case 'Home':
        thermo?.setThermostatMode('Auto')
        console.log('Setting to Auto as HOME')
        this.notifications('auto', thermoSensorStateold)
        break
        case 'Holiday':
        thermo?.setThermostatMode('Off')
        console.log('Setting to Off as HOLIDAY')
        this.notifications('off', thermoSensorStateold)
        break
        default:
        thermo?.setThermostatMode('Auto')
        console.log('Setting to Auto as Default')
        this.notifications('auto', thermoSensorStateold)
        }
        let thermoSensorStatenew = thermo.currentThermostatMode
        console.log("New mode is $thermoSensorStatenew")
        

	})
