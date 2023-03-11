
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

    .subscribedEventHandler('offTestHandler', (context, event) => {
        
                console.log('Switch Off simulate Sunset!')
                this.sunsetHandler(evt)
            

	})

    .subscribedEventHandler('sunriseHandler', (context, event) => {
        
                console.log('Sun has risen!')
                this.sendNotificationEvent('Sun has risen!')
                if (this.notAway()) {
                    this.setLocationMode('Home')
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
                }
            

	})

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
                console.log('Sun has set!')
                this.sendNotificationEvent('Sun has set!')
                if (this.notAway()) {
                    this.setLocationMode('Night')
                }
                let timeZone = location.timeZone
                let nightScheduleTime = this.timeToday(nightTime, timeZone)
                let sunTime = new Date()
                let timeAfterSunset = new Date(sunTime.time + minuteAfterSunset * 60 * 1000)
                console.log("Sunset is at $sunTime. Sunset + $minuteAfterSunset = $timeAfterSunset. Schedule time is $nightScheduleTime")
                if (timeAfterSunset.before(nightScheduleTime)) {
                    console.log("Shades Preset in $minuteAfterSunset min")
                    this.runIn(minuteAfterSunset * 60, setEveningScene)
                } else {
                    console.log("Shades Close in $minuteAfterSunset min")
                    this.runIn(minuteAfterSunset * 60, setNightScene)
                }
            

	})

    .subscribedEventHandler('presenseHandler', (context, event) => {
        
                console.log("presenceHandler ${event.name}: ${event.value}, ${event.displayName}")
                let now = new Date()
                let sunTime = this.getSunriseAndSunset()
                console.log("sunrise and sunset: $sunTime")
                let inNight = now > sunTime.sunset
                let delayForLight = false
                let delayForDoor = false
                if (event.value == 'not present') {
                    console.log('Someone left')
                    let presenceValue = peopleToWatch.find({ 
                        it.currentPresence == 'present'
                    })
                    if (presenceValue) {
                        console.log('Still somebody home - nothing to do')
                    } else {
                        console.log('Everybody as left - Do Goodbye!')
                        if (!(this.visitorAtHome())) {
                            portelock.lock()
                            shades.close()
                            this.setLocationMode('Away')
                            location.helloHome.execute('All Off')
                        }
                    }
                } else {
                    console.log('Someone arrive')
                    if (this.notAway()) {
                        console.log('Somebody already home')
                        if (inNight && avant.currentValue('switch') == 'off') {
                            avant.on()
                            delayForLight = true
                        }
                    } else {
                        console.log('First arrive - Do Hello!')
                        if (inNight) {
                            console.log('Change Mode to Night')
                            this.setLocationMode('Night')
                        } else {
                            console.log('Change Mode to Home')
                            shades.open()
                            this.setLocationMode('Home')
                        }
                        if (inNight) {
                            comptoir.setLevel(20)
                            entree.setLevel(100)
                            if (avant.currentValue('switch') == 'off') {
                                avant.on()
                                delayForLight = true
                            }
                        }
                    }
                    if (inNight) {
                        let lockstatus = portelock.currentValue('lock')
                        if (lockstatus == 'locked') {
                            delayForDoor = true
                        }
                    }
                    portelock.unlock()
                    if (delayForLight) {
                        if (delayForDoor) {
                            this.runIn(delay * 60, globalDelay)
                        } else {
                            this.runIn(delay * 60, closeSwitchsDelay)
                        }
                    } else {
                        if (delayForDoor) {
                            this.runIn(delay * 60, lockDoorDelay)
                        }
                    }
                }
            

	})

    .scheduledEventHandler('weekEndMorningSetupHandler', (context, event) => {
        
                console.log('weekEndMorningSetupHandler')
                this.sendNotificationEvent('Week End Morning Setup!')
                let now = new Date()
                let sunTime = this.getSunriseAndSunset()
                if (now >= sunTime.sunrise) {
                    shades.open()
                }
            

	})

    .scheduledEventHandler('weekDayMorningSetupHandler', (context, event) => {
        
                console.log('weekDayMorningSetupHandler')
                this.sendNotificationEvent('Week Day Morning Setup!')
                let now = new Date()
                let sunTime = this.getSunriseAndSunset()
                if (now >= sunTime.sunrise) {
                    shades.open()
                }
            

	})

    .scheduledEventHandler('nightSetupHandler', (context, event) => {
        
                console.log('NightSetupHandler')
                this.sendNotificationEvent('Night Setup!')
                let now = new Date()
                let sunTime = this.getSunriseAndSunset()
                let timeAfterSunset = new Date(sunTime.sunset.time + minuteAfterSunset * 60 * 1000)
                console.log("Sunset is at ${sunTime.sunset}. Sunset + $minuteAfterSunset = $timeAfterSunset. Current time is $now")
                if (timeAfterSunset.before(now)) {
                    console.log("Sunset + $minuteAfterSunset before Night Setup")
                    shades.close()
                }
                portelock.lock()
            

	})
