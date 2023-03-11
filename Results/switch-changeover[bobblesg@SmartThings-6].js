
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('''', section => {

        });


        page.section('Switches', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');
            section.deviceSetting('switch2').capability(['switch']).name('');
            section.deviceSetting('switch3').capability(['switch']).name('');
            section.deviceSetting('switch4').capability(['switch']).name('');
            section.deviceSetting('switch5').capability(['switch']).name('');
            section.deviceSetting('switch6').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch5, 'switch', 'switch', 'switchHandler5')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch', 'switchHandler1')

        await context.api.subscriptions.subscribeToDevices(context.config.switch4, 'switch', 'switch', 'switchHandler4')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switch', 'switchHandler2')

        await context.api.subscriptions.subscribeToDevices(context.config.switch3, 'switch', 'switch', 'switchHandler3')

        await context.api.subscriptions.subscribeToDevices(context.config.switch6, 'switch', 'switch', 'switchHandler6')

    })

    .subscribedEventHandler('switchHandler5', (context, event) => {
        
        state.currS5 = event.value
        if (state.currS5 == 'on') {
        log.info("Turning on $switch5")
        if (switch1 != null) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        }
        if (switch2 != null) {
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', off)
    
        }
        if (switch3 != null) {
        
        context.api.devices.sendCommands(context.config.switch3, 'switch', off)
    
        }
        if (switch4 != null) {
        
        context.api.devices.sendCommands(context.config.switch4, 'switch', off)
    
        }
        if (switch6 != null) {
        
        context.api.devices.sendCommands(context.config.switch6, 'switch', off)
    
        }
        }
        

	})

    .subscribedEventHandler('switchHandler6', (context, event) => {
        
        state.currS6 = event.value
        if (state.currS6 == 'on') {
        log.info("Turning on $switch6")
        if (switch1 != null) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        }
        if (switch2 != null) {
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', off)
    
        }
        if (switch3 != null) {
        
        context.api.devices.sendCommands(context.config.switch3, 'switch', off)
    
        }
        if (switch4 != null) {
        
        context.api.devices.sendCommands(context.config.switch4, 'switch', off)
    
        }
        if (switch5 != null) {
        
        context.api.devices.sendCommands(context.config.switch5, 'switch', off)
    
        }
        }
        

	})

    .subscribedEventHandler('switchHandler4', (context, event) => {
        
        state.currS4 = event.value
        if (state.currS4 == 'on') {
        log.info("Turning on $switch4")
        if (switch2 != null) {
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', off)
    
        }
        if (switch3 != null) {
        
        context.api.devices.sendCommands(context.config.switch3, 'switch', off)
    
        }
        if (switch1 != null) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        }
        if (switch5 != null) {
        
        context.api.devices.sendCommands(context.config.switch5, 'switch', off)
    
        }
        if (switch6 != null) {
        
        context.api.devices.sendCommands(context.config.switch6, 'switch', off)
    
        }
        }
        

	})

    .subscribedEventHandler('switchHandler2', (context, event) => {
        
        state.currS2 = event.value
        if (state.currS2 == 'on') {
        log.info("Turning on $switch2")
        if (switch1 != null) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        }
        if (switch3 != null) {
        
        context.api.devices.sendCommands(context.config.switch3, 'switch', off)
    
        }
        if (switch4 != null) {
        
        context.api.devices.sendCommands(context.config.switch4, 'switch', off)
    
        }
        if (switch5 != null) {
        
        context.api.devices.sendCommands(context.config.switch5, 'switch', off)
    
        }
        if (switch6 != null) {
        
        context.api.devices.sendCommands(context.config.switch6, 'switch', off)
    
        }
        }
        

	})

    .subscribedEventHandler('switchHandler1', (context, event) => {
        
        state.currS1 = event.value
        if (state.currS1 == 'on') {
        log.info("Turning on $switch1")
        if (switch2 != null) {
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', off)
    
        }
        if (switch3 != null) {
        
        context.api.devices.sendCommands(context.config.switch3, 'switch', off)
    
        }
        if (switch4 != null) {
        
        context.api.devices.sendCommands(context.config.switch4, 'switch', off)
    
        }
        if (switch5 != null) {
        
        context.api.devices.sendCommands(context.config.switch5, 'switch', off)
    
        }
        if (switch6 != null) {
        
        context.api.devices.sendCommands(context.config.switch6, 'switch', off)
    
        }
        }
        

	})

    .subscribedEventHandler('switchHandler3', (context, event) => {
        
        state.currS3 = event.value
        if (state.currS3 == 'on') {
        log.info("Turning on $switch3")
        if (switch2 != null) {
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', off)
    
        }
        if (switch1 != null) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        }
        if (switch4 != null) {
        
        context.api.devices.sendCommands(context.config.switch4, 'switch', off)
    
        }
        if (switch5 != null) {
        
        context.api.devices.sendCommands(context.config.switch5, 'switch', off)
    
        }
        if (switch6 != null) {
        
        context.api.devices.sendCommands(context.config.switch6, 'switch', off)
    
        }
        }
        

	})
