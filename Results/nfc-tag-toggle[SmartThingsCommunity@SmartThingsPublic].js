
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select an NFC tag', section => {
            section.deviceSetting('tag').capability(['touchSensor']).name('NFC Tag');

        });


        page.section('Select devices to control', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Light or switch');
            section.deviceSetting('lock').capability(['lock']).name('Lock');
            section.deviceSetting('garageDoor').capability(['doorControl']).name('Garage door controller');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.tag, 'touchSensor', 'nfcTouch', 'touchHandler')

    })

    .subscribedEventHandler('touchHandler', (context, event) => {
        
        log.trace("touchHandler(${event.descriptionText})")
        if (switch1) {
        let status = this.currentStatus(switch1, masterSwitch, 'switch')
        switch1.each({
        if (status == 'on') {
        it.off()
        } else {
        it.on()
        }
        })
        }
        if (lock) {
        let status = this.currentStatus(lock, masterLock, 'lock')
        lock.each({
        if (status == 'locked') {
        
        context.api.devices.sendCommands(context.config.lock, 'lock', unlock)
    
        } else {
        
        context.api.devices.sendCommands(context.config.lock, 'lock', lock)
    
        }
        })
        }
        if (garageDoor) {
        let status = this.currentStatus(garageDoor, masterDoor, 'status')
        garageDoor.each({
        if (status == 'open') {
        it.close()
        } else {
        it.open()
        }
        })
        }
        

	})
