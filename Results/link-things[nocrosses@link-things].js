
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When one of these devices changes state so will the others.', section => {
            section.deviceSetting('master').capability(['switch']).name('Things?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log('switch changed')
        log.info(event.deviceId)
        log.info("Master ids: $master*.id")
        let changeDevices = master.findAll({ let it ->
        it.id != event.deviceId && it.currentSwitch != event.value
        })
        log.info("Change devices ids: $changeDevices*.id")
        if (event.value == 'off') {
        console.log('switch off')
        changeDevices*.off()
        } else {
        if (event.value == 'on') {
        console.log('switch on')
        changeDevices*.on()
        }
        }
        

	})
