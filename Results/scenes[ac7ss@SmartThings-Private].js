
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Triggering:', section => {
            section.deviceSetting('TriggerSw').capability(['momentary']).name('Pushbutton Trigger');

        });


        page.section('Lights to turn on:', section => {
            section.deviceSetting('GroupD').capability(['switchLevel']).name('Dimmable lights group 1');
            section.numberSetting('LevelD').name('Dim to level');
            section.deviceSetting('GroupD2').capability(['switchLevel']).name('Dimmable lights group 2');
            section.numberSetting('LevelD2').name('Dim to level');
            section.deviceSetting('GroupH').capability(['colorControl']).name('Colour lights group');
            section.numberSetting('HueH').name('Set hue, 0 to 100');
            section.numberSetting('SatH').name('Set saturation %');
            section.numberSetting('LevelH').name('Set level %');
            section.deviceSetting('GroupT').capability(['colorTemperature']).name('Temperature lights group');
            section.numberSetting('TempT').name('Set Temperature, 2700K to 6500K');
            section.numberSetting('LevelT').name('Set level %');
            section.deviceSetting('GroupS').capability(['switch']).name('Switched items group');

        });


        page.section('Items to turn off:', section => {
            section.deviceSetting('GroupOff').capability(['switch']).name('');

        });


        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.TriggerSw, 'momentary', 'switch.on', 'Triggered')

    })

    .subscribedEventHandler('Triggered', (context, event) => {
        
        console.log('Event')
        if (GroupD) {
        
        context.api.devices.sendCommands(context.config.GroupD, 'switchLevel', setLevel)
    
        
        context.api.devices.sendCommands(context.config.GroupD, 'switchLevel', on)
    
        }
        if (GroupD2) {
        
        context.api.devices.sendCommands(context.config.GroupD2, 'switchLevel', setLevel)
    
        
        context.api.devices.sendCommands(context.config.GroupD2, 'switchLevel', on)
    
        }
        if (GroupH) {
        
        context.api.devices.sendCommands(context.config.GroupH, 'colorControl', setHue)
    
        
        context.api.devices.sendCommands(context.config.GroupH, 'colorControl', setSaturation)
    
        
        context.api.devices.sendCommands(context.config.GroupH, 'colorControl', setLevel)
    
        
        context.api.devices.sendCommands(context.config.GroupH, 'colorControl', on)
    
        }
        if (GroupT) {
        
        context.api.devices.sendCommands(context.config.GroupT, 'colorTemperature', setColorTemperature)
    
        
        context.api.devices.sendCommands(context.config.GroupT, 'colorTemperature', setLevel)
    
        
        context.api.devices.sendCommands(context.config.GroupT, 'colorTemperature', on)
    
        }
        if (GroupS) {
        
        context.api.devices.sendCommands(context.config.GroupS, 'switch', on)
    
        }
        if (GroupOff) {
        
        context.api.devices.sendCommands(context.config.GroupOff, 'switch', off)
    
        }
        

	})
