
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When switch turns on...', section => {
            section.deviceSetting('switch0').capability(['switch']).name('');

        });


        page.section('Turn off switch after seconds...', section => {
            section.numberSetting('time').name('Seconds?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch0, 'switch', 'switch.on', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.switch0, 'switch', on)
    
        let delay = time
        console.log(delay)
        this.runIn(delay, turnOffSwitch)
        

	})
