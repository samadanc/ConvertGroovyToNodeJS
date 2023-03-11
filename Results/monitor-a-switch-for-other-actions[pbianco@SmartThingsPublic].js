
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor this switch...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Turn on this device...', section => {
            section.deviceSetting('switch2').capability(['switch']).name('');

        });


        page.section('Timer to turn off device...', section => {
            section.numberSetting('delayMinutes').name('Minutes:');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log('In switchHandler')
        if (event.value == 'on') {
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', on)
    
        if (delayMinutes != null) {
        console.log("Delay has been set to $delayMinutes")
        this.runIn(delayMinutes * 60, turnOffDevice, ['overwrite': false])
        }
        }
        if (event.value == 'off') {
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', off)
    
        }
        

	})
