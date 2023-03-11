
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Things to Control:', section => {
            section.deviceSetting('PowerMeters').capability(['powerMeter']).name('Meters');
            section.numberSetting('MaxPower').name('Notify when power exceeds');

        });


        page.section('Via push notification and/or a SMS message', section => {

        });


        page.section(''Version 1.0.2'', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery15Minutes('onHandler', delay);

    })

    .scheduledEventHandler('onHandler', (context, event) => {
        
        let nDevCnt = 0
        let PowerMetersValue = 0
        let strMessage = ''
        for (let PowerMeterDevice : PowerMeters ) {
        log.info("(0D) - current value for ${PowerMeterDevice.label} is ${PowerMeterDevice.currentValue(power)}")
        PowerMetersValue += PowerMeterDevice.currentValue('power')
        strMessage += "- ${PowerMeterDevice.label}: ${PowerMeterDevice.currentValue(power)}W
        "
        nDevCnt++
        }
        if
        
        context.api.devices.sendCommands(context.config.MaxPower, 'number', warn)
    
        
        context.api.devices.sendCommands(context.config.MaxPower, 'number', label} SmartApp determined you have $nDevCnt device)
    
        
        $strMessage"
        this.sendNotificationToContacts(strMessage, recipients)
        }
        

	})
