
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose hue lights you wish to control?', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Color Changing Bulbs?');
            section.numberSetting('brightnessLevel').name('Brightness Level (1-100)?');

        });


        page.section('Choose cycle time between color changes? ', section => {
            section.enumSetting('cycletime').name('Cycle time in minutes?');

        });


        page.section('Turn Off How Manu Hours before Sunrise?', section => {
            section.enumSetting('offset').name('Turn Off How many hours before sunrise?');

        });


        page.section('Enabled/Disabled', section => {
            section.booleanSetting('enabled').name('Enabled?');
            section.deviceSetting('enableswitch').capability(['switch']).name('Optional: Do you have a switch/virtual switch which the application enable/disable functionality should follow? If you do not want this feature leave blank.');
            section.booleanSetting('randomMode').name('Enable Random Mode?');

        });


        page.section('Colors', section => {
            section.booleanSetting('color_Red').name('Red');
            section.booleanSetting('color_BrickRed').name('Brick Red');
            section.booleanSetting('color_SafetyOrange').name('Safety Orange');
            section.booleanSetting('color_Orange').name('Orange');
            section.booleanSetting('color_Amber').name('Amber');
            section.booleanSetting('color_Yellow').name('Yellow');
            section.booleanSetting('color_Green').name('Green');
            section.booleanSetting('color_Turquoise').name('Turquoise');
            section.booleanSetting('color_Aqua').name('Aqua');
            section.booleanSetting('color_NavyBlue').name('Navy Blue');
            section.booleanSetting('color_Blue').name('Blue');
            section.booleanSetting('color_Indigo').name('Indigo');
            section.booleanSetting('color_Purple').name('Purple');
            section.booleanSetting('color_Pink').name('Pink');
            section.booleanSetting('color_Rasberry').name('Rasberry');
            section.booleanSetting('color_White').name('White');

        });


        page.section(''Additional'', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.enableswitch, 'switch', 'switch', 'EnableSwitchHandler')

    })

    .subscribedEventHandler('EnableSwitchHandler', (context, event) => {
        
        console.log("In Switch Handler: Switch changed state to: ${event.value}")
        if (event.value == 'on') {
        console.log('Enabling App!')
        settings.enabled = true
        this.updated()
        this.TurnOn()
        } else {
        console.log('Disabling App!')
        settings.enabled = false
        this.updated()
        }
        

	})
