
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor this thermostat for a stuck mode', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Which thermostat?');

        });


        page.section('Which operating state to monitor?', section => {
            section.enumSetting('monitorState').name('Which operating state?');

        });


        page.section('And notify me if this hasn\'t changed for more than this many minutes (default 10)', section => {
            section.numberSetting('delayThreshold').name('');

        });


        page.section('Frequency between notifications (default 10 minutes', section => {
            section.numberSetting('frequency').name('Number of minutes');

        });


        page.section('Via text message at this number (or via push notification if not specified', section => {

        });


    })

    .updated(async (context, updateData) => {

    })
