
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when there\'s movement from...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('And off when there\'s been no reported movement for...', section => {
            section.numberSetting('minutes1').name('Minutes?');

        });


        page.section('And light level is below...', section => {
            section.numberSetting('lightlevel1').name('Lux');

        });


        page.section('From lightmeter...', section => {
            section.deviceSetting('lightmeter1').capability(['illuminanceMeasurement']).name('Light meter?');

        });


        page.section('Turn on the following light(s)...', section => {
            section.deviceSetting('onswitches').capability(['switch']).name('');

        });


        page.section('Turn off the following light(s)...', section => {
            section.deviceSetting('offswitches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.lightmeter1, 'illuminanceMeasurement', currentValue)
    
        let currSwitches = offswitches.currentSwitch
        let swThatAreOn = currSwitches.findAll({ let switchVal ->
        switchVal == 'on' ? true : false
        })
        let swOn = swThatAreOn.size()
        if (event.value == 'active' && currentLux <= lightlevel1 ) {
        console.log("Motion detected: current lux level: $currentLux, threshold for switch on: $lightlevel1 -> lights on (and unschedule any switchoff)")
        
        context.api.devices.sendCommands(context.config.onswitches, 'switch', on)
    
        this.unschedule(lightsOff)
        } else {
        if (event.value == 'active' && swOn > 0) {
        console.log("Motion detected: $swOn lights on. Cancelling any light off event outstanding. Current lux: $currentLux")
        this.unschedule(lightsOff)
        } else {
        if (event.value == 'inactive' && swOn > 0) {
        if (minutes1 >= 1) {
        this.runIn(minutes1 * 60, lightsOff)
        console.log("Motion inactive: scheduling switchoff of $swOn light(s) in $minutes1 mins.")
        } else {
        this.lightsOff()
        }
        } else {
        if (event.value == 'inactive' && swOn == 0) {
        console.log('Motion inactive: no lights on, so not scheduling switchoff.')
        } else {
        console.log("Motion detected: doing nothing. lux: $currentLux > $lightlevel1, switches on: $swOn")
        }
        }
        }
        }
        

	})
