
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When Smart Home Monitor is set to away...', section => {
            section.deviceSetting('awaySwitchesOn').capability(['switch']).name('Turn these switches on');
            section.deviceSetting('awaySwitchesOff').capability(['switch']).name('Turn these switches off');

        });


        page.section('When Smart Home Monitor is set to stay...', section => {
            section.deviceSetting('staySwitchesOn').capability(['switch']).name('Turn these switches on');
            section.deviceSetting('staySwitchesOff').capability(['switch']).name('Turn these switches off');

        });


        page.section('When Smart Home Monitor is set to disarm...', section => {
            section.deviceSetting('disarmSwitchesOn').capability(['switch']).name('Turn these switches on');
            section.deviceSetting('disarmSwitchesOff').capability(['switch']).name('Turn these switches off');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmHandler')

    })

    .subscribedEventHandler('alarmHandler', (context, event) => {
        
        if (event.value == 'away') {
        console.log('SHM Actions: shm set to away')
        if (settings.awayMode) {
        this.changeMode(settings.awayMode)
        
        context.api.devices.sendCommands(context.config.awaySwitchesOn, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.awaySwitchesOff, 'switch', off)
    
        }
        } else {
        if (event.value == 'stay') {
        console.log('SHM Actions: shm set to stay')
        if (settings.stayMode) {
        this.changeMode(settings.stayMode)
        
        context.api.devices.sendCommands(context.config.staySwitchesOn, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.staySwitchesOff, 'switch', off)
    
        }
        } else {
        if (event.value == 'off') {
        console.log('SHM Actions: shm set to disarmed')
        if (settings.disarmMode) {
        this.changeMode(settings.disarmMode)
        
        context.api.devices.sendCommands(context.config.disarmSwitchesOn, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.disarmSwitchesOff, 'switch', off)
    
        }
        } else {
        console.log("SHM Actions: unkown shm state: ${event.value}")
        }
        }
        }
        

	})
