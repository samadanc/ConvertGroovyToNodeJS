
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Switch to monitor', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


        page.section('(On) Select the mode to change from', section => {

        });


        page.section('(On) Select the mode to change to', section => {

        });


        page.section('(Off) Select the mode to change from', section => {

        });


        page.section('(Off) Select the mode to change to', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.Off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.On', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'location.mode', 'currentMode')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log("Received on from $theSwitch")
        this.currentMode()
        
        context.api.devices.sendCommands(context.config.theSwitch, 'switch', off)
    
        

	})

    .subscribedEventHandler('currentMode', (context, event) => {
        
        if (mode1 != null) {
        if (location.mode == mode1 ) {
        this.modeChange()
        } else {
        console.log("Current mode is ${location.mode} not $mode1")
        }
        } else {
        if (mode1 == null) {
        this.modeChange()
        }
        }
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log("Received off from $theSwitch, current mode ${location.mode}")
        this.currentModeOff()
        
        context.api.devices.sendCommands(context.config.theSwitch, 'switch', on)
    
        

	})
