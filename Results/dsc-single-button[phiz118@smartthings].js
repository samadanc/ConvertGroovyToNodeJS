
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Alarm Server Settings', section => {
            section.textSetting('ip').name('IP');
            section.textSetting('port').name('Port');
            section.textSetting('alarmCodePanel').name('Alarm Code');

        });


        page.section('Button for Alarm', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch.off', 'switchUpdate')

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch.on', 'switchUpdate')

    })

    .subscribedEventHandler('switchUpdate', (context, event) => {
        
        this.callAlarmServer(evt)
        

	})
