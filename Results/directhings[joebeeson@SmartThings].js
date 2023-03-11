
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Receiver', section => {
            section.textSetting('receiverIpStr').name('IP Address');
            section.numberSetting('receiverPortInt').name('Port');
            section.textSetting('receiverMacStr').name('MAC Address');

        });


        page.section('Control, monitor power with this switch', section => {
            section.deviceSetting('monitorSwitchObj').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('doReceiverModeRequest', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'requestResponseHandler')

    })

    .subscribedEventHandler('doHandleSwitchOffEvent', (context, event) => {
        
        if (state.receiverIsOn) {
        console.log('[doHandleSwitchOffEvent] Received \'switch.off\' event, triggering \'poweroff\' key')
        this.doReceiverRequestKey('poweroff')
        } else {
        console.log('[doHandleSwitchOffEvent] Received \'switch.off\' event but receiver is already off')
        }
        

	})

    .subscribedEventHandler('requestResponseHandler', (context, event) => {
        
        let responseMap = new groovy.json.JsonSlurper().parseText(this.parseLanMessage(eventWrapperObj.description).body)
        if (responseMap.mode == 1) {
        state.receiverIsOn = false
        if (settings.monitorSwitchObj.currentSwitch == 'on') {
        console.log('[requestResponseHandler] Device appears off, but switch is on. Changing switch state...')
        settings.monitorSwitchObj.off
        }
        } else {
        state.receiverIsOn = true
        if (settings.monitorSwitchObj.currentSwitch == 'off') {
        console.log('[requestResponseHandler] Device appears on, but switch is off. Changing switch state...')
        settings.monitorSwitchObj.on
        }
        }
        this.runIn(15, doReceiverModeRequest)
        

	})

    .subscribedEventHandler('doHandleSwitchOnEvent', (context, event) => {
        
        if (!state.receiverIsOn) {
        console.log('[doHandleSwitchOffEvent] Received \'switch.on\' event, triggering \'poweron\' key')
        this.doReceiverRequestKey('poweron')
        } else {
        console.log('[doHandleSwitchOffEvent] Received \'switch.on\' event but receiver is already on')
        }
        

	})

    .scheduledEventHandler('doReceiverModeRequest', (context, event) => {
        
        return this.sendHubCommand(new physicalgraph.device.HubAction(['headers': ['HOST': "${settings.receiverIpStr}:$receiverPortInt"], 'method': 'GET', 'path': '/info/mode', 'query': []]))
        

	})
