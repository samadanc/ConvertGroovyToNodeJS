
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a Door Lock', section => {
            section.deviceSetting('doorlock').capability(['lockCodes']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.doorlock, 'lockCodes', 'codeReport', 'codeReportEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.doorlock, 'lockCodes', 'codeChanged', 'codeChangedEvent')

    })

    .subscribedEventHandler('codeChangedEvent', (context, event) => {
        
        console.log('Code changed')
        console.log(event.value)
        this.sendPostRequest(['type': 'CodeChanged', 'num': event.value])
        

	})

    .subscribedEventHandler('codeReportEvent', (context, event) => {
        
        console.log('Got the code report event')
        console.log(event.jsonData)
        this.sendPostRequest(['type': 'CodeReport', 'locationId': event.locationId, 'locationName': location.name, 'descriptionText': event.descriptionText, 'num': event.value, 'code': event.jsonData.code])
        

	})
