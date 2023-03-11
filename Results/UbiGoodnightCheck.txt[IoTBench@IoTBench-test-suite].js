
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which Virtual Switch is the Trigger?', section => {
            section.deviceSetting('trigger').capability(['switch']).name('Which?');

        });


        page.section('Which Virtual Switch is the Door Check?', section => {
            section.deviceSetting('doorCheck').capability(['switch']).name('Which?');

        });


        page.section('Which Virtual Switch is the Window Check?', section => {
            section.deviceSetting('windowCheck').capability(['switch']).name('Which?');

        });


        page.section('Which light switches will I be turning off?', section => {
            section.deviceSetting('theSwitches').capability(['switch']).name('');

        });


        page.section('Which doors should I check?', section => {
            section.deviceSetting('doors').capability(['contactSensor']).name('Which?');

        });


        page.section('Which windows should I check?', section => {
            section.deviceSetting('windows').capability(['contactSensor']).name('Which?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.trigger, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        this.checkDoors()
        this.checkWindows()
        this.runIn(300, lightsOut)
        

	})
