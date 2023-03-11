
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor this Power Meter device', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('');

        });


        page.section('And notify if it\'s been running (greater than 0 watts) for more than this many minutes (default 10)', section => {
            section.numberSetting('runThreshold').name('');

        });


        page.section('Repeat notifications every how many minutes (default 15, or 0 to use running minutes above', section => {
            section.numberSetting('repeatTime').name('Number of minutes');

        });


        page.section('Via text message at this number (or via push notification if not specified', section => {

        });


    })

    .updated(async (context, updateData) => {

    })
