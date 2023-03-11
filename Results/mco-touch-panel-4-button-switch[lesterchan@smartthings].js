
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('4 Button Switch', section => {
            section.deviceSetting('master').capability(['zwMultichannel']).name('Switch?');

        });


        page.section('Controls these switches', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Button 1');
            section.deviceSetting('switch2').capability(['switch']).name('Button 2');
            section.deviceSetting('switch3').capability(['switch']).name('Button 3');
            section.deviceSetting('switch4').capability(['switch']).name('Button 4');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'zwMultichannel', 'epEvent', 'endpointEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch3, 'switch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch3, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch4, 'switch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch4, 'switch', 'switch.off', 'offHandler')

    })

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log("MCO-4-APP-offHandler $evt")
        let endpoint = this.getEndpoint(event.deviceId)
        
        context.api.devices.sendCommands(context.config.master, 'zwMultichannel', off)
    
        

	})

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log("MCO-4-APP-onHandler $evt")
        let endpoint = this.getEndpoint(event.deviceId)
        
        context.api.devices.sendCommands(context.config.master, 'zwMultichannel', on)
    
        

	})

    .subscribedEventHandler('endpointEvent', (context, event) => {
        
        console.log("MCO-4-APP-endpointEvent $evt")
        let values = event.value.split(':')
        let endpoint = values[0]
        let payload = values[1]
        let theswitch = this.getSwitch(endpoint)
        if (payload == '200300') {
        console.log('MCO-4-APP-endpointEvent OFF')
        theswitch.off()
        } else {
        if (payload == '2003FF') {
        console.log('MCO-4-APP-endpointEvent ON')
        theswitch.on()
        } else {
        console.log('MCO-4-APP-endpointEvent ERROR')
        }
        }
        

	})
