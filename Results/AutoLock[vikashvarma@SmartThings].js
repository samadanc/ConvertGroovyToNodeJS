
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('lockDevice').capability(['lock']).name('Which Lock?');
            section.enumSetting('lockOpt').name('Preference');
            section.numberSetting('maxusers').name('Maximum authorized users');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lockDevice, 'lock', 'lock.unlocked', 'unlockEvent')

        context.api.schedules.runIn('setLockCode', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.lockDevice, 'lock', 'lock.locked', 'lockEvent')

    })

    .subscribedEventHandler('lockEvent', (context, event) => {
        
        state.lockStatus = 0
        console.log("${lockDevice.displayName} is locked")
        this.unschedule(lockDoor)
        

	})

    .subscribedEventHandler('unlockEvent', (context, event) => {
        
        console.log("Lock $lockDevice was: ${event.value}")
        state.lockStatus = 1
        let delay = minutesLater * 60
        console.log("Locking ${lockDevice.displayName} in $minutesLater minutes")
        this.runIn(delay, lockDoor)
        let data = []
        let unlockmsg = ''
        if (event.data != null) {
        data = new JsonSlurper().parseText(event.data)
        if (data.usedCode <= settings.maxusers) {
        let u = settings."user${data.usedCode}"
        unlockmsg = "$lockDevice was unlocked by $u"
        } else {
        unlockmsg = "$lockDevice was unlocked by unknown user"
        }
        } else {
        unlockmsg = "$lockDevice was unlocked by app"
        }
        console.log("pushNotify=$pushNotify | unlockmsg=$unlockmsg")
        if (pushNotify) {
        this.sendPush(unlockmsg)
        } else {
        console.log('noPush')
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        if (event.value == 'inactive') {
        this.lockDoor(evt)
        }
        

	})

    .scheduledEventHandler('setLockCode', (context, event) => {
        
        log.trace("setLockCode start: state.maxuser=${state.maxusers}")
        if (state.maxusers < settings.maxusers) {
        state.maxusers = state.maxusers + 1
        let lockCode = settings."code${state.maxusers}"
        lockCode = lockCode + ''
        let msg = "$lockDevice added user ${state.maxusers}, code: $lockCode"
        log.info(msg)
        
        context.api.devices.sendCommands(context.config.lockDevice, 'lock', setCode)
    
        } else {
        console.log("end scheduling,state.maxuser=${state.maxusers}, settings.maxusers=${settings.maxusers}")
        }
        log.trace("setLockCode end: state.maxuser=${state.maxusers}")
        

	})
