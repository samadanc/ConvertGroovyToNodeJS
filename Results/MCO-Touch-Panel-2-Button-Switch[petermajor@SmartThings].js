
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('2 Button Switch', section => {
            section.deviceSetting('master').capability(['zwMultichannel']).name('Switch?');

        });


        page.section('Controls these switches', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Button 1');
            section.deviceSetting('switch2').capability(['switch']).name('Button 2');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'zwMultichannel', 'epEvent', 'endpointEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'offHandler')

    })

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log("MCOAPP-offHandler $evt")
        let endpoint = this.getEndpoint(event.deviceId)
        
        context.api.devices.sendCommands(context.config.master, 'zwMultichannel', off)
    
        

	})

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log("MCOAPP-onHandler $evt")
        let endpoint = this.getEndpoint(event.deviceId)
        
        context.api.devices.sendCommands(context.config.master, 'zwMultichannel', on)
    
        

	})

    .subscribedEventHandler('endpointEvent', (context, event) => {
        
        console.log("MCOAPP-endpointEvent $evt")
        let values = event.value.split(':')
        let endpoint = values[0]
        let payload = values[1]
        let theswitch = this.getSwitch(endpoint)
        if (payload == '200300') {
        console.log('MCOAPP-endpointEvent-turning switch off')
        theswitch.off()
        } else {
        if (payload == '2003FF') {
        console.log('MCOAPP-endpointEvent-turning switch on')
        theswitch.on()
        } else {
        console.log('MCOAPP-endpointEvent-unexpected payload')
        }
        }
        

	})
