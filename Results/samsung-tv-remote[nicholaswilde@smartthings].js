
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Samsung TV Settings', section => {
            section.textSetting('settingIpAddress').name('IP Address');
            section.textSetting('settingMacAddress').name('MAC Address');
            section.enumSetting('tvCommand').name('Perform This Command');

        });


        page.section('When this switch is turned pushed', section => {
            section.deviceSetting('master').capability(['switch']).name('Which?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.on', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("$master switch turned $evt")
        this.tvAction(tvCommand)
        

	})
