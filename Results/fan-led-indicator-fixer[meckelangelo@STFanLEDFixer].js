
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is toggled, adjust the indicator light...', section => {
            section.deviceSetting('main').capability(['switch']).name('Switch');

        });


        page.section('When this switch is toggled, adjust it in reverse... Change this setting only if the light is behaving opposite of expectations.', section => {
            section.booleanSetting('reverse').name('ON = Reversed, OFF = Normal');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.main, 'switch', 'switch.off', 'switchOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.main, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        if (!reverse) {
        main?.indicatorWhenOn()
        } else {
        main?.indicatorWhenOff()
        }
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        if (!reverse) {
        main?.indicatorWhenOff()
        } else {
        main?.indicatorWhenOn()
        }
        

	})
