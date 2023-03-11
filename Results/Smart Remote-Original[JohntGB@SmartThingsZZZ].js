
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section(''Instructions'', section => {

        });


        page.section('', section => {
            section.numberSetting('A_levelDimOn').name('On Level');
            section.numberSetting('A_levelDimOff').name('Off Level');

        });


        page.section('', section => {
            section.numberSetting('B_levelDimOn').name('On Level');
            section.numberSetting('B_levelDimOff').name('Off Level');

        });


        page.section('', section => {
            section.numberSetting('C_levelDimOn').name('On Level');
            section.numberSetting('C_levelDimOff').name('Off Level');

        });


        page.section('', section => {
            section.numberSetting('D_levelDimOn').name('On Level');
            section.numberSetting('D_levelDimOff').name('Off Level');

        });


        page.section('', section => {
            section.enumSetting('A_color').name('Choose a color');
            section.numberSetting('A_levelDimOnColor').name('On Level');
            section.numberSetting('A_levelDimOffColor').name('Off Level');
            section.booleanSetting('A_calcOnColor').name('Calculate \');

        });


        page.section('', section => {
            section.enumSetting('B_color').name('Choose a color');
            section.numberSetting('B_levelDimOnColor').name('On Level');
            section.numberSetting('B_levelDimOffColor').name('Off Level');
            section.booleanSetting('B_calcOnColor').name('Calculate \');

        });


        page.section('', section => {
            section.enumSetting('C_color').name('Choose a color');
            section.numberSetting('C_levelDimOnColor').name('On Level');
            section.numberSetting('C_levelDimOffColor').name('Off Level');
            section.booleanSetting('C_calcOnColor').name('Calculate \');

        });


        page.section('', section => {
            section.enumSetting('D_color').name('Choose a color');
            section.numberSetting('D_levelDimOnColor').name('On Level');
            section.numberSetting('D_levelDimOffColor').name('Off Level');
            section.booleanSetting('D_calcOnColor').name('Calculate \');

        });


        page.section('', section => {
            section.deviceSetting('A_buttonDevice').capability(['button']).name('Button Controller');
            section.enumSetting('A_buttonPress').name('Which button...');

        });


        page.section('', section => {
            section.deviceSetting('B_buttonDevice').capability(['button']).name('Button Controller');
            section.enumSetting('B_buttonPress').name('Which button...');

        });


        page.section('', section => {
            section.deviceSetting('C_buttonDevice').capability(['button']).name('Button Controller');
            section.enumSetting('C_buttonPress').name('Which button...');

        });


        page.section('', section => {
            section.deviceSetting('D_buttonDevice').capability(['button']).name('Button Controller');
            section.enumSetting('D_buttonPress').name('Which button...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.B_buttonDevice, 'button', 'button.pushed', 'buttonHandler_B')

        await context.api.subscriptions.subscribeToDevices(context.config.D_buttonDevice, 'button', 'button.pushed', 'buttonHandler_D')

        await context.api.subscriptions.subscribeToDevices(context.config.A_buttonDevice, 'button', 'button.pushed', 'buttonHandler_A')

        await context.api.subscriptions.subscribeToDevices(context.config.C_buttonDevice, 'button', 'button.pushed', 'buttonHandler_C')

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

    .subscribedEventHandler('buttonHandler_B', (context, event) => {
        
        if (!B_mode || B_mode.contains(location.mode)) {
        let data = new JsonSlurper().parseText(event.data)
        let button = data.buttonNumber
        let remoteButton = (B_buttonPress as Integer)
        if (button == remoteButton ) {
        this.onEventB()
        }
        }
        

	})

    .subscribedEventHandler('buttonHandler_D', (context, event) => {
        
        if (!D_mode || D_mode.contains(location.mode)) {
        let data = new JsonSlurper().parseText(event.data)
        let button = data.buttonNumber
        let remoteButton = (D_buttonPress as Integer)
        if (button == remoteButton ) {
        this.onEventD()
        }
        }
        

	})

    .subscribedEventHandler('buttonHandler_C', (context, event) => {
        
        if (!C_mode || C_mode.contains(location.mode)) {
        let data = new JsonSlurper().parseText(event.data)
        let button = data.buttonNumber
        let remoteButton = (C_buttonPress as Integer)
        if (button == remoteButton ) {
        this.onEventC()
        }
        }
        

	})
