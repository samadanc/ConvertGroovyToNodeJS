
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section('When this Virtual Blinds Switch is turned on / off:', section => {

        });


        page.section('Trigger off/on this Switch as needed:', section => {
            section.deviceSetting('realSwitch').capability(['switch']).name('');

        });


        page.section('What are the real blinds\' current physical State (on=up-open, off=down-closed)?:', section => {
            section.enumSetting('declaredBlindsState').name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.virtualSwitch, 'device.blindsVirtualSwitch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualSwitch, 'device.blindsVirtualSwitch', 'on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualSwitch, 'device.blindsVirtualSwitch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualSwitch, 'device.blindsVirtualSwitch', 'off', 'offHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        this.myTrace("Handler caught ON  request from virtualSwitch: ${event.stringValue}")
        if (atomicState.blindsState == 'on') {
        this.myTrace('Blinds already  ON. Doing nothing')
        } else {
        this.myTrace('Blinds are     OFF. Attempting real power flick.')
        this.flickRealSwitch()
        atomicState.blindsState = 'on'
        this.myTrace('Done power flick.')
        }
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        this.myTrace("Handler caught OFF request from virtualSwitch: ${event.stringValue}")
        if (atomicState.blindsState == 'off') {
        this.myTrace('Blinds already OFF. Doing nothing')
        } else {
        this.myTrace('Blinds are      ON. Attempting real power flick.')
        this.flickRealSwitch()
        atomicState.blindsState = 'off'
        this.myTrace('Done power flick.')
        }
        

	})
