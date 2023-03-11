
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select thermostat to control...', section => {
            section.deviceSetting('Thermostat').capability(['thermostat']).name('');

        });


        page.section('Turn it up at...', section => {
            section.timeSetting('startTime').name('Turn Up Time?');

        });


        page.section('High temp 80 - 106 ...', section => {
            section.numberSetting('highTemp').name('High Temp?');

        });


        page.section('And turn it down at...', section => {
            section.timeSetting('stopTime').name('Turn Down Time?');

        });


        page.section('Low temp 70 - 90 ...', section => {
            section.numberSetting('lowTemp').name('Low Temp?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('startTimerCallback', delay);

        context.api.schedules.schedule('stopTimerCallback', delay);

    })

    .scheduledEventHandler('startTimerCallback', (context, event) => {
        
        console.log('Turning up the temperature')
        thermostat.setHeatingSetpoint(highTemp)
        

	})

    .scheduledEventHandler('stopTimerCallback', (context, event) => {
        
        console.log('Turning down the temperature')
        thermostat.setHeatingSetpoint(lowTemp)
        

	})
