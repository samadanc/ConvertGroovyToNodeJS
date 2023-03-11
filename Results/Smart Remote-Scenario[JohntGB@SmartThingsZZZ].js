
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.numberSetting('A_levelDimOn').name('On Level');
            section.numberSetting('A_levelDimOff').name('Off Level');

        });


        page.section('', section => {
            section.enumSetting('A_color').name('Choose a color');
            section.numberSetting('A_levelDimOnColor').name('On Level');
            section.numberSetting('A_levelDimOffColor').name('Off Level');
            section.booleanSetting('A_calcOnColor').name('Calculate \');

        });


        page.section('', section => {
            section.deviceSetting('A_buttonDevice').capability(['button']).name('Button Controller');
            section.enumSetting('A_buttonPress').name('Which button...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.A_buttonDevice, 'button', 'button.pushed', 'buttonHandler_A')

    })

    .subscribedEventHandler('buttonHandler_A', (context, event) => {
        
        if (!A_mode || A_mode.contains(location.mode)) {
        let data = new JsonSlurper().parseText(event.data)
        let button = data.buttonNumber
        let remoteButton = (A_buttonPress as Integer)
        if (button == remoteButton ) {
        this.onEventA()
        }
        }
        

	})
