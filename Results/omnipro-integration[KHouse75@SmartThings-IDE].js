
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Settings', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('subscribeController', delay);

    })
