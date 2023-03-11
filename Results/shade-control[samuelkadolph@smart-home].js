
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('What shades do you want to control?', section => {
            section.deviceSetting('shades').capability(['windowShade']).name('Open and close these shades');

        });


        page.section('Which switches do you want to use?', section => {
            section.deviceSetting('switches').capability(['switch']).name('Controlled by these switches');

        });


    })
