
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('weekEndMorningSetupHandler', delay);

        context.api.schedules.schedule('nightSetupHandler', delay);

        context.api.schedules.schedule('weekDayMorningSetupHandler', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'sunriseHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunsetHandler')

    })

    .subscribedEventHandler('sunriseHandler', (context, event) => {
        
                console.log('Sun has risen!')
                let messages = 'Sun has risen!'
                if (this.notAway()) {
                    this.setLocationMode('Home')
                    messages = messages + '\n- Set Mode Home'
                    Calendar localCalendar = Calendar.getInstance(TimeZone.getDefault())
                    java.lang.Integer currentDayOfWeek = localCalendar.get(Calendar.DAY_OF_WEEK)
                    let todayOpenTime = null
                    if (currentDayOfWeek == Calendar.instance.MONDAY || currentDayOfWeek == Calendar.instance.TUESDAY || currentDayOfWeek == Calendar.instance.WEDNESDAY || currentDayOfWeek == Calendar.instance.THURSDAY || currentDayOfWeek == Calendar.instance.FRIDAY) {
                        todayOpenTime = this.timeToday(weekDayTime, location.timeZone)
                    } else {
                        todayOpenTime = this.timeToday(weekEndTime, location.timeZone)
                    }
                    let now = new Date()
                    if (now > todayOpenTime ) {
                        shades.open()
                    }
                    messages = messages + "
        Now: $now
        Today open Time: $todayOpenTime"
                }
                this.sendNotificationToContacts(messages, recipients)
            

	})

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
                console.log('Sun has set!')
                this.sendNotificationEvent('Sun has set!')
                let messages = 'Sun has set!'
                if (this.notAway()) {
                    this.setLocationMode('Evening')
                    messages = messages + '\n- Set Mode Evening'
                }
                let timeZone = location.timeZone
                let nightScheduleTime = this.timeToday(nightTime, timeZone)
                let sunTime = new Date()
                let timeAfterSunset = new Date(sunTime.time + minuteAfterSunset * 60 * 1000)
                console.log("Sunset is at $sunTime. Sunset + $minuteAfterSunset = $timeAfterSunset. Schedule time is $nightScheduleTime")
                messages = messages + "
        Sunset is at $sunTime. Sunset + $minuteAfterSunset = $timeAfterSunset.
        Schedule time is $nightScheduleTime"
                if (this.canSchedule()) {
                    if (timeAfterSunset.before(nightScheduleTime)) {
                        console.log("Shades Preset in $minuteAfterSunset min")
                        messages = messages + "
        Shades Preset in $minuteAfterSunset min"
                        this.runIn(minuteAfterSunset * 60, setEveningScene)
                    } else {
                        console.log("Shades Close in $minuteAfterSunset min")
                        messages = messages + "
        Shades Close in $minuteAfterSunset min"
                        this.runIn(minuteAfterSunset * 60, setNightScene)
                    }
                } else {
                    this.sendNotificationEvent('sunsetHandler: Reach Max Schedule!')
                    messages = messages + '\nERROR Reach Max Schedule!'
                }
                this.sendNotificationToContacts(messages, recipients)
            

	})

    .scheduledEventHandler('weekEndMorningSetupHandler', (context, event) => {
        
                console.log('weekEndMorningSetupHandler')
                this.sendNotificationToContacts('Week End Morning Setup!', recipients)
                let now = new Date()
                let sunTime = this.getSunriseAndSunset()
                if (now >= sunTime.sunrise) {
                    shades.open()
                }
            

	})

    .scheduledEventHandler('weekDayMorningSetupHandler', (context, event) => {
        
                console.log('weekDayMorningSetupHandler')
                this.sendNotificationToContacts('Week Day Morning Setup!', recipients)
                let now = new Date()
                let sunTime = this.getSunriseAndSunset()
                if (now >= sunTime.sunrise) {
                    shades.open()
                }
            

	})

    .scheduledEventHandler('nightSetupHandler', (context, event) => {
        
                console.log('NightSetupHandler')
                let messages = 'Night Setup!'
                let now = new Date()
                let sunTime = this.getSunriseAndSunset()
                let timeAfterSunset = new Date(sunTime.sunset.time + minuteAfterSunset * 60 * 1000)
                console.log("Sunset is at ${sunTime.sunset}. Sunset + $minuteAfterSunset = $timeAfterSunset. Current time is $now")
                messages = messages + "
        Sunset is at ${sunTime.sunset}.
        Sunset + $minuteAfterSunset = $timeAfterSunset.
        Current time is $now"
                if (timeAfterSunset.before(now)) {
                    console.log("Sunset + $minuteAfterSunset before Night Setup")
                    messages = messages + "
        Sunset + $minuteAfterSunset before Night Setup"
                    shades.close()
                }
                portelock.lock()
                this.sendNotificationToContacts(messages, recipients)
            

	})
