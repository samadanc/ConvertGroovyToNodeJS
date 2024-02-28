
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('On Time', section => {
            section.timeSetting('onTime').name('When?');

        });


        page.section('Off Time', section => {
            section.timeSetting('offTime').name('When?');

        });


        page.section('These Dimming light(s)', section => {
            section.deviceSetting('MultilevelSwitch').capability(['switchLevel']).name('');

        });


        page.section('How Bright?', section => {
            section.numberSetting('number').name('Percentage, 0-99');

        });


        page.section('These Non Dimming light(s)', section => {
            section.deviceSetting('switches1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('turnlighton', delay);

        context.api.schedules.schedule('turnlightoff', delay);

    })

    .scheduledEventHandler('turnlighton', (context, event) => {
        
        console.log('Turning on switches')
        settings.MultilevelSwitch?.setLevel(number)
        switches1?.on()
        

	})

    .scheduledEventHandler('turnlightoff', (context, event) => {
        
        console.log('Turning off switches')
        settings.MultilevelSwitch?.off()
        switches1?.off()
        

	})

        console.log("{{interesting}}")

