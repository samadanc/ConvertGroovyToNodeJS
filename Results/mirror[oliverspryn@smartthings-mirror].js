
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Master Switch', section => {
            section.deviceSetting('master').capability(['switch']).name('Switch');

        });


        page.section('SmartThings Devices', section => {
            section.deviceSetting('devicesOff').capability(['switch']).name('Always Turn Off');
            section.deviceSetting('devicesOn').capability(['switch']).name('Always Turn On');
            section.deviceSetting('devicesToggle').capability(['switch']).name('Toggle Devices');

        });


        page.section('IFTTT Devices', section => {
            section.textSetting('iftttOff').name('Off URLs');
            section.textSetting('iftttOn').name('On URLs');
            section.textSetting('iftttToggle').name('Toggle URLs');

        });


        page.section(''App Settings'', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.on', 'on')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.off', 'off')

    })

    .subscribedEventHandler('off', (context, event) => {
        
        devicesOff.each({
        it.off()
        })
        devicesToggle.each({
        it.currentValue('switch') == 'off' ? it.on() : it.off()
        })
        if (iftttOff != null) {
        
        context.api.devices.sendCommands(context.config.iftttOff, 'text', iftttRun)
    
        }
        if (iftttToggle != null) {
        
        context.api.devices.sendCommands(context.config.iftttToggle, 'text', iftttRun)
    
        }
        

	})

    .subscribedEventHandler('on', (context, event) => {
        
        devicesOn.each({
        it.on()
        })
        devicesToggle.each({
        it.currentValue('switch') == 'off' ? it.on() : it.off()
        })
        if (iftttOn != null) {
        
        context.api.devices.sendCommands(context.config.iftttOn, 'text', iftttRun)
    
        }
        if (iftttToggle != null) {
        
        context.api.devices.sendCommands(context.config.iftttToggle, 'text', iftttRun)
    
        }
        

	})
