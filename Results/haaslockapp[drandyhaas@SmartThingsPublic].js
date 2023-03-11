
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('appTouch', delay);

    })

    .scheduledEventHandler('appTouch', (context, event) => {
        
                console.log('app touch')
                for (let lock : locks ) {
                    if (action == 'Delete') {
                        lock.deleteCode(user)
                        log.info("$lock deleted user: $user")
                        this.sendNotificationEvent("$lock deleted user: $user")
                    } else {
                        lock.setCode(user, code)
                        log.info("$lock added user: $user, code: $code")
                        this.sendNotificationEvent("$lock added user: $user")
                    }
                }
            

	})
