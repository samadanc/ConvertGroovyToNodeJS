
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('virtualpresencedevice').capability(['presenceSensor']).name('Select Virtual Presence Device');
            section.deviceSetting('people').capability(['presenceSensor']).name('Select People');
            section.deviceSetting('trigger').capability(['switch']).name('Select Button');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.trigger, 'switch', 'switch', 'on_switch')

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('on_switch', (context, event) => {
        
        this.set_virtual_presence_state(trigger.currentSwitch == 'on')
        

	})

    .subscribedEventHandler('presence', (context, event) => {
        
        this.set_virtual_presence_state(this.check_people_present())
        

	})
