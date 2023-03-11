
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Logging:', section => {
            section.enumSetting('configLoggingLevelIDE').name('IDE Live Logging Level:\nMessages with this level and higher will be logged to the IDE.');

        });


        page.section('Alarm Panel Integration:', section => {
            section.deviceSetting('alarmPanel').capability(['actuator']).name('Alarm Partition');

        });


        page.section('Alexa Integration:', section => {
            section.deviceSetting('vStay').capability(['switch']).name('Virtual Stay Switch');
            section.deviceSetting('vAway').capability(['switch']).name('Virtual Away Switch');
            section.deviceSetting('vInstant').capability(['switch']).name('Virtual Instant Switch');
            section.deviceSetting('vDisarm').capability(['switch']).name('Virtual Disarm Switch');

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.enumSetting('pushAndPhone').name('Notify me via Push Notification');

        });


        page.section('Text to include in message', section => {
            section.textSetting('msgStart').name('Message text');

        });


        page.section('Send alerts for:', section => {
            section.booleanSetting('msgAlarm').name('Alarm Triggered');
            section.booleanSetting('msgAlarmCancel').name('Alarm Cancelled');
            section.booleanSetting('msgArm').name('Partition Armed');
            section.booleanSetting('msgDisarm').name('Partition Disarmed');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.alarmPanel, 'actuator', 'dscpartition', 'handlePartition')

        await context.api.subscriptions.subscribeToDevices(context.config.vStay, 'switch', 'switch', 'handleStay')

        await context.api.subscriptions.subscribeToDevices(context.config.vAway, 'switch', 'switch', 'handleAway')

        await context.api.subscriptions.subscribeToDevices(context.config.vInstant, 'switch', 'switch', 'handleInstant')

        await context.api.subscriptions.subscribeToDevices(context.config.vDisarm, 'switch', 'switch', 'handleDisarm')

    })

    .subscribedEventHandler('handleDisarm', (context, event) => {
        
        this.logger("handleDisarm(): ${event.displayName}(${event.name}:${event.unit}) ${event.value}", 'info')
        switch (event.value) {
        case 'on':
        if
        this.logger('handleDisarm(): disarming', 'debug')
        
        context.api.devices.sendCommands(context.config.alarmPanel, 'actuator', disarm)
    
        }
        break
        default:
        this.logger("handleDisarm(): unhandled event: ${event.value}", 'debug')
        }
        

	})

    .subscribedEventHandler('handleInstant', (context, event) => {
        
        this.logger("handleInstant(): ${event.displayName}(${event.name}:${event.unit}) ${event.value}", 'info')
        switch (event.value) {
        case 'on':
        if
        this.logger('handleInstant(): turning on arm instant', 'debug')
        
        context.api.devices.sendCommands(context.config.alarmPanel, 'actuator', armInstant)
    
        }
        break
        default:
        this.logger("handleInstant(): unhandled event: ${event.value}", 'debug')
        }
        

	})

    .subscribedEventHandler('handleStay', (context, event) => {
        
        this.logger("handleStay(): ${event.displayName}(${event.name}:${event.unit}) ${event.value}", 'info')
        switch (event.value) {
        case 'on':
        if
        this.logger('handleStay(): turning on arm stay', 'debug')
        
        context.api.devices.sendCommands(context.config.alarmPanel, 'actuator', armStay)
    
        }
        break
        default:
        this.logger("handleStay(): unhandled event: ${event.value}", 'debug')
        }
        

	})

    .subscribedEventHandler('handlePartition', (context, event) => {
        
        this.logger("handlePartition(): ${event.displayName}(${event.name}:${event.unit}) ${event.value}", 'info')
        switch (event.value) {
        case 'ready':
        this.logger('handlePartition(): alarm is ready to arm', 'debug')
        this.handleStates('disarmed', 'off', 'off', 'off', 'on')
        break
        case 'notready':
        this.logger('handlePartition(): zones are faulted', 'debug')
        this.handleStates('disarmed', 'off', 'off', 'off', 'on')
        break
        case 'arming':
        this.logger('handlePartition(): alarm is arming', 'debug')
        this.handleStates('armed', 'off', 'off', 'off', 'on')
        break
        case 'armedstay':
        this.logger('handlePartition(): alarm is armed stay', 'debug')
        this.handleStates('armed', 'on', 'off', 'off', 'off')
        break
        case 'armedaway':
        this.logger('handlePartition(): alarm is armed away', 'debug')
        this.handleStates('armed', 'off', 'on', 'off', 'off')
        break
        case 'armedinstant':
        this.logger('handlePartition(): alarm is armed instant', 'debug')
        this.handleStates('armed', 'off', 'off', 'on', 'off')
        break
        case 'armedmax':
        this.logger('handlePartition(): alarm is armed max', 'debug')
        this.handleStates('armed', 'off', 'off', 'off', 'off')
        break
        case 'alarmcleared':
        this.logger('handlePartition(): alarm cleared', 'debug')
        this.handleStates('canceled', 'off', 'off', 'off', 'off')
        break
        case 'alarm':
        this.logger('handlePartition(): alarm', 'debug')
        this.handleStates('alarm', 'off', 'off', 'off', 'off')
        break
        default:
        this.logger("handlePartition(): unhandled event: ${event.value}", 'debug')
        }
        

	})

    .subscribedEventHandler('handleAway', (context, event) => {
        
        this.logger("handleAway(): ${event.displayName}(${event.name}:${event.unit}) ${event.value}", 'info')
        switch (event.value) {
        case 'on':
        if
        this.logger('handleAway(): turning on arm away', 'debug')
        
        context.api.devices.sendCommands(context.config.alarmPanel, 'actuator', armAway)
    
        }
        break
        default:
        this.logger("handleAway(): unhandled event: ${event.value}", 'debug')
        }
        

	})
