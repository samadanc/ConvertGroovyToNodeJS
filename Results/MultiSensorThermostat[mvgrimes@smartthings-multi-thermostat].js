
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose thermostat... ', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Target Temps...', section => {
            section.deviceSetting('targetControl').capability(['thermostat']).name('');

        });


        page.section('Heat setting...', section => {
            section.enumSetting('heatingFunction').name('Combine via (default: min)');

        });


        page.section('Air conditioning setting...', section => {
            section.enumSetting('coolingFunction').name('Combine via (default: max)');

        });


        page.section('Optionally choose temperature sensors to use instead of the thermostat\'s... ', section => {
            section.deviceSetting('sensors').capability(['temperatureMeasurement']).name('Temp Sensors');

        });


        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('publicEvaluate', delay);

    })

    .scheduledEventHandler('publicEvaluate', (context, event) => {
        
        sensors.each({
        if (it.hasCapability('Polling')) {
        console.log("polling $it")
        it.poll()
        } else {
        if (it.hasCapability('Refresh')) {
        console.log("refreshing $it")
        it.refresh()
        }
        }
        })
        this.evaluate()
        

	})
