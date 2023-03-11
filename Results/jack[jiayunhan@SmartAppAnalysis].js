
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('lock1').capability(['lock']).name('Select a lock');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock', 'lockHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'response', 'responseHandler')

    })

    .subscribedEventHandler('responseHandler', (context, event) => {
        
        console.log('[Jack]onResponse')
        

	})

    .subscribedEventHandler('lockHandler', (context, event) => {
        
        let i = this.generateActionId()
        this.enqueueAction(i, 'lock1', 'unlock', '')
        this.sendRequest(url, "id=$i&device=lock1&action=${event.value}&extra=66")
        console.log("Queue ${state.actionQueue[id]}")
        

	})
