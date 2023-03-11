
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.numberSetting('minutesUnlocked').name('Number of Minutes the Lock must be unlocked before auto Locking');
            section.numberSetting('minutesDoorClosed').name('Number of Minutes the Door must be closed Before auto Locking');

        });


        page.section('', section => {
            section.deviceSetting('contactSensor').capability(['contactSensor']).name('The Door Sensor on the Door with the Lock');
            section.deviceSetting('doorLock').capability(['lock']).name('The Lock to Control');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.doorLock, 'lock', 'lock', 'lockChangeEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact', 'contactChangeEventHandler')

    })

    .subscribedEventHandler('lockChangeEventHandler', (context, event) => {
        
        this.logtrace('Executing \'lockChangeEventHandler\'')
        if (event.isStateChange()) {
        if (!(this.isDoorLocked())) {
        state.doorUnlockedRawDate = this.convertDatetoISODateString(new Date())
        if (state.schedulerActive != true) {
        let doorLockCheckData = ['minutesUnlockedData': null, 'minutesDoorClosedData': null]
        doorLockCheckData.minutesUnlockedData = minutesUnlocked
        doorLockCheckData.minutesDoorClosedData = minutesDoorClosed
        this.runEvery5Minutes(checkToLockTheDoor, ['data': doorLockCheckData ])
        state.schedulerActive = true
        console.log("checkToLockTheDoorScheduler Scheduled with Data: $doorLockCheckData")
        }
        } else {
        state.schedulerActive = false
        this.unscheduleCheckToLockTheDoor()
        }
        }
        this.logtrace('End Executing \'lockChangeEventHandler\'')
        

	})

    .subscribedEventHandler('contactChangeEventHandler', (context, event) => {
        
        this.logtrace('Executing \'contactChangeEventHandler\'')
        state.contectOpenRawDate = this.convertDatetoISODateString(new Date())
        this.logtrace('End Executing \'contactChangeEventHandler\'')
        

	})
