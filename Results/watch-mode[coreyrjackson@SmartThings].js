
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Vacation Settings'', section => {

        });


        page.section('Choose thermostat... 11/30/2015 9:56 AM ', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Vacation: Select switches to control...', section => {
            section.deviceSetting('VacationSwitches').capability(['switch']).name('');

        });


        page.section('Vacation: Turn them all on at...', section => {
            section.timeSetting('VacationstartTime').name('Turn On Time?');

        });


        page.section('Vacation: And turn them off at...', section => {
            section.timeSetting('VacationstopTime').name('Turn Off Time?');

        });


        page.section('Vacation: Thermostat Temp', section => {
            section.numberSetting('ThermostatTemp').name('Leave Heat Temp Degrees Fahrenheit?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

    })

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
        console.log("mode changed to ${event.value}")
        this.sendNotificationEvent("Watch Mode App: mode changed to ${event.value}")
        this.unschedule()
        switch (event.value) {
        case 'Vacation':
        this.SetVacation()
        break
        default:
        break
        }
        

	})
