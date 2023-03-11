
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('codereturn', (context, event) => {
        
                String msg 
                let codenumber = event.data.replaceAll('\D+', '')
                if (codenumber == '') {
                    msg = "MultiUserLockCodeSetup>request to delete user ${event.value} is now completed"
                } else {
                    msg = "MultiUserLockCodeSetup>request to set code $codenumber for user ${event.value} is now completed"
                }
                this.send(msg)
            

	})
