
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Lock to monitor:', section => {
            section.deviceSetting('thelock').capability(['lock']).name('Lock?');
            section.deviceSetting('thedoor').capability(['contactSensor']).name('Door?');

        });


        page.section('Close when door has been open for:', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thelock, 'lock', 'lock.unlocked', 'lockUnlockedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thedoor, 'contactSensor', 'contact.open', 'doorOpenHandler')

    })

    .subscribedEventHandler('doorOpenHandler', (context, event) => {
        
        console.log("doorOpenHandler called: $evt")
        

	})

    .subscribedEventHandler('lockUnlockedHandler', (context, event) => {
        
        console.log("lockUnlockedHandler called: $evt")
        this.runIn(minutes * 60 + 10, checkLock)
        

	})
