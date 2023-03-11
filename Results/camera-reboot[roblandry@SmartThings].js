
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Info'', section => {

        });


        page.section('Switches', section => {
            section.deviceSetting('vSwitch').capability(['switch']).name('Switch to force reboot');
            section.deviceSetting('cameraSwitch').capability(['switch']).name('Switch to cycle');

        });


        page.section('Camera', section => {
            section.textSetting('cameraName').name('Camera Name');
            section.textSetting('ipAddress').name('Camera IP Address');
            section.numberSetting('cameraPort').name('Camera Port Number');
            section.textSetting('adminUsername').name('Camera Admin Username');
            section.textSetting('adminPassword').name('Camera Admin Password');

        });


        page.section('Send Push Notification?', section => {
            section.booleanSetting('sendPush').name('Send Push Notification when unreachable?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.vSwitch, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (event.value == 'on') {
        this.scheduleHandler()
        }
        

	})
