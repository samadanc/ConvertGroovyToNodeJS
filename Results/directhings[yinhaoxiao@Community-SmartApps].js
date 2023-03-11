
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


        page.section('Control power with this switch', section => {
            section.deviceSetting('monitorSwitchObj').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'lanResponseHandler')

        context.api.schedules.runIn('doReceiverModeAsyncRequest', delay);

    })

    .subscribedEventHandler('lanResponseHandler', (context, event) => {
        
        let response = new groovy.json.JsonSlurper().parseText(this.parseLanMessage(event.description).body)
        this.unsubscribe([settings.monitorSwitchObj])
        if (response.mode == 1) {
        if (settings.monitorSwitchObj.currentSwitch != 'off') {
        console.log('Device appears off, but switch is on. Changing switch state...')
        settings.monitorSwitchObj.off
        }
        } else {
        if (settings.monitorSwitchObj.currentSwitch != 'on') {
        console.log('Device appears on, but switch is off. Changing switch state...')
        settings.monitorSwitchObj.on
        }
        }
        this.subscribe(settings.monitorSwitchObj, 'switch.on', 'doHandleSwitchOnEvent')
        this.subscribe(settings.monitorSwitchObj, 'switch.off', 'doHandleSwitchOffEvent')
        this.runIn(5, doReceiverModeAsyncRequest)
        

	})

    .scheduledEventHandler('doReceiverModeAsyncRequest', (context, event) => {
        
        return this.sendHubCommand(new physicalgraph.device.HubAction(['headers': ['HOST': "${settings.receiverIpStr}:$receiverPortInt"], 'method': 'GET', 'path': '/info/mode', 'query': []]))
        

	})
