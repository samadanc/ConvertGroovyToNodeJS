
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices', section => {
            section.deviceSetting('dehumid').capability(['powerMeter']).name('Dehumidifier');
            section.deviceSetting('fans').capability(['switch']).name('Fans');
            section.numberSetting('threshold').name('Wattage');

        });


        page.section(''Help'', section => {

        });


        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery3Hours('do_fans_on', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.dehumid, 'powerMeter', 'power', 'meter_handler')

    })

    .subscribedEventHandler('meter_handler', (context, event) => {
        
        if (state.interval_fan) {
        console.log('Dehumidifier fan event skipped becuase interval fan already running.')
        } else {
        let meterValue = (event.value as double)
        let thresholdValue = (threshold as int)
        if (meterValue > thresholdValue ) {
        console.log('Dehumidifier fan turned on.')
        
        context.api.devices.sendCommands(context.config.fans, 'switch', on)
    
        } else {
        console.log('Dehumidifier fan turned off.')
        
        context.api.devices.sendCommands(context.config.fans, 'switch', off)
    
        }
        }
        

	})

    .scheduledEventHandler('do_fans_on', (context, event) => {
        
        console.log('Interval fan turned on.')
        
        context.api.devices.sendCommands(context.config.fans, 'switch', on)
    
        state.interval_fan = false
        this.runIn(900, do_fans_off)
        

	})
