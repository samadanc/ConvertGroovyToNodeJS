
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when there\'s movement...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('And off when there\'s been no movement for...', section => {
            section.numberSetting('minutes1').name('Minutes?');

        });


        page.section('Turn on/off light(s)...', section => {
            section.deviceSetting('switches').capability(['switchLevel']).name('');

        });


        page.section('Set light level to..', section => {
            section.numberSetting('lightLevel').name('LightLevel?');

        });


        page.section('Don\'t change lights if this switch or virtual switch is on..', section => {
            section.deviceSetting('overrideSwitch').capability(['switch']).name('Enable Switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        let overrideEnable = overrideSwitch.currentSwitch
        console.log("Override Switch: $overrideEnable")
        if (overrideEnable == 'off') {
        if (event.value == 'active') {
        console.log('turning on lights')
        
        context.api.devices.sendCommands(context.config.switches, 'switchLevel', on)
    
        } else {
        if (event.value == 'inactive') {
        this.runIn(minutes1 * 60, scheduleCheck, ['overwrite': false])
        }
        }
        } else {
        console.log('Override is ON')
        }
        

	})
