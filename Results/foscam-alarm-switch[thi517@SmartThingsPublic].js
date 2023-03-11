
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which switch?', section => {
            section.deviceSetting('alarmSwitch').capability(['switch']).name('');

        });


        page.section('Enable these Foscam alarms...', section => {
            section.deviceSetting('cameras').capability(['imageCapture']).name('');
            section.booleanSetting('notify').name('Notification?');

        });


        page.section('Only between these times...', section => {
            section.timeSetting('startTime').name('Start Time');
            section.timeSetting('endTime').name('End Time');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.alarmSwitch, 'switch', 'switch.on', 'alarmOn')

        await context.api.subscriptions.subscribeToDevices(context.config.alarmSwitch, 'switch', 'switch.off', 'alarmOff')

    })

    .subscribedEventHandler('alarmOn', (context, event) => {
        
        cameras?.alarmOn()
        this.sendMessage('Foscam alarm enabled')
        

	})

    .subscribedEventHandler('alarmOff', (context, event) => {
        
        cameras?.alarmOff()
        this.sendMessage('Foscam alarm disabled')
        

	})
