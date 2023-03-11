
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('expireCodeCheck', delay);

        context.api.schedules.runIn('appTouch', delay);

    })

    .scheduledEventHandler('appTouch', (context, event) => {
        
                if (action == 'Delete') {
                    for (let lock : locks ) {
                        lock.deleteCode(user)
                        log.info("$lock deleted user: $user")
                        this.sendNotificationEvent("$lock deleted user: $user")
                        this.sendPush("$lock deleted user: $user")
                    }
                    console.log("Removing tracking expiry of user $user")
                    state.codes.remove((user as String))
                } else {
                    for (let lock : locks ) {
                        lock.setCode(user, code)
                        log.info("$lock added user: $user, code: $code")
                        this.sendNotificationEvent("$lock added user: $user")
                        this.sendPush("$lock added user: $user")
                    }
                    if (expDate && expTime ) {
                        let midnightToday = this.timeToday('2000-01-01T00:00:00.000-0000', location.timeZone)
                        let expT = this.timeToday(expTime, location.timeZone).time - midnightToday.time
                        String dst = location.timeZone.getDisplayName(location.timeZone.inDaylightTime(new Date(this.now())), TimeZone.SHORT)
                        let expD = Date.parse('yyyy-MM-dd Z', expDate + ' ' + dst ).toCalendar()
                        let exp = expD.getTimeInMillis() + expT 
                        console.log("Removing any existing tracking expiry of user $user")
                        state.codes.remove((user as String))
                        state.codes.put(user, exp)
                        let expStr = new Date(exp).format('EEE MMM dd yyyy HH:mm z', location.timeZone)
                        log.info("$locks user code expiration set to $expStr")
                        this.sendNotificationEvent("$locks user $user code will expire on $expStr")
                        this.sendPush("$locks user $user code will expire on $expStr")
                    }
                }
            

	})

    .scheduledEventHandler('expireCodeCheck', (context, event) => {
        
                console.log('ExpireCodeCheck called')
                let allCodes = state.codes.collect()
                for (let code : allCodes ) {
                    let expStr = new Date(code.value).format('EEE MMM dd yyyy HH:mm z', location.timeZone)
                    console.log("user ${code.key} expires $expStr")
                    if (code.value < this.now()) {
                        let user = (code.key as Integer)
                        for (let lock : locks ) {
                            lock.deleteCode(user)
                            log.info("$lock deleted expired user: $user")
                            this.sendNotificationEvent("$lock deleted expired user: $user")
                            this.sendPush("$lock deleted expired user: $user")
                        }
                        console.log("Removing tracking of user $user")
                        state.codes.remove((user as String))
                    }
                }
            

	})
