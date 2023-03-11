
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Set Smart Home Monitor to AWAY when...', section => {
            section.deviceSetting('awayMomentaryTrigger').capability(['momentary']).name('This momentary switch is pressed');

        });


        page.section('When Smart Home Monitor is set to AWAY...', section => {
            section.deviceSetting('awaySwitchesOn').capability(['switch']).name('Turn these switches on');
            section.deviceSetting('awaySwitchesOff').capability(['switch']).name('Turn these switches off');

        });


        page.section('Set Smart Home Monitor to STAY when...', section => {
            section.deviceSetting('stayMomentaryTrigger').capability(['momentary']).name('This momentary switch is pressed');

        });


        page.section('When Smart Home Monitor is set to STAY...', section => {
            section.deviceSetting('staySwitchesOn').capability(['switch']).name('Turn these switches on');
            section.deviceSetting('staySwitchesOff').capability(['switch']).name('Turn these switches off');

        });


        page.section('Set Smart Home Monitor to DISARM when...', section => {
            section.deviceSetting('disarmMomentaryTrigger').capability(['momentary']).name('This momentary switch is pressed');

        });


        page.section('When Smart Home Monitor is set to DISARM...', section => {
            section.deviceSetting('disarmSwitchesOn').capability(['switch']).name('Turn these switches on');
            section.deviceSetting('disarmSwitchesOff').capability(['switch']).name('Turn these switches off');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.awayMomentaryTrigger, 'momentary', 'switch.on', 'awayTriggerHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.disarmMomentaryTrigger, 'momentary', 'switch.on', 'disarmTriggerHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.stayMomentaryTrigger, 'momentary', 'switch.on', 'stayTriggerHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmHandler')

    })

    .subscribedEventHandler('alarmHandler', (context, event) => {
        
        switch (event.value) {
        case 'away':
        this.changeMode(settings.awayMode)
        this.changeSwitches(settings.awaySwitchesOn, true)
        this.changeSwitches(settings.awaySwitchesOff, false)
        break
        case 'stay':
        this.changeMode(settings.stayMode)
        this.changeSwitches(settings.staySwitchesOn, true)
        this.changeSwitches(settings.staySwitchesOff, false)
        break
        case 'off':
        this.changeMode(settings.disarmMode)
        this.changeSwitches(settings.disarmSwitchesOn, true)
        this.changeSwitches(settings.disarmSwitchesOff, false)
        break
        default:
        log.warn("AlarmAutomations received unknown alarm state: ${event.value}")
        }
        

	})

    .subscribedEventHandler('disarmTriggerHandler', (context, event) => {
        
        log.info("AlarmAutomations changing SHM to DISARM (${event.name} changed to ${event.value})")
        this.sendLocationEvent(['name': 'alarmSystemStatus', 'value': 'off'])
        

	})

    .subscribedEventHandler('awayTriggerHandler', (context, event) => {
        
        log.info("AlarmAutomations changing SHM to AWAY (${event.name} changed to ${event.value})")
        this.sendLocationEvent(['name': 'alarmSystemStatus', 'value': 'away'])
        

	})

    .subscribedEventHandler('stayTriggerHandler', (context, event) => {
        
        log.info("AlarmAutomations changing SHM to STAY (${event.name} changed to ${event.value})")
        this.sendLocationEvent(['name': 'alarmSystemStatus', 'value': 'stay'])
        

	})
