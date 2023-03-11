
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('pollCodeReport', (context, event) => {
        
                let needPoll = false
                let children = this.getChildApps()
                let codeData = new JsonSlurper().parseText(event.data)
                let currentLock = locks.find({ 
                    it.id == event.deviceId
                })
                this.populateDiscovery(codeData, currentLock)
                console.log('checking children for errors')
                children.each({ let child ->
                    child.pollCodeReport(evt)
                    if (child.isInErrorLoop(event.deviceId)) {
                        console.log('child is in error loop')
                        needPoll = true
                    }
                })
                let unmangedCodesNotReady = false
                if (overwriteMode) {
                    unmangedCodesNotReady = this.removeUnmanagedCodes(evt)
                }
                if (needPoll || unmangedCodesNotReady ) {
                    console.log('asking for poll!')
                    this.runIn(20, doPoll)
                }
            

	})

    .subscribedEventHandler('updateCode', (context, event) => {
        
                let codeNumber = event.data.replaceAll('\D+', '')
                let codeSlot = event.integerValue.toInteger()
                let lock = event.device
                state."lock${lock.id}".codes[ codeSlot ] = codeNumber 
                let childApp = this.findAssignedChildApp(lock, codeSlot)
                if (childApp) {
                    childApp.setKnownCode(codeNumber, lock)
                }
            

	})
