
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Device Configuration', section => {
            section.enumSetting('mechanism').name('Turn on or off at low temperature?');
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Temperature Configuation', section => {
            section.numberSetting('minTemp').name('Low Temperature (F*)');
            section.numberSetting('maxTemp').name('High Temperature (F*)');

        });


        page.section('Location', section => {
            section.textSetting('zipCode').name('Zip Code for Weather (leave blank to autodetect)');
            section.enumSetting('pollRate').name('Update Weather Every (1 hour default)');

        });


        page.section(''Extras'', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery30Minutes('checkTemperature', delay);

        context.api.schedules.runEvery15Minutes('checkTemperature', delay);

        context.api.schedules.runEvery3Hours('checkTemperature', delay);

        context.api.schedules.runEvery5Minutes('checkTemperature', delay);

        context.api.schedules.runEvery1Hour('checkTemperature', delay);

        context.api.schedules.runEvery10Minutes('checkTemperature', delay);

    })

    .scheduledEventHandler('checkTemperature', (context, event) => {
        
        let currTemp = this.getCurrTemp()
        if (mechanism == 'On') {
        console.log('Temperature Based Device Control: Using on at low temperatures')
        if (currTemp <= minTemp ) {
        console.log("Temperature Based Device Control: currTemp $currTemp is less than min on temp $minTemp. Ensuring devices are on.")
        this.deviceHandler('on')
        } else {
        if (currTemp > maxTemp ) {
        console.log("Temperature Based Device Control: currTemp $currTemp is greater than min off temp $maxTemp. Ensuring devices are off.")
        this.deviceHandler('off')
        } else {
        console.log("Temperature Based Device Control: currTemp $currTemp is between setpoints $minTemp and $maxTemp. Doing nothing.")
        }
        }
        } else {
        if (mechanism == 'Off') {
        console.log('Temperature Based Device Control: Using off at low temperatures')
        if (currTemp <= minTemp ) {
        console.log("Temperature Based Device Control: currTemp $currTemp is less than min off temp $minTemp. Ensuring devices are off.")
        this.deviceHandler('off')
        } else {
        if (currTemp > maxTemp ) {
        console.log("Temperature Based Device Control: currTemp $currTemp is greater than min on temp $maxTemp. Ensuring devices are on.")
        this.deviceHandler('on')
        } else {
        console.log("Temperature Based Device Control: currTemp $currTemp is between setpoints $minTemp and $maxTemp. Doing nothing.")
        }
        }
        }
        }
        

	})
