
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the trigger button', section => {
            section.deviceSetting('triggerButton').capability(['button']).name('Trigger Button');

        });


        page.section('Select the target light', section => {
            section.deviceSetting('targetLight').capability(['colorTemperature']).name('Target Light');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.triggerButton, 'button', 'button.pushed', 'buttonPushed')

        await context.api.subscriptions.subscribeToDevices(context.config.triggerButton, 'button', 'button.held', 'buttonHeld')

        await context.api.subscriptions.subscribeToDevices(context.config.triggerButton, 'button', 'button.level', 'buttonHeld')

    })

    .subscribedEventHandler('buttonHeld', (context, event) => {
        
        this.setColor()
        

	})

    .subscribedEventHandler('buttonPushed', (context, event) => {
        
        let currentButtonNumber = this.parseJson(args.data).buttonNumber
        switch ( currentButtonNumber ) {
        case 1:
        this.toggleOnOff()
        break
        case 2:
        this.setTemperature()
        break
        }
        

	})
