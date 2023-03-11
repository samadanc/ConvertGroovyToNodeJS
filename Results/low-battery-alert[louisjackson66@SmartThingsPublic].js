
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Device to Monitor:', section => {
            section.deviceSetting('thebattery').capability(['battery']).name('with batteries...');

        });


        page.section('Battery Settings:', section => {
            section.numberSetting('minThreshold').name('when below... (default 40)%');

        });


        page.section('Notification:', section => {
            section.timeSetting('time').name('Notify at what time daily?');
            section.deviceSetting('sonos').capability(['musicPlayer']).name('On this Speaker player');

        });


        page.section(''Version 1.0.2'', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('doBatteryCheck', delay);

    })

    .scheduledEventHandler('doBatteryCheck', (context, event) => {
        
        log.trace("(0D) ${app.label} - doBatteryCheck() : $settings")
        let nDevBelow = 0
        let strMessage = ''
        for (let batteryDevice : thebattery ) {
        let batteryLevel = batteryDevice.currentValue('battery')
        if
        log.warn("(0E) - current value for ${batteryDevice.label} is $batteryLevel")
        strMessage += "- ${batteryDevice.label}: $batteryLevel%.
        "
        nDevBelow++
        } else {
        log.info("(0F) - current value for ${batteryDevice.label} is $batteryLevel")
        }
        }
        if (nDevBelow) {
        
        context.api.devices.sendCommands(context.config.minThreshold, 'number', send)
    
        
        $strMessage")
        }
        

	})
