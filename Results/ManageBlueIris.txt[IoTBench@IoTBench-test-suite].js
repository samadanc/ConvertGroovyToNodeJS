
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

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

        await context.api.subscriptions.subscribeToDevices(context.config.virtualSwitch, 'switch', 'switch', 'virtualSwitchHandler')

    })

    .subscribedEventHandler('virtualSwitchHandler', (context, event) => {
        
        console.log("virtualSwitchHandler($evt)")
        if (event.value == 'on') {
        log.info("Enabling cameras at $location")
        console.log("Turning on switches and waiting for ${this.getRecordingTimeout()} seconds")
        switches?.on()
        this.runIn(this.getRecordingTimeout(), activateCameras)
        } else {
        this.unschedule(activateCameras)
        log.info("Disabling cameras at $location")
        this.deActivateCameras()
        switches?.off()
        }
        

	})
