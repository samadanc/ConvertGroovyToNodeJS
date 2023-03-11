
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Fix this switch', section => {
            section.deviceSetting('atarget').capability(['switch']).name('Lights');

        });


        page.section('Activate the flicker when this switch is on...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch.on', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        atarget?.on()
        this.pause(5000)
        atarget?.off()
        this.pause(5000)
        atarget?.on()
        this.pause(5000)
        atarget?.off()
        this.pause(5000)
        atarget?.on()
        this.pause(5000)
        atarget?.off()
        this.pause(5000)
        atarget?.on()
        this.pause(5000)
        atarget?.off()
        this.pause(5000)
        atarget?.on()
        this.pause(5000)
        atarget?.off()
        this.pause(5000)
        atarget?.on()
        switches?.off()
        

	})
