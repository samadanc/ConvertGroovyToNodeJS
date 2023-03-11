
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Physical Device', section => {
            section.deviceSetting('rgbController').capability(['colorControl']).name('RGB Controller');

        });


        page.section('Virtual Dimmers', section => {
            section.deviceSetting('rSwitch').capability(['switchLevel']).name('Red Channel');
            section.deviceSetting('gSwitch').capability(['switchLevel']).name('Green Channel');
            section.deviceSetting('bSwitch').capability(['switchLevel']).name('Blue Channel');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.rSwitch, 'switchLevel', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.gSwitch, 'switchLevel', 'level', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.rgbController, 'colorControl', 'color', 'rgbControllerColorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.bSwitch, 'switchLevel', 'level', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.gSwitch, 'switchLevel', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.rSwitch, 'switchLevel', 'level', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.bSwitch, 'switchLevel', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("switchHandler called with event: deviceId ${event.deviceId} name:${event.name} source:${event.source} value:${event.value} isStateChange: ${event.isStateChange()} isPhysical: ${event.isPhysical()} isDigital: ${event.isDigital()} data: ${event.data} device: ${event.device}")
        if (!(event.isStateChange())) {
        return null
        }
        let r = this.getSwitchLevelHexString(rSwitch)
        let g = this.getSwitchLevelHexString(gSwitch)
        let b = this.getSwitchLevelHexString(bSwitch)
        let newHexColorString = "#$r$g$b"
        
        context.api.devices.sendCommands(context.config.rgbController, 'colorControl', currentValue)
    
        console.log("Current color is $currentColor")
        if (newHexColorString != currentHexColorString ) {
        console.log("Updating color to $newHexColorString")
        let colorMap = [:]
        colorMap = ['hex': newHexColorString ]
        
        context.api.devices.sendCommands(context.config.rgbController, 'colorControl', setColor)
    
        }
        

	})

    .subscribedEventHandler('rgbControllerColorHandler', (context, event) => {
        
        console.log("rgbControllerColorHandler called with event: deviceId ${event.deviceId} name:${event.name} source:${event.source} value:${event.value} isStateChange: ${event.isStateChange()} isPhysical: ${event.isPhysical()} isDigital: ${event.isDigital()} data: ${event.data} device: ${event.device}")
        if (!(event.isStateChange())) {
        return null
        }
        let hexColor = event.value
        this.updateSwitchLevel(rSwitch, hexColor.substring(1, 3))
        this.updateSwitchLevel(gSwitch, hexColor.substring(3, 5))
        this.updateSwitchLevel(bSwitch, hexColor.substring(5, 7))
        

	})
