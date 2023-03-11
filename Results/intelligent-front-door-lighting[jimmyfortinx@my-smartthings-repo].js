
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these lights', section => {
            section.deviceSetting('lights').capability(['switch']).name('');

        });


        page.section('At morning', section => {
            section.timeSetting('morningOpenTime').name('What time to open ligths?');

        });


        page.section('At night', section => {
            section.timeSetting('nightCloseTime').name('What time to close ligths?');

        });


        page.section('Consider night when all devices are turned off', section => {
            section.deviceSetting('devices').capability(['switch']).name('');
            section.timeSetting('devicesCloseTime').name('What time to close ligths?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'position', 'onLocationChange')

        await context.api.subscriptions.subscribeToDevices(context.config.devices, 'switch', 'switch.off', 'onDeviceTurnOff')

        context.api.schedules.schedule('onNight', delay);

        context.api.schedules.schedule('onMorning', delay);

    })

    .subscribedEventHandler('onDeviceTurnOff', (context, event) => {
        
        log.trace('onDeviceTurnOff')
        let openedDevices = this.filterSwitches(devices, true)
        if (openedDevices.size() == 0) {
        let nowTime = this.now()
        let closeTime = devicesCloseTime ? devicesCloseTime : nightCloseTime
        if (nowTime >= this.timeToday(closeTime).time) {
        this.turnOffLightsIfNeeded('As you requested, I closed front door ligths when all devices are closed.')
        }
        }
        

	})

    .subscribedEventHandler('onLocationChange', (context, event) => {
        
        log.trace('onLocationChange')
        this.controlLights(event)
        

	})

    .scheduledEventHandler('onNight', (context, event) => {
        
        log.trace('onNight')
        this.controlLights(event)
        

	})

    .scheduledEventHandler('onMorning', (context, event) => {
        
        log.trace('onMorning')
        this.controlLights(event)
        

	})
