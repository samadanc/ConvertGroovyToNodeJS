
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


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'active') {
        let currSwitches = switches.currentSwitch
        let onSwitches = switches.findAll({ let switchVal ->
        console.log("Switch state ${switchVal.currentSwitch}")
        console.log("Switch level ${switchVal.currentLevel}")
        switchVal.currentSwitch == 'on' ? true : false
        })
        if (onSwitches.size() == 0) {
        console.log('turning on lights')
        
        context.api.devices.sendCommands(context.config.switches, 'switchLevel', setLevel)
    
        state.autoTurnedOn = true
        }
        } else {
        if (event.value == 'inactive' && state.autoTurnedOn) {
        this.runIn(minutes1 * 60, scheduleCheck, ['overwrite': false])
        }
        }
        

	})
