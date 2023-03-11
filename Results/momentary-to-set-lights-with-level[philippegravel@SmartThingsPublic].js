
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select momentary switch to monitor', section => {
            section.deviceSetting('theToggle').capability(['switch']).name('');

        });


        page.section('Toggle these lights...', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');
            section.numberSetting('level').name('At level?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theToggle, 'switch', 'momentary.pushed', 'toggleHandler')

    })

    .subscribedEventHandler('toggleHandler', (context, event) => {
        
        log.info(event.value)
        let cnt = 0
        
        context.api.devices.sendCommands(context.config.theSwitch, 'switch', currentValue)
    
        
        context.api.devices.sendCommands(context.config.theSwitch, 'switch', currentValue)
    
        log.info(curSwitchValue + ' at ' + curSwitchLevel )
        if (level) {
        if (curSwitchLevel != level || curSwitchValue == 'off') {
        console.log("Switch at $level percent")
        
        context.api.devices.sendCommands(context.config.theSwitch, 'switch', setLevel)
    
        }
        } else {
        if (curSwitchValue == 'on') {
        console.log('Switch to Off')
        
        context.api.devices.sendCommands(context.config.theSwitch, 'switch', off)
    
        } else {
        console.log('Switch On')
        
        context.api.devices.sendCommands(context.config.theSwitch, 'switch', on)
    
        }
        }
        

	})
