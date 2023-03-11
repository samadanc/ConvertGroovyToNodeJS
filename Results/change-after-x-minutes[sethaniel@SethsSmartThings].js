
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Timer', section => {

        });


        page.section('Trigger switch', section => {
            section.deviceSetting('triggerswitch').capability(['switch']).name('Select trigger switch:');
            section.enumSetting('triggerswitchstate').name('trigger state:');
            section.enumSetting('triggerswitchreset').name('reset trigger after timer:');

        });


        page.section('Target switch:', section => {
            section.deviceSetting('targetswitch').capability(['switch']).name('Select target switch:');
            section.enumSetting('targetswitchstart').name('Set state when triggered:');
            section.enumSetting('targetswitchend').name('Set state after timer:');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.triggerswitch, 'switch', 'switch.off', 'triggerSwitchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.triggerswitch, 'switch', 'switch.on', 'triggerSwitchHandler')

    })

    .subscribedEventHandler('triggerSwitchHandler', (context, event) => {
        
        this.unsubscribe(targetswitch)
        if (targetswitchstart == 'ON') {
        
        context.api.devices.sendCommands(context.config.targetswitch, 'switch', on)
    
        } else {
        if (targetswitchstart == 'OFF') {
        
        context.api.devices.sendCommands(context.config.targetswitch, 'switch', off)
    
        }
        }
        let delayTime = 60 * timer
        this.runIn(delayTime, changeTarget)
        if (targetswitchend == 'ON') {
        this.subscribe(targetswitch, 'switch.on', targetSwitchHandler)
        } else {
        this.subscribe(targetswitch, 'switch.off', targetSwitchHandler)
        }
        

	})
