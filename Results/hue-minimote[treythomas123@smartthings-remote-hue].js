
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Hue bulbs', section => {
            section.deviceSetting('bulbs').capability(['colorControl']).name('');

        });


        page.section('Select remote', section => {
            section.deviceSetting('remote').capability(['button']).name('');

        });


        page.section('Select remote button...', section => {
            section.numberSetting('buttonNumber').name('Button Number');

        });


        page.section('Hue (0-100, or 101 for random color)', section => {
            section.numberSetting('hue').name('Hue');

        });


        page.section('Saturation (0-100)', section => {
            section.numberSetting('saturation').name('Saturation');

        });


        page.section('Level (0-100)', section => {
            section.numberSetting('level').name('Level');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.remote, 'button', 'button', 'buttonHandler')

    })

    .subscribedEventHandler('buttonHandler', (context, event) => {
        
        let pressedButtonNumber = (event.jsonData.buttonNumber as Integer)
        if (pressedButtonNumber == buttonNumber ) {
        this.setBulbs()
        }
        

	})
