
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor this door or window', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('');

        });


        page.section('And notify me if it\'s open for more than this many minutes (default 10)', section => {
            section.numberSetting('openThreshold').name('');

        });


        page.section('Delay between notifications (default 10 minutes', section => {
            section.numberSetting('frequency').name('Number of minutes');

        });


        page.section('Via text message at this number (or via push notification if not specified', section => {

        });


        page.section('Modes', section => {

        });


    })

    .updated(async (context, updateData) => {

    })
