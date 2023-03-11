
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Connect these virtual Fans to the Arduino', section => {
            section.deviceSetting('fan1').capability(['switchLevel']).name('Fan 1 for arduino');
            section.deviceSetting('fan2').capability(['switchLevel']).name('Fan 2 for arduino');
            section.deviceSetting('fan3').capability(['switchLevel']).name('Fan 3 for arduino');
            section.deviceSetting('fan4').capability(['switchLevel']).name('Fan 4 for arduino');

        });


        page.section('Which Arduino relay board to control?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.fan3, 'switchLevel', 'switch.setLevel', 'fan3val')

        await context.api.subscriptions.subscribeToDevices(context.config.fan4, 'switchLevel', 'switch.setLevel', 'fan4val')

        await context.api.subscriptions.subscribeToDevices(context.config.fan1, 'switchLevel', 'switch', 'fan1val')

        await context.api.subscriptions.subscribeToDevices(context.config.fan2, 'switchLevel', 'switch.setLevel', 'fan2val')

        await context.api.subscriptions.subscribeToDevices(context.config.fan1, 'switchLevel', 'switch.setLevel', 'fan1val')

        await context.api.subscriptions.subscribeToDevices(context.config.fan4, 'switchLevel', 'switch', 'fan4val')

        await context.api.subscriptions.subscribeToDevices(context.config.fan3, 'switchLevel', 'switch', 'fan3val')

        await context.api.subscriptions.subscribeToDevices(context.config.fan2, 'switchLevel', 'switch', 'fan2val')

    })

    .subscribedEventHandler('fan2val', (context, event) => {
        
        if (event.value == 'on' || event.value == 'off') {
        return null
        }
        console.log("UpdateLevel: $evt")
        java.lang.Integer level = fan2.currentValue
        console.log("level: $level")
        if (level == 0) {
        
        context.api.devices.sendCommands(context.config.arduino, 'device.ArduinoFans', fan2off)
    
        }
        if (level == 30) {
        
        context.api.devices.sendCommands(context.config.arduino, 'device.ArduinoFans', fan2low)
    
        }
        if (level == 60) {
        
        context.api.devices.sendCommands(context.config.arduino, 'device.ArduinoFans', fan2med)
    
        }
        if (level == 100) {
        
        context.api.devices.sendCommands(context.config.arduino, 'device.ArduinoFans', fan2hi)
    
        }
        

	})

    .subscribedEventHandler('fan4val', (context, event) => {
        
        if (event.value == 'on' || event.value == 'off') {
        return null
        }
        console.log("UpdateLevel: $evt")
        java.lang.Integer level = fan4.currentValue
        console.log("level: $level")
        if (level == 0) {
        
        context.api.devices.sendCommands(context.config.arduino, 'device.ArduinoFans', fan4off)
    
        }
        if (level == 30) {
        
        context.api.devices.sendCommands(context.config.arduino, 'device.ArduinoFans', fan4low)
    
        }
        if (level == 60) {
        
        context.api.devices.sendCommands(context.config.arduino, 'device.ArduinoFans', fan4med)
    
        }
        if (level == 100) {
        
        context.api.devices.sendCommands(context.config.arduino, 'device.ArduinoFans', fan4hi)
    
        }
        

	})

    .subscribedEventHandler('fan1val', (context, event) => {
        
        if (event.value == 'on' || event.value == 'off') {
        return null
        }
        console.log("UpdateLevel: $evt")
        java.lang.Integer level = fan1.currentValue
        console.log("level: $level")
        if (level == 0) {
        
        context.api.devices.sendCommands(context.config.arduino, 'device.ArduinoFans', fan1off)
    
        }
        if (level == 30) {
        
        context.api.devices.sendCommands(context.config.arduino, 'device.ArduinoFans', fan1low)
    
        }
        if (level == 60) {
        
        context.api.devices.sendCommands(context.config.arduino, 'device.ArduinoFans', fan1med)
    
        }
        if (level == 100) {
        
        context.api.devices.sendCommands(context.config.arduino, 'device.ArduinoFans', fan1hi)
    
        }
        

	})

    .subscribedEventHandler('fan3val', (context, event) => {
        
        if (event.value == 'on' || event.value == 'off') {
        return null
        }
        console.log("UpdateLevel: $evt")
        java.lang.Integer level = fan3.currentValue
        console.log("level: $level")
        if (level == 0) {
        
        context.api.devices.sendCommands(context.config.arduino, 'device.ArduinoFans', fan3off)
    
        }
        if (level == 30) {
        
        context.api.devices.sendCommands(context.config.arduino, 'device.ArduinoFans', fan3low)
    
        }
        if (level == 60) {
        
        context.api.devices.sendCommands(context.config.arduino, 'device.ArduinoFans', fan3med)
    
        }
        if (level == 100) {
        
        context.api.devices.sendCommands(context.config.arduino, 'device.ArduinoFans', fan3hi)
    
        }
        

	})
