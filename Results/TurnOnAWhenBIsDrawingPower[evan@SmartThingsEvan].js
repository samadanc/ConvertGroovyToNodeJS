
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
            section.numberSetting('ShutOffDelay').name('Shut off after N minutes');

        });


        page.section('Turn on these switches...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        if (!disableLogic) {
        if
        this.unschedule()
        state.scheduled = 0
        switches?.on()
        console.log("ST Turned on the $switches")
        } else {
        if (ShutOffDelay > 0) {
        if (state.scheduled == 0) {
        console.log("ST will turn off the $switches in $ShutOffDelay minutes")
        this.runIn(ShutOffDelay * 60, shutOff)
        state.scheduled = 1
        }
        } else {
        this.shutOff()
        }
        }
        }
        

	})
