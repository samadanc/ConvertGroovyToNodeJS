
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this sensor detects motion...', section => {
            section.deviceSetting('motionToggler').capability(['motionSensor']).name('Motion Here');

        });


        page.section('Master switch for the toggle reference...', section => {
            section.deviceSetting('masterToggle').capability(['switch']).name('Reference switch');

        });


        page.section('Toggle lights...', section => {
            section.deviceSetting('switchesToToggle').capability(['switch']).name('These go on/off');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionToggler, 'motionSensor', 'motion', 'toggleSwitches')

    })

    .subscribedEventHandler('toggleSwitches', (context, event) => {
        
        console.log("${event.value}")
        if (event.value == 'active' && masterToggle.currentSwitch == 'off') {
        
        context.api.devices.sendCommands(context.config.switchesToToggle, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.masterToggle, 'switch', on)
    
        } else {
        if (event.value == 'active' && masterToggle.currentSwitch == 'on') {
        
        context.api.devices.sendCommands(context.config.switchesToToggle, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.masterToggle, 'switch', off)
    
        }
        }
        

	})
