
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sunrise', section => {

        });


        page.section('SunriseOffset', section => {
            section.numberSetting('sunrise_offset').name('Sunrise offset (minutes)');

        });


        page.section('When mode change, turn off...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Sunset', section => {

        });


        page.section('SunsetOffset', section => {

        });


        page.section('When mode change, turn on...', section => {
            section.deviceSetting('switches2').capability(['switch']).name('');

        });


        page.section('Miscellaneous', section => {
            section.numberSetting('zip').name('Zip Code');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('timezone)', delay);

        context.api.schedules.schedule('sunset', delay);

        context.api.schedules.schedule('sunrise', delay);

    })
