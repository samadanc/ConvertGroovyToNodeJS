
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery1Hour('performEveryHourProcessing', delay);

    })

    .scheduledEventHandler('performEveryHourProcessing', (context, event) => {
        
                this.sendLutronHttpGets([['fileBaseName': 'keypads', 'queryStringMap': ['sync': '1']]])
                state.cachedKeypadIDs = null
                state.cachedKeypadLedsStringMap = null
            

	})
