
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Simulated Switch', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('Switch');

        });


        page.section('Computer Information', section => {
            section.textSetting('computerIP').name('Computer IP Address');
            section.numberSetting('computerPort').name('Webserver port');
            section.textSetting('macaddress').name('Computer MAC Address without');
            section.textSetting('secureonpassword').name('SecureOn Password (Optional)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch.on', 'theswitchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch.off', 'theswitchOffHandler')

    })

    .subscribedEventHandler('theswitchOffHandler', (context, event) => {
        
        console.log('theswitchOffHandler: Running')
        this.sendHubCommand(this.myEventGhostShutdown())
        

	})

    .subscribedEventHandler('theswitchOnHandler', (context, event) => {
        
        console.log('theswitchOnHandler: Running')
        this.sendHubCommand(this.myWOL())
        

	})
