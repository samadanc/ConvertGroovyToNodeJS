
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select which lights should be switched off how often when light level is above specified threshold.', section => {
            section.deviceSetting('bulbs').capability(['switch']).name('Which light bulbs?');
            section.deviceSetting('lightSensor').capability(['sensor']).name('Which light sensor?');
            section.enumSetting('interval').name('Patrol interval?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery3Hours('policeAction', delay);

        context.api.schedules.runEvery10Minutes('policeAction', delay);

        context.api.schedules.runEvery1Hour('policeAction', delay);

        context.api.schedules.runEvery15Minutes('policeAction', delay);

        context.api.schedules.runEvery30Minutes('policeAction', delay);

        context.api.schedules.runEvery5Minutes('policeAction', delay);

    })

    .scheduledEventHandler('policeAction', (context, event) => {
        
        let currentLux = lightSensor.currentIlluminance
        console.log("Patrol settings: currentLux=$currentLux, triggerLux=$triggerLux")
        if (currentLux >= triggerLux ) {
        console.log('it\'s sunny so time to switch off lights')
        bulbs?.each({
        console.log("${it.name} value ${it.currentSwitch}")
        if (it.currentSwitch == 'on') {
        it.off()
        }
        })
        } else {
        console.log('it\'s dark so keep those lights on')
        }
        

	})
