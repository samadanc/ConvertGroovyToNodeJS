
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switches to monitor:', section => {
            section.deviceSetting('switches1').capability(['switch']).name('Switches?');

        });


        page.section('Phone number to text?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches1, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        log.trace("${event.value}: $evt, $settings")
        settings.switches1.each({
        let lastSwitch = it.currentValue('switch')
        try {
        if (lastSwitch) {
        if (lastSwitch == 'off') {
        this.sendSms(phone1, "Your ${it.displayName} was turned ON!")
        }
        }
        }
        catch (let e) {
        log.trace('Caught error checking a device.')
        log.trace(e)
        }
        })
        

	})
