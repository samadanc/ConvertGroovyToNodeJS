
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose hue lights you wish to control?', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Color Changing Bulbs?');
            section.numberSetting('brightnessLevel').name('Brightness Level (1-100)?');
            section.numberSetting('saturationLevel').name('Saturation Level (1-100)?');

        });


        page.section('Speed', section => {
            section.numberSetting('speed').name('Speed (1-10)');

        });


        page.section('Enabled/Disabled', section => {
            section.deviceSetting('enableswitch').capability(['switch']).name('Optional: Do you have a switch/virtual switch which the application enable/disable functionality should follow? If you do not want this feature leave blank.');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.enableswitch, 'switch', 'switch', 'EnableSwitchHandler')

    })

    .subscribedEventHandler('EnableSwitchHandler', (context, event) => {
        
        if (event.value == 'on') {
        console.log('Enabling App!')
        this.StartLoop()
        } else {
        console.log('Disabling App!')
        this.StopLoop()
        }
        

	})
