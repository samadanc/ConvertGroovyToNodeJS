
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Allow these things to be exposed via JSON...'', section => {

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('dataChangeHandler', (context, event) => {
        
            

	})
