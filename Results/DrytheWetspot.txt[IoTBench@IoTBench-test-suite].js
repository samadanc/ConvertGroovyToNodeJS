
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When water is sensed...', section => {
            section.deviceSetting('sensor').capability(['waterSensor']).name('Where?');

        });


        page.section('Turn on a pump...', section => {
            section.deviceSetting('pump').capability(['switch']).name('Which?');

        });


        page.section('Don\'t restart pump for at least...', section => {
            section.numberSetting('timeout').name('how many minutes. (optional)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'waterSensor', 'water.dry', 'waterHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'waterSensor', 'water.wet', 'waterHandler')

    })

    .subscribedEventHandler('waterHandler', (context, event) => {
        
        console.log("Sensor says ${event.value}")
        if (event.value == 'wet') {
        if (state.delay != true) {
        
        context.api.devices.sendCommands(context.config.pump, 'switch', on)
    
        }
        } else {
        if (event.value == 'dry') {
        
        context.api.devices.sendCommands(context.config.pump, 'switch', off)
    
        if (timeout) {
        state.delay = true
        this.runIn(timeout * 60, resetTimeout)
        }
        }
        }
        

	})
