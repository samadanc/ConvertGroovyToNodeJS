
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this sensor has events: (MUX-ed button input)', section => {
            section.deviceSetting('master').capability(['button']).name('Which minimote?');

        });


        page.section('Button 1 controls this virtual button:', section => {
            section.deviceSetting('button1').capability(['button']).name('');

        });


        page.section('Button 2 controls this virtual sensor:', section => {
            section.deviceSetting('button2').capability(['button']).name('');

        });


        page.section('Button 3 controls this virtual sensor', section => {
            section.deviceSetting('button3').capability(['button']).name('');

        });


        page.section('Button 4 controls this virtual sensor', section => {
            section.deviceSetting('button4').capability(['button']).name('');

        });


    })
