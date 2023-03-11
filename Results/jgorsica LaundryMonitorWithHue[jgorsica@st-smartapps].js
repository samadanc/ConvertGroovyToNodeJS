
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Tell me when this washer/dryer has stopped...', section => {
            section.deviceSetting('sensor1').capability(['accelerationSensor']).name('');

        });


        page.section('Via this number (optional, sends push notification if not specified)', section => {

        });


        page.section('Control these bulbs...', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Hue Bulbs?');

        });


        page.section('Choose light effects...', section => {
            section.enumSetting('color').name('Hue Color?');
            section.enumSetting('lightLevel').name('Light Level?');

        });


        page.section('Until this door switch opens', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Which door?');

        });


        page.section('Time thresholds (in minutes, optional)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor1, 'accelerationSensor', 'acceleration.active', 'accelerationActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sensor1, 'accelerationSensor', 'acceleration.inactive', 'accelerationInactiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('accelerationActiveHandler', (context, event) => {
        
        log.trace('vibration')
        if (!state.isRunning) {
        log.info('Arming detector')
        state.isRunning = true
        state.startedAt = this.now()
        }
        state.stoppedAt = null
        

	})

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        if (state.setColor) {
        state.setColor = false
        state.isRunning = false
        state.stoppedAt = this.now()
        hues.each({
        console.log("switch state: ${it.currentValue(switch)}")
        if (it.currentValue('switch') == closed ) {
        it.setColor(state.previous[it.id])
        }
        })
        }
        

	})

    .subscribedEventHandler('accelerationInactiveHandler', (context, event) => {
        
        log.trace("no vibration, isRunning: ${state.isRunning}")
        if (state.isRunning) {
        console.log("startedAt: ${state.startedAt}, stoppedAt: ${state.stoppedAt}")
        if (!state.stoppedAt) {
        state.stoppedAt = this.now()
        this.runIn(fillTime * 60, checkRunning, ['overwrite': false])
        }
        }
        

	})
