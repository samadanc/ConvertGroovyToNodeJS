
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('discoverBridges', delay);

    })

    .scheduledEventHandler('discoverBridges', (context, event) => {
        
                let params = ['uri': 'https://factory.nuki.io/discover/bridges', 'contentType': 'application/json']
                console.log("Querying ${params.uri}")
                asynchttp_v1.get('onBridgeDiscovered', params)
                state.discovering = true
            

	})
