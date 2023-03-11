
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I push a button on this remote', section => {
            section.deviceSetting('button').capability(['button']).name('Device');
            section.numberSetting('whichButton').name('Which button');

        });


        page.section('When I push the button', section => {
            section.deviceSetting('switchOn').capability(['switch']).name('Turn on switches');
            section.deviceSetting('switchOff').capability(['switch']).name('Turn off switches');

        });


        page.section('When I hold the button', section => {
            section.deviceSetting('heldSwitchOn').capability(['switch']).name('Turn on switches');
            section.deviceSetting('heldSwitchOff').capability(['switch']).name('Turn off switches');

        });


        page.section('Only during a certain time', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


    })
