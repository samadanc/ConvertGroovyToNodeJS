
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Vacation mode change', section => {
            section.numberSetting('objHour').name('After __ hours in Away Mode switch to Vacation Mode');

        });


        page.section('Lighting', section => {
            section.deviceSetting('objSwitch').capability(['switch']).name('Select which lights you want to turn on in Vacation Mode.');
            section.numberSetting('objBrightness').name('Choose their level of brigthtness.');

        });


        page.section('Timing', section => {
            section.numberSetting('objTurnOnDelay').name('How many minutes after sunset to wait before turning on the lights?');
            section.numberSetting('objTurnOffDelay').name('How many hours to leave the lights on?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('handlerLightTime', delay);

    })

    .scheduledEventHandler('handlerLightTime', (context, event) => {
        
        if (location.mode == 'Vacation') {
        let sunsetTurnOnTime = this.getSunriseAndSunset(['sunsetOffset': "$objTurnOnDelay"]).sunset
        let sunsetTurnOffTime = this.getSunriseAndSunset(['sunsetOffset': "${(objTurnOffDelay * 60)}"]).sunset
        this.runOnce(sunsetTurnOnTime, handlerLightsOn)
        this.runOnce(sunsetTurnOffTime, handlerLightsOff)
        }
        

	})
