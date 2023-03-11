
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is toggled...', section => {
            section.deviceSetting('master').capability(['switch']).name('Where?');

        });


        page.section('Turn on/off these switches...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.Off', 'switchOff')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.On', 'switchOn')

    })

    .subscribedEventHandler('switchOn', (context, event) => {
        
        console.log('Switches On')
        switches?.on()
        

	})

    .subscribedEventHandler('switchOff', (context, event) => {
        
        console.log('Switches Off')
        switches?.off()
        

	})
