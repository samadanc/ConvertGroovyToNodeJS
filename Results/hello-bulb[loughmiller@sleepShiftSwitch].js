
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Virtual Switch?', section => {
            section.deviceSetting('virtualSwitch').capability(['switch']).name('');

        });


        page.section('Lights?', section => {
            section.deviceSetting('lLevel').capability(['switchLevel']).name('level');
            section.deviceSetting('lTemp').capability(['colorTemperature']).name('temp');
            section.deviceSetting('lSwitch').capability(['switch']).name('switch');

        });


        page.section('Nightlight?', section => {
            section.deviceSetting('nlLevel').capability(['switchLevel']).name('level');
            section.deviceSetting('nlTemp').capability(['colorTemperature']).name('temp');
            section.deviceSetting('nlSwitch').capability(['switch']).name('switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.virtualSwitch, 'switch', 'switch.on', 'switchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualSwitch, 'switch', 'switch.off', 'switchOffHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        log.info('switch turned off!')
        
        context.api.devices.sendCommands(context.config.lTemp, 'colorTemperature', setColorTemperature)
    
        
        context.api.devices.sendCommands(context.config.lLevel, 'switchLevel', setLevel)
    
        
        context.api.devices.sendCommands(context.config.lTemp, 'colorTemperature', setColorTemperature)
    
        
        context.api.devices.sendCommands(context.config.lLevel, 'switchLevel', setLevel)
    
        this.runIn(3, delayOff)
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        log.info('switch on')
        let currentMode = location.mode
        log.info("mode: $currentMode")
        if (currentMode == 'Bedtime') {
        log.info('switch turned on, and it\'s bedtime')
        
        context.api.devices.sendCommands(context.config.lLevel, 'switchLevel', setLevel)
    
        
        context.api.devices.sendCommands(context.config.lTemp, 'colorTemperature', setColorTemperature)
    
        } else {
        if (currentMode == 'Night') {
        log.info('switch turned on, and it\'s nighttime!')
        
        context.api.devices.sendCommands(context.config.lLevel, 'switchLevel', setLevel)
    
        
        context.api.devices.sendCommands(context.config.lTemp, 'colorTemperature', setColorTemperature)
    
        } else {
        if (currentMode == 'Evening') {
        log.info('switch turned on, and it\'s evening!')
        
        context.api.devices.sendCommands(context.config.lLevel, 'switchLevel', setLevel)
    
        
        context.api.devices.sendCommands(context.config.lTemp, 'colorTemperature', setColorTemperature)
    
        
        context.api.devices.sendCommands(context.config.lLevel, 'switchLevel', setLevel)
    
        
        context.api.devices.sendCommands(context.config.lTemp, 'colorTemperature', setColorTemperature)
    
        } else {
        log.info('switch turned on, and it\'s daytime!')
        
        context.api.devices.sendCommands(context.config.lLevel, 'switchLevel', setLevel)
    
        
        context.api.devices.sendCommands(context.config.lTemp, 'colorTemperature', setColorTemperature)
    
        
        context.api.devices.sendCommands(context.config.lLevel, 'switchLevel', setLevel)
    
        
        context.api.devices.sendCommands(context.config.lTemp, 'colorTemperature', setColorTemperature)
    
        }
        }
        }
        

	})
