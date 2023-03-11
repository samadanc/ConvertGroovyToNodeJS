
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Change the status of the following Nest...', section => {

        });


        page.section('To home with the following mode...', section => {

        });


        page.section('And to away with the following mode...', section => {

        });


    })

    .updated(async (context, updateData) => {

    })
