
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Forecasts'', section => {

        });


        page.section('Location', section => {
            section.textSetting('latitude').name('Latitude');
            section.textSetting('longitude').name('Longitude');

        });


        page.section('Forecast API Key', section => {
            section.textSetting('apikey').name('');

        });


    })

    .updated(async (context, updateData) => {

    })
