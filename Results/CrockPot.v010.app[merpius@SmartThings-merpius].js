
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Crockpot Cooking Info...', section => {
            section.timeSetting('startTime').name('Start time...');
            section.textSetting('meal').name('Meal name (optional)...');

        });


        page.section('CrockPot Notifications', section => {

        });


        page.section('CrockPot Controller Switch', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })
