
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('timeStart').name('Starting');
            section.timeSetting('timeEnd').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'AskAlexaMsgQueue', 'msgHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'CoRE', 'coreHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'AskAlexaMsgQueueDelete', 'msgDeleteHandler')

    })

    .subscribedEventHandler('msgHandler', (context, event) => {
        
        if (!state.msgQueue) {
        state.msgQueue = []
        }
        console.log('New message added to message queue from: ' + event.value)
        state.msgQueue << ['date': event.date.getTime(), 'appName': event.value, 'msg': event.descriptionText, 'id': event.unit]
        

	})

    .subscribedEventHandler('coreHandler', (context, event) => {
        
        console.log('Refreshing CoRE Piston List')
        if (event.value == 'refresh') {
        state.CoREPistons = event.jsonData && event.jsonData?.pistons ? event.jsonData.pistons : []
        }
        

	})

    .subscribedEventHandler('msgDeleteHandler', (context, event) => {
        
        if (state.msgQueue && state.msgQueue.size() > 0) {
        if (event.unit && event.value) {
        console.log(event.value + ' is deleting messages from the message queue.')
        state.msgQueue.removeAll({
        it.appName == event.value && it.id == event.unit
        })
        } else {
        console.log('Incorrect delete parameters sent to message queue. Nothing was deleted')
        }
        } else {
        console.log('Message queue is empty. No messages were deleted.')
        }
        

	})
