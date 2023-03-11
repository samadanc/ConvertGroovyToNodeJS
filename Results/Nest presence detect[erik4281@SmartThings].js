
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When these people arrive and leave...', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('Who?');

        });


        page.section('... or this switch is switched...', section => {
            section.deviceSetting('nestSwitch').capability(['switch']).name('');

        });


        page.section('... change modes for these thermostat(s)...', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.nestSwitch, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'peopleHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("event.name: ${event.value}")
        let switchStatus = event.value
        if (state.quietSwitch) {
        } else {
        if (switchStatus == 'on') {
        thermostats?.present()
        console.log('Somebody arrived, Nest is set to Present.')
        this.sendNotificationEvent('Nest set to \'Present\'')
        state.thermostat = 'present'
        } else {
        thermostats?.away()
        console.log('Everybody left, Nest is set to Away.')
        this.sendNotificationEvent('Nest set to \'Away\'')
        state.thermostat = 'away'
        }
        }
        

	})

    .subscribedEventHandler('peopleHandler', (context, event) => {
        
        console.log("event.name: ${event.value}")
        if (this.everyoneIsAway()) {
        thermostats?.away()
        console.log('Everybody left, Nest is set to Away.')
        state.thermostat = 'away'
        if (nestSwitch) {
        state.quietSwitch = true
        
        context.api.devices.sendCommands(context.config.nestSwitch, 'switch', off)
    
        } else {
        this.sendNotificationEvent('Nest set to \'Away\'')
        }
        } else {
        if (state.thermostat == 'away') {
        thermostats?.present()
        console.log('Somebody arrived, Nest is set to Present.')
        state.thermostat = 'present'
        if (nestSwitch) {
        state.quietSwitch = true
        
        context.api.devices.sendCommands(context.config.nestSwitch, 'switch', on)
    
        } else {
        this.sendNotificationEvent('Nest set to \'Present\'')
        }
        } else {
        thermostat?.present()
        console.log('Somebody arrived or left, at least 1 person present. Nest set to Home.')
        state.thermostat = 'present'
        if (nestSwitch) {
        state.quietSwitch = true
        
        context.api.devices.sendCommands(context.config.nestSwitch, 'switch', on)
    
        }
        }
        }
        state.quietSwitch = false
        

	})
