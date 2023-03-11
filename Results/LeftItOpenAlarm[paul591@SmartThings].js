
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor this door or window', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('');

        });


        page.section('And notify me if it\'s open for more than this many minutes (default 1)', section => {
            section.numberSetting('openThreshold').name('');

        });


        page.section('Sound this Alarm unil its closed', section => {
            section.deviceSetting('alarm').capability(['alarm']).name('');

        });


        page.section('Alarm only (no Strobe)', section => {

        });


    })

    .updated(async (context, updateData) => {

    })
