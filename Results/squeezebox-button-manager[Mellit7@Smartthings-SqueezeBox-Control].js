
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the Squeezebox player you wish to control', section => {
            section.deviceSetting('thePlayer').capability(['musicPlayer']).name('Player?');

        });


        page.section('Select the button to be used to start playing', section => {
            section.deviceSetting('playControl').capability(['momentary']).name('Play Control Button?');

        });


        page.section('Select the button to be used to pause', section => {
            section.deviceSetting('pauseControl').capability(['momentary']).name('Pause Control Button?');

        });


        page.section('Select the button to be used to stop playing', section => {
            section.deviceSetting('stopControl').capability(['momentary']).name('Stop Control Button?');

        });


        page.section('Select the button to be used to load Preset 1', section => {
            section.deviceSetting('button1Control').capability(['momentary']).name('Preset 1 Control Button?');

        });


        page.section('Select the button to be used to load Preset 2', section => {
            section.deviceSetting('button2Control').capability(['momentary']).name('Preset 2 Control Button?');

        });


        page.section('Select the button to be used to load Preset 3', section => {
            section.deviceSetting('button3Control').capability(['momentary']).name('Preset 3 Control Button?');

        });


        page.section('Select the button to be used to increase volumne', section => {
            section.deviceSetting('volUpControl').capability(['momentary']).name('Volume Up Button?');

        });


        page.section('Select the button to be used to decrease volumne', section => {
            section.deviceSetting('volDownControl').capability(['momentary']).name('Volume Down Button?');

        });


    })
