
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When...', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('This Power Meter...');
            section.numberSetting('aboveThreshold').name('Reports Above...');
            section.numberSetting('belowThreshold').name('Or Reports Below...');

        });


        page.section('Notify via...', section => {
            section.booleanSetting('pushNotification').name('Push notification');
            section.deviceSetting('sonos').capability(['musicPlayer']).name('Message on this player');
            section.numberSetting('volume').name('Sound volume');

        });


        page.section('With Message', section => {
            section.textSetting('aboveText').name('Above limit message text');
            section.textSetting('belowText').name('Below limit message text');

        });


        page.section('With These Lights', section => {
            section.deviceSetting('aboveLightOn').capability(['switch']).name('Above the threshold, turn these lights on:');
            section.deviceSetting('aboveLightOff').capability(['switch']).name('Above the threshold, turn these lights off:');
            section.deviceSetting('belowLightOn').capability(['switch']).name('Below the threshold, turn these lights on:');
            section.deviceSetting('belowLightOff').capability(['switch']).name('Below the threshold, turn these lights off:');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'meterHandler')

    })

    .subscribedEventHandler('meterHandler', (context, event) => {
        
        console.log("Event Name: ${event.name} Value: ${event.value} lastValue: ${atomicState.lastValue}")
        let meterValue = (event.value as double)
        let lastValue = (atomicState.lastValue as double)
        let dUnit = event.unit ? event.unit : 'Watts'
        if (aboveThreshold) {
        let aboveThresholdValue = (aboveThreshold as int)
        if (meterValue > aboveThresholdValue ) {
        if (lastValue < aboveThresholdValue ) {
        if (aboveText) {
        this.sendMessage(aboveText)
        }
        if (aboveLightOn) {
        
        context.api.devices.sendCommands(context.config.aboveLightOn, 'switch', on)
    
        }
        if (aboveLightOff) {
        
        context.api.devices.sendCommands(context.config.aboveLightOff, 'switch', off)
    
        }
        }
        }
        }
        if (belowThreshold) {
        let belowThresholdValue = (belowThreshold as int)
        if (meterValue < belowThresholdValue ) {
        if (lastValue > belowThresholdValue ) {
        if (belowText) {
        this.sendMessage(belowText)
        }
        if (belowLightOn) {
        
        context.api.devices.sendCommands(context.config.belowLightOn, 'switch', on)
    
        }
        if (belowLightOff) {
        
        context.api.devices.sendCommands(context.config.belowLightOff, 'switch', off)
    
        }
        }
        }
        }
        atomicState.lastValue = meterValue
        

	})
