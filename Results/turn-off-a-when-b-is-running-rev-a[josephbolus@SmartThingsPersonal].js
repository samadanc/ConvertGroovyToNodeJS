
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Disable?', section => {
            section.booleanSetting('disableLogic').name('Disable Logic?');

        });


        page.section('When this device is drawing power', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('');
            section.numberSetting('DeviceRunning').name('Device running when power is above (W)');

        });


        page.section('Turn off these switches...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        if (!disableLogic) {
        
        context.api.devices.sendCommands(context.config.meter, 'powerMeter', currentValue)
    
        if (latestPower >= DeviceRunning ) {
        state.deviceInStandby = 0
        } else {
        state.deviceInStandby = 1
        }
        if (state.deviceInStandby == 0) {
        switches?.off()
        console.log("ST Turned off the $switches")
        } else {
        switches?.on()
        console.log("ST Turned on the $switches")
        }
        }
        

	})
