
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor...', section => {
            section.deviceSetting('monSwitches').capability(['switch']).name('');

        });


        page.section('Turn on/off things...', section => {
            section.deviceSetting('conSwitches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.monSwitches, 'switch', 'switch', 'monSwitchCheck')

        await context.api.subscriptions.subscribeToDevices(context.config.conSwitches, 'switch', 'switch', 'conSwitchCheck')

        context.api.schedules.runEvery15Minutes('conSwitchCheckNE', delay);

    })

    .subscribedEventHandler('conSwitchCheck', (context, event) => {
        
        log.trace("${event.displayName} changed to ${event.value}")
        if (event.value == 'off') {
        let currSwitches = monSwitches.currentSwitch
        let numberOfSwitches = currSwitches.size()
        let offSwitches = currSwitches.findAll({ let switchVal ->
        switchVal == 'off' ? true : false
        })
        let numberOfOffSwitches = offSwitches.size()
        if (numberOfSwitches != numberOfOffSwitches ) {
        console.log("con: Not all selected switches are off $monSwitches $currSwitches")
        
        context.api.devices.sendCommands(context.config.conSwitches, 'switch', on)
    
        }
        } else {
        console.log("${event.displayName} is already on no need to check monitor switches $monSwitches")
        }
        

	})

    .subscribedEventHandler('monSwitchCheck', (context, event) => {
        
        log.trace("${event.displayName} changed to ${event.value}")
        let currSwitches = monSwitches.currentSwitch
        let numberOfSwitches = currSwitches.size()
        let offSwitches = currSwitches.findAll({ let switchVal ->
        switchVal == 'off' ? true : false
        })
        let numberOfOffSwitches = offSwitches.size()
        if (numberOfSwitches == numberOfOffSwitches ) {
        console.log("mon: All selected switches are off $monSwitches $conSwitches $numberOfSwitches $numberOfOffSwitches $currSwitches")
        
        context.api.devices.sendCommands(context.config.conSwitches, 'switch', off)
    
        } else {
        console.log("mon: Not all selected switches are off $monSwitches $conSwitches $numberOfSwitches $numberOfOffSwitches $currSwitches")
        
        context.api.devices.sendCommands(context.config.conSwitches, 'switch', on)
    
        }
        

	})

    .scheduledEventHandler('conSwitchCheckNE', (context, event) => {
        
        let currSwitches = monSwitches.currentSwitch
        let numberOfSwitches = currSwitches.size()
        let offSwitches = currSwitches.findAll({ let switchVal ->
        switchVal == 'off' ? true : false
        })
        let numberOfOffSwitches = offSwitches.size()
        if (numberOfSwitches != numberOfOffSwitches ) {
        console.log("con: Not all selected switches are off $monSwitches $conSwitches $numberOfSwitches $numberOfOffSwitches $currswitches")
        
        context.api.devices.sendCommands(context.config.conSwitches, 'switch', on)
    
        }
        

	})
