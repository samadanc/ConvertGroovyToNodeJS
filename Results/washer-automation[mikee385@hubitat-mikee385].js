
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section('', section => {
            section.deviceSetting('powerMeter').capability(['powerMeter']).name('Power Meter');

        });


        page.section('', section => {
            section.timeSetting('resetTime').name('Reset Time');

        });


        page.section('', section => {
            section.booleanSetting('logEnable').name('Enable debug logging?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.powerMeter, 'powerMeter', 'power', 'powerMeterHandler')

        context.api.schedules.schedule('dailyReset', delay);

    })

    .subscribedEventHandler('powerMeterHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        if
        if
        
        context.api.devices.sendCommands(context.config.appliance, 'device.ApplianceStatus', start)
    
        }
        } else {
        if
        
        context.api.devices.sendCommands(context.config.appliance, 'device.ApplianceStatus', finish)
    
        }
        }
        

	})

    .scheduledEventHandler('dailyReset', (context, event) => {
        
        this.logDebug('Received daily reset time')
        if
        
        context.api.devices.sendCommands(context.config.appliance, 'device.ApplianceStatus', reset)
    
        }
        

	})
