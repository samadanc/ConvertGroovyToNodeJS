
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('solid color time', section => {
            section.numberSetting('seconds').name('Seconds?');

        });


        page.section('fade color time', section => {
            section.numberSetting('secondsFade').name('Seconds?');

        });


        page.section('When this switch is active', section => {
            section.deviceSetting('thetrigger').capability(['switch']).name('');

        });


        page.section('Change the color of this light', section => {
            section.deviceSetting('theswitch').capability(['colorControl']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thetrigger, 'switch', 'switch.on', 'colorChangeStartHandler')

    })

    .subscribedEventHandler('colorChangeStartHandler', (context, event) => {
        
        console.log("switchColorOnHandler called: $evt")
        
        context.api.devices.sendCommands(context.config.thetrigger, 'switch', currentValue)
    
        console.log("the trigger is currently $switchState")
        if
        console.log('in if loop')
        this.firstColor()
        }
        

	})
