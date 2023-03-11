
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switches...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Switch 1?');
            section.textSetting('switch1Code').name('Switch 1 X10 To Control?');
            section.deviceSetting('switch2').capability(['switch']).name('Switch 2?');
            section.textSetting('switch2Code').name('Switch 2 X10 To Control?');
            section.deviceSetting('switch3').capability(['switch']).name('Switch 3?');
            section.textSetting('switch3Code').name('Switch 3 X10 To Control?');
            section.deviceSetting('switch4').capability(['switch']).name('Switch 4?');
            section.textSetting('switch4Code').name('Switch 4 X10 To Control?');
            section.deviceSetting('contact1').capability(['contactSensor']).name('Contact Sensor?');
            section.textSetting('contact1Code').name('Contact 1 X10 To Control?');

        });


        page.section('Which ST shield to control?', section => {
            section.deviceSetting('shield').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switch.on', 'switch2OnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'switch1OffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'switch1OnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch4, 'switch', 'switch.off', 'switch4OffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch3, 'switch', 'switch.on', 'switch3OnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'contact1OnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switch.off', 'switch2OffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.shield, 'switch', 'commandFromX10', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch3, 'switch', 'switch.off', 'switch3OffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.closed', 'contact1OffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch4, 'switch', 'switch.on', 'switch4OnHandler')

    })

    .subscribedEventHandler('switch3OnHandler', (context, event) => {
        
        this.handleSwitchCall(switch3Code, 'On')
        

	})

    .subscribedEventHandler('contact1OnHandler', (context, event) => {
        
        this.handleSwitchCall(contact1Code, 'On')
        

	})

    .subscribedEventHandler('contact1OffHandler', (context, event) => {
        
        this.handleSwitchCall(contact1Code, 'Off')
        

	})

    .subscribedEventHandler('switch4OnHandler', (context, event) => {
        
        this.handleSwitchCall(switch4Code, 'On')
        

	})

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        let onMatch = deviceOn + '-' + commandOn
        let offMatch = deviceOff + '-' + commandOff
        let eventValue = event.value.split('/')[0]
        if (eventValue != '' && eventValue.indexOf('-') > 0) {
        let code = eventValue.split('-')[0]
        let command = eventValue.split('-')[1]
        console.log("LST2x10V2-eventValue $eventValue / code $code / command $command")
        if (code == switch1Code ) {
        if (command == 'On') {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        } else {
        if (command == 'Off') {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        }
        }
        }
        if (code == switch2Code ) {
        if (command == 'On') {
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', on)
    
        } else {
        if (command == 'Off') {
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', off)
    
        }
        }
        }
        if (code == switch3Code ) {
        if (command == 'On') {
        
        context.api.devices.sendCommands(context.config.switch3, 'switch', on)
    
        } else {
        if (command == 'Off') {
        
        context.api.devices.sendCommands(context.config.switch3, 'switch', off)
    
        }
        }
        }
        if (code == switch4Code ) {
        if (command == 'On') {
        
        context.api.devices.sendCommands(context.config.switch4, 'switch', on)
    
        } else {
        if (command == 'Off') {
        
        context.api.devices.sendCommands(context.config.switch4, 'switch', off)
    
        }
        }
        }
        } else {
        console.log("LST2x10V2- ignored evt ${event.value} from shield")
        }
        

	})

    .subscribedEventHandler('switch3OffHandler', (context, event) => {
        
        this.handleSwitchCall(switch3Code, 'Off')
        

	})

    .subscribedEventHandler('switch1OnHandler', (context, event) => {
        
        this.handleSwitchCall(switch1Code, 'On')
        

	})

    .subscribedEventHandler('switch1OffHandler', (context, event) => {
        
        this.handleSwitchCall(switch1Code, 'Off')
        

	})

    .subscribedEventHandler('switch2OnHandler', (context, event) => {
        
        this.handleSwitchCall(switch2Code, 'On')
        

	})

    .subscribedEventHandler('switch4OffHandler', (context, event) => {
        
        this.handleSwitchCall(switch4Code, 'Off')
        

	})

    .subscribedEventHandler('switch2OffHandler', (context, event) => {
        
        this.handleSwitchCall(switch2Code, 'Off')
        

	})
