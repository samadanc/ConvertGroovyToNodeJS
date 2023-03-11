
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sunrise', section => {

        });


        page.section('Sunset', section => {

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
