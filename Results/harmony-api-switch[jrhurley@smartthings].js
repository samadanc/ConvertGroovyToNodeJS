
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is activated', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


        page.section('Send commands to this Harmony API server', section => {

        });


        page.section('''', section => {

        });


        page.section('', section => {
            section.textSetting('commandOn1').name('Command 1');
            section.textSetting('commandOn2').name('Command 2');
            section.textSetting('commandOn3').name('Command 3');
            section.textSetting('commandOn4').name('Command 4');
            section.textSetting('commandOn5').name('Command 5');

        });


        page.section('', section => {
            section.textSetting('commandOff1').name('Command 1');
            section.textSetting('commandOff2').name('Command 2');
            section.textSetting('commandOff3').name('Command 3');
            section.textSetting('commandOff4').name('Command 4');
            section.textSetting('commandOff5').name('Command 5');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.on', 'switchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.off', 'switchOffHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        console.log('Switch off handler')
        this.loopThroughCommands([ commandOff1 , commandOff2 , commandOff3 , commandOff4 , commandOff5 ])
        console.log('End of handler.')
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        console.log('Switch on handler')
        this.loopThroughCommands([ commandOn1 , commandOn2 , commandOn3 , commandOn4 , commandOn5 ])
        console.log('End of handler.')
        

	})
