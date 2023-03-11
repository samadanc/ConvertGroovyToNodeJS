
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When one of these doors opens...', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Where?');

        });


        page.section('And this presence is not detected...', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('Which tag');

        });


        page.section('Turn on these lights after sunset!', section => {
            section.deviceSetting('lights').capability(['switch']).name('');

        });


        page.section('Zip code...', section => {
            section.textSetting('zipcode').name('Zipcode?');

        });


        page.section('Wundergound API key...', section => {
            section.textSetting('apikey').name('API Key?');

        });


    })
