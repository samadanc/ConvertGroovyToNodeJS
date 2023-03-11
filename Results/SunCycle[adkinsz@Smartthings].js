
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Color Changing Lights (RGBW)'', section => {

        });


        page.section('Select Bulbs to control color of and temperature (RGBW)', section => {
            section.deviceSetting('bulbs').capability(['colorControl']).name('Which Color Changing Bulbs?');

        });


        page.section('Switch to control application.', section => {
            section.deviceSetting('appSwitch').capability(['switch']).name('(optional)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.bulbs, 'colorControl', 'switch.on', 'onPowered')

        await context.api.subscriptions.subscribeToDevices(context.config.appSwitch, 'switch', 'switch.on', 'onActivate')

    })

    .subscribedEventHandler('onActivate', (context, event) => {
        
        console.log('Control Switch Activated: Resuming Color Control.')
        this.updateBulbs()
        

	})

    .subscribedEventHandler('onPowered', (context, event) => {
        
        console.log('Monitored Switch Powered')
        this.updateBulbs()
        

	})
