
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Flash lights when this switch is active...'', section => {

        });


        page.section('How long to flash for...', section => {
            section.numberSetting('minutes1').name('Minutes?');

        });


        page.section('Flash these light(s)...', section => {
            section.deviceSetting('switches').capability(['switchLevel']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        let offSwitches = state.switchesToTurnOff
        if (event.value == 'on') {
        console.log('flash switches')
        
        context.api.devices.sendCommands(context.config.switches, 'switchLevel', flash)
    
        } else {
        if (event.value == 'off') {
        }
        }
        

	})
