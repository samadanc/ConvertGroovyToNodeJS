
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these lights', section => {
            section.deviceSetting('bulbs').capability(['colorControl']).name('Hue light bulbs');

        });


        page.section('Using this controller', section => {
            section.deviceSetting('controller').capability(['button']).name('Aeon minimote');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.controller, 'button', 'button', 'buttonHandler')

    })

    .subscribedEventHandler('buttonHandler', (context, event) => {
        
        switch (event.jsonData?.buttonNumber) {
        case 2:
        if (event.value == 'held') {
        
        context.api.devices.sendCommands(context.config.bulbs, 'colorControl', setLevel)
    
        } else {
        this.levelUp()
        }
        break
        case 3:
        if (event.value == 'held') {
        let color = ['name': 'Soft White', 'hue': 23, 'saturation': 56]
        
        context.api.devices.sendCommands(context.config.bulbs, 'colorControl', setColor)
    
        } else {
        this.changeColor()
        }
        break
        case 4:
        if (event.value == 'held') {
        
        context.api.devices.sendCommands(context.config.bulbs, 'colorControl', setLevel)
    
        } else {
        this.levelDown()
        }
        break
        default:
        this.toggleState()
        break
        }
        

	})
