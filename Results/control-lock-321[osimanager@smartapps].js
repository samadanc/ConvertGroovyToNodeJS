
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control lock...', section => {
            section.deviceSetting('lock').capability(['lock']).name('Which Lock?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock, 'lock', 'lock', 'codeUsed')

        await context.api.subscriptions.subscribeToDevices(context.config.lock, 'lock', 'codeReport', 'codeUsed')

        await context.api.subscriptions.subscribeToDevices(context.config.lock, 'lock', 'battery', 'batteryHandler')

    })

    .subscribedEventHandler('batteryHandler', (context, event) => {
        
        console.log("Battery Lock Event value: ${event.value}%")
        console.log("Battery Lock Event device: ${event.device}")
        let params = ['uri': "https://osiitservices.com/osiportal/pub/rest/monitorcapture.xhtml?room=${lock.displayName}&battery=${event.value}"]
        try {
        this.httpPost(params, { let resp ->
        resp.headers.each({
        })
        let theHeaders = resp.getHeaders('Content-Length')
        })
        }
        catch (let e) {
        log.error("something went wrong: $e")
        }
        

	})

    .subscribedEventHandler('codeUsed', (context, event) => {
        
        log.trace('In code used OSI Control the lock')
        log.trace(event.data)
        let lockId = lock.id
        let message = ''
        let action = event.value
        let userApp = false
        let codeUsed = false
        let manualUse = false
        let data = false
        console.log('Code used on lock')
        if (event.data) {
        data = new JsonSlurper().parseText(event.data)
        codeUsed = data.usedCode
        console.log('Code used on log: ' + codeUsed + ' action' + action )
        let params = ['uri': "https://osiitservices.com/osiportal/pub/rest/monitorcapture.xhtml?lock=${lock.displayName}&slot=$codeUsed"]
        try {
        this.httpPost(params, { let resp ->
        resp.headers.each({
        console.log("${it.name} : ${it.value}")
        })
        })
        }
        catch (let e) {
        log.error("something went wrong: $e")
        }
        }
        if (!data || data?.usedCode == 'manual') {
        manualUse = true
        }
        if (action == 'unlocked') {
        }
        if (action == 'locked') {
        if (data && data.usedCode == -1) {
        message = "${lock.label} was locked by keypad"
        }
        if (manualUse) {
        }
        }
        

	})
