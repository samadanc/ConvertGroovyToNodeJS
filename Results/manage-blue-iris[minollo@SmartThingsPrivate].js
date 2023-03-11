
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Poller device...', section => {
            section.deviceSetting('pollerDevice').capability(['battery']).name('');

        });


        page.section('Server settings...', section => {
            section.textSetting('serverURL').name('URL');
            section.textSetting('username').name('User');
            section.deviceSetting('virtualSwitch').capability(['switch']).name('Virtual switch');

        });


        page.section('Camera names...', section => {
            section.textSetting('camera1').name('Camera #1');
            section.textSetting('camera2').name('Camera #2');
            section.textSetting('camera3').name('Camera #3');

        });


        page.section('Camera switches... ', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches');

        });


        page.section('Modes...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.pollerDevice, 'battery', 'battery', 'pollerEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualSwitch, 'switch', 'switch', 'virtualSwitchHandler')

    })

    .subscribedEventHandler('virtualSwitchHandler', (context, event) => {
        
        console.log("virtualSwitchHandler($evt)")
        state.timerLatest = null
        if (event.value == 'on') {
        log.info("Enabling cameras at $location")
        console.log("Turning on switches and waiting for ${this.getRecordingTimeout()} seconds")
        switches?.on()
        state.timerLatest = this.now()
        this.runIn(this.getRecordingTimeout(), activateCameras)
        } else {
        try {
        this.unschedule(activateCameras)
        }
        catch (let e) {
        log.error("Ignoring exception: $e")
        }
        log.info("Disabling cameras at $location")
        this.deActivateCameras()
        switches?.off()
        }
        

	})

    .subscribedEventHandler('pollerEvent', (context, event) => {
        
        console.log("[PollerEvent] timerLatest==${state.timerLatest}; now()==${this.now()}")
        if (state.timerLatest && this.now() - state.timerLatest > this.getRecordingTimeout() + 60 * 1000) {
        log.error('Activating cameras (timer was asleep?)')
        this.activateCameras()
        }
        

	})
