
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('What:', section => {
            section.deviceSetting('doorLock').capability(['lock']).name('Door Lock');

        });


        page.section('When Locked Then Turn these On:', section => {
            section.deviceSetting('Lockedonswitch1').capability(['switch']).name('');
            section.deviceSetting('Lockedonswitch2').capability(['switch']).name('');
            section.deviceSetting('Lockedonswitch3').capability(['switch']).name('');
            section.deviceSetting('Lockedonswitch4').capability(['switch']).name('');

        });


        page.section('When Locked Then Turn these Off:', section => {
            section.deviceSetting('Lockedoffswitch1').capability(['switch']).name('');
            section.deviceSetting('Lockedoffswitch2').capability(['switch']).name('');
            section.deviceSetting('Lockedoffswitch3').capability(['switch']).name('');
            section.deviceSetting('Lockedoffswitch4').capability(['switch']).name('');

        });


        page.section('When Opened Then Turn these On:', section => {
            section.deviceSetting('unlockedonswitch1').capability(['switch']).name('');
            section.deviceSetting('unlockedonswitch2').capability(['switch']).name('');
            section.deviceSetting('unlockedonswitch3').capability(['switch']).name('');
            section.deviceSetting('unlockedonswitch4').capability(['switch']).name('');

        });


        page.section('When Opened Then Turn these Off:', section => {
            section.deviceSetting('unlockedoffswitch1').capability(['switch']).name('');
            section.deviceSetting('unlockedoffswitch2').capability(['switch']).name('');
            section.deviceSetting('unlockedoffswitch3').capability(['switch']).name('');
            section.deviceSetting('unlockedoffswitch4').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.doorLock, 'lock', 'lock.unlocked', 'unlockedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.doorLock, 'lock', 'lock.locked', 'lockedHandler')

    })

    .subscribedEventHandler('unlockedHandler', (context, event) => {
        
        console.log("Turned off handler with event: $evt")
        this.setSwitchOn(unlockedonswitch1)
        this.setSwitchOn(unlockedonswitch2)
        this.setSwitchOn(unlockedonswitch3)
        this.setSwitchOn(unlockedonswitch4)
        this.setSwitchOff(unlockedoffswitch1)
        this.setSwitchOff(unlockedoffswitch2)
        this.setSwitchOff(unlockedoffswitch3)
        this.setSwitchOff(unlockedoffswitch4)
        

	})

    .subscribedEventHandler('lockedHandler', (context, event) => {
        
        console.log("Turned on handler with event: $evt")
        this.setSwitchOn(Lockedonswitch1)
        this.setSwitchOn(Lockedonswitch2)
        this.setSwitchOn(Lockedonswitch3)
        this.setSwitchOn(Lockedonswitch4)
        this.setSwitchOff(Lockedoffswitch1)
        this.setSwitchOff(Lockedoffswitch2)
        this.setSwitchOff(Lockedoffswitch3)
        this.setSwitchOff(Lockedoffswitch4)
        

	})
