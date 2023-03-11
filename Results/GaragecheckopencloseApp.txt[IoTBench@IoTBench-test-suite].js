
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which Virtual Switch is the Close Trigger?', section => {
            section.deviceSetting('triggerC').capability(['switch']).name('Which?');

        });


        page.section('Which Virtual Switch is the Open Trigger?', section => {
            section.deviceSetting('triggerO').capability(['switch']).name('Which?');

        });


        page.section('Which Virtual Switch is the Close Check?', section => {
            section.deviceSetting('checkC').capability(['switch']).name('Which?');

        });


        page.section('Which Virtual Switch is the Open Check?', section => {
            section.deviceSetting('checkO').capability(['switch']).name('Which?');

        });


        page.section('Which door sensor should I check?', section => {
            section.deviceSetting('door').capability(['contactSensor']).name('Which?');

        });


        page.section('Which outlet/relay controls the Garage?', section => {
            section.deviceSetting('outlet').capability(['switch']).name('Which?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.triggerC, 'switch', 'switch.on', 'garageClose')

        await context.api.subscriptions.subscribeToDevices(context.config.triggerO, 'switch', 'switch.on', 'garageOpen')

    })

    .subscribedEventHandler('garageClose', (context, event) => {
        
        if (door.currentContact == 'closed') {
        
        context.api.devices.sendCommands(context.config.checkC, 'switch', on)
    
        } else {
        
        context.api.devices.sendCommands(context.config.outlet, 'switch', on)
    
        }
        this.runIn(100, switchesOff)
        

	})

    .subscribedEventHandler('garageOpen', (context, event) => {
        
        if (door.currentContact == 'open') {
        
        context.api.devices.sendCommands(context.config.checkO, 'switch', on)
    
        } else {
        
        context.api.devices.sendCommands(context.config.outlet, 'switch', on)
    
        }
        this.runIn(100, switchesOff)
        

	})
