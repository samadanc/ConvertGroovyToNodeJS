
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When These...', section => {
            section.deviceSetting('masters').capability(['switch']).name('Master Switches...');
            section.enumSetting('mastersOnOff').name('Are Switched On or Off?...');

        });


        page.section('And it is Between...', section => {
            section.timeSetting('tweenStart').name('This time...');
            section.timeSetting('tweenEnd').name('and This Time...');

        });


        page.section('Then these...', section => {
            section.deviceSetting('slaves').capability(['switch']).name('Slave Switches...');
            section.enumSetting('slavesOnOff').name('Are Switched On or Off?...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switch', 'switch.on', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switch', 'switch.off', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        log.info("switchHandler Event: ${event.value}")
        if (tweenStart != null && tweenEnd != null) {
        let now = this.now()
        let startTime = this.timeToday(tweenStart)
        let endTime = this.timeToday(tweenEnd)
        if (now >= startTime.time && now <= endTime.time) {
        log.info('we\'re in the time slot, continue with the handler')
        } else {
        log.info('we\'re not in the time slot so bail')
        return null
        }
        }
        let delayTime = 1
        if (slaveTime != null) {
        
        context.api.devices.sendCommands(context.config.slaveTime, 'decimal', toDouble)
    
        }
        if (event.value == mastersOnOff && slavesOnOff == 'on') {
        slaves?.on()
        if (slaveTime != null) {
        slaves?.off(['delay': delayTime ])
        }
        }
        if (event.value == mastersOnOff && slavesOnOff == 'off') {
        if (slaveTime != null) {
        slaves?.off(['delay': delayTime ])
        } else {
        slaves?.off()
        }
        }
        

	})
