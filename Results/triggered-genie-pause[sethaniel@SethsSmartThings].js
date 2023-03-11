
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Receiver Information', section => {

        });


        page.section('Trigger Switch', section => {
            section.deviceSetting('triggerSwitch').capability(['switch']).name('Select the trigger switch that will pause the Genie');
            section.booleanSetting('triggerReset').name('Should the switch be switched back automatically so that the trigger can be used again?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.triggerSwitch, 'switch', 'switch.on', 'triggerThrown')

    })

    .subscribedEventHandler('triggerThrown', (context, event) => {
        
        console.log('sending')
        this.sendHubCommand(new physicalgraph.device.HubAction(['headers': ['HOST': "$receiverIp:$receiverPort"], 'method': 'GET', 'path': '/remote/processKey', 'query': ['key': 'pause', 'clientAddr': receiverMac ? receiverMac : '0'.replace(':', '').toUpperCase()]]))
        console.log('sent')
        if (triggerReset) {
        console.log('resetting.')
        
        context.api.devices.sendCommands(context.config.triggerSwitch, 'switch', off)
    
        }
        

	})
