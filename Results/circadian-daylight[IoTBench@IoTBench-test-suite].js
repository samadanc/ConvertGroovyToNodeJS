
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Thank you for installing Circadian Daylight! This application dims and adjusts the color temperature of your lights to match the state of the sun, which has been proven to aid in cognitive functions and restfulness. The default options are well suited for most users, but feel free to tweak accordingly!'', section => {

        });


        page.section('Control these bulbs; Select each bulb only once', section => {
            section.deviceSetting('ctbulbs').capability(['colorTemperature']).name('Which Temperature Changing Bulbs?');
            section.deviceSetting('bulbs').capability(['colorControl']).name('Which Color Changing Bulbs?');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Which Dimmers?');

        });


        page.section('What are your \'Sleep\' modes? The modes you pick here will dim your lights and filter light to a softer, yellower hue to help you fall asleep easier. Protip: You can pick \'Nap\' modes as well!', section => {

        });


        page.section('Override Constant Brightness (default) with Dynamic Brightness? If you\'d like your lights to dim as the sun goes down, override this option. Most people don\'t like it, but it can look good in some settings.', section => {
            section.booleanSetting('dbright').name('On or off?');

        });


        page.section('Override night time Campfire (default) with Moonlight? Circadian Daylight by default is easier on your eyes with a yellower hue at night. However if you\'d like a whiter light instead, override this option. Note: this will likely disrupt your circadian rhythm.', section => {
            section.booleanSetting('dcamp').name('On or off?');

        });


        page.section('Override night time Dimming (default) with Rhodopsin Bleaching? Override this option if you would not like Circadian Daylight to dim your lights during your Sleep modes. This is definitely not recommended!', section => {
            section.booleanSetting('ddim').name('On or off?');

        });


        page.section('Disable Circadian Daylight when the following switches are on:', section => {
            section.deviceSetting('dswitches').capability(['switch']).name('Switches');

        });


    })
