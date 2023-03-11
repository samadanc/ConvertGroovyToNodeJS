
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor this switch', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


        page.section('And notify me if it\'s on for more than this many minutes (default 10)', section => {
            section.numberSetting('onThreshold').name('');

        });


        page.section('Delay between notifications (default 10 minutes', section => {
            section.numberSetting('frequency').name('Number of minutes');

        });


        page.section('Via text message at this number (or via push notification if not specified', section => {

        });


    })

    .updated(async (context, updateData) => {

    })
