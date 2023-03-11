
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When x10 is executed...', section => {
            section.deviceSetting('switchx').capability(['switch']).name('X10 Interface?');
            section.textSetting('deviceOn').name('Turn on with device match of');
            section.textSetting('commandOn').name('Turn on when command match of');
            section.textSetting('deviceOff').name('Turn off with device match of');
            section.textSetting('commandOff').name('Turn off when command match of');

        });


        page.section('Change switch...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Which light?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switchx, 'switch', 'commandFromX10', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log('Switch Handler called')
        console.log("evt: ${event.value}")
        let onMatch = deviceOn + '-' + commandOn
        let offMatch = deviceOff + '-' + commandOff
        let eventValue = event.value.split('/')[0]
        console.log("eventValue $eventValue")
        if (eventValue == onMatch ) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        }
        if (eventValue == offMatch ) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        }
        

	})
