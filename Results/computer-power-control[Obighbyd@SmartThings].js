
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switches', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('Simulated Switch');
            section.deviceSetting('thephysicalswitch').capability(['switch']).name('Physical Switch');

        });


        page.section('Computer Information', section => {
            section.textSetting('computerIP').name('Computer IP Address');
            section.numberSetting('computerPort').name('Webserver port');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery15Minutes('ping', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch.on', 'theswitchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch.off', 'theswitchOffHandler')

    })

    .subscribedEventHandler('theswitchOffHandler', (context, event) => {
        
        let egHost = computerIP + ':' + computerPort
        this.sendHubCommand(new physicalgraph.device.HubAction("GET /?Shutdown HTTP/1.1
        HOST: $egHost
        
        ", physicalgraph.device.Protocol.LAN))
        

	})

    .subscribedEventHandler('theswitchOnHandler', (context, event) => {
        
        if (!state.ignoreOn) {
        
        context.api.devices.sendCommands(context.config.thephysicalswitch, 'switch', off)
    
        this.runIn(10, powerOnHandler)
        } else {
        state.ignoreOn = false
        }
        

	})

    .scheduledEventHandler('ping', (context, event) => {
        
        this.unschedule(pingTimeout)
        this.runIn(300, pingTimeout)
        let egHost = computerIP + ':' + computerPort
        this.sendHubCommand(new physicalgraph.device.HubAction("GET / HTTP/1.1
        HOST: $egHost
        
        ", physicalgraph.device.Protocol.LAN, null, ['callback': pingCallback ]))
        

	})
