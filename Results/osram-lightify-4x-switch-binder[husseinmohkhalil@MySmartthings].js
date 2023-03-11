
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which OSRAM Lightify Dimming Switch...', section => {
            section.deviceSetting('switch1').capability(['button']).name('Which switch?');

        });


        page.section('Which device(s) to control on button 1 & 2.', section => {
            section.deviceSetting('targets').capability(['switch']).name('Which Target(s)?');

        });


        page.section('Which device(s) to control on button 3 & 4.', section => {
            section.deviceSetting('targets2').capability(['switch']).name('Which Target(s)?');

        });


        page.section('Set level for button 1 hold...', section => {
            section.numberSetting('upLevel').name('Button 1 level?');

        });


        page.section('Set level for button 2 hold...', section => {
            section.numberSetting('downLevel').name('Button 2 level?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'button', 'button.pushed', 'buttonPushedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'button', 'button.held', 'buttonHeldHandler')

    })

    .subscribedEventHandler('buttonPushedHandler', (context, event) => {
        
        let buttonNumber = this.parseJson(event.data)?.buttonNumber
        if (buttonNumber == 1) {
        console.log('Button 1 pushed (on)')
        
        context.api.devices.sendCommands(context.config.targets, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.targets, 'switch', setLevel)
    
        } else {
        if (buttonNumber == 2) {
        console.log('Button 2 pushed (off)')
        
        context.api.devices.sendCommands(context.config.targets, 'switch', off)
    
        } else {
        if (buttonNumber == 3) {
        console.log('Button 3 pushed (on)')
        
        context.api.devices.sendCommands(context.config.targets2, 'switch', on)
    
        } else {
        if (buttonNumber == 4) {
        console.log('Button 4 pushed (off)')
        
        context.api.devices.sendCommands(context.config.targets2, 'switch', off)
    
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('buttonHeldHandler', (context, event) => {
        
        console.log("buttonHeldHandler invoked with ${event.data}")
        let buttonNumber = this.parseJson(event.data)?.buttonNumber
        if (buttonNumber == 1) {
        console.log("Button 1 held (Setting brightness to $upLevel)")
        
        context.api.devices.sendCommands(context.config.targets, 'switch', setLevel)
    
        } else {
        console.log("Button 2 held (Setting brightness to $downLevel)")
        
        context.api.devices.sendCommands(context.config.targets, 'switch', setLevel)
    
        }
        

	})
