
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('This switch turns on (indicating motion)...', section => {
            section.deviceSetting('triggerSwitch').capability(['switch']).name('Switch');

        });


        page.section('Turn on another switch...', section => {
            section.deviceSetting('targetSwitch').capability(['switch']).name('Switch');

        });


        page.section('And turn it back off after...', section => {
            section.numberSetting('offMinutes').name('Minutes');

        });


        page.section('And trigger motion sensor...', section => {
            section.deviceSetting('targetSensor').capability(['motionSensor']).name('Simulated Motion sensor');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('motionTrigger', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.targetSwitch, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.targetSensor, 'motionSensor', active)
    
        let delaySeconds = 60 * offMinutes
        this.runIn(delaySeconds, resetMotion)
        

	})
