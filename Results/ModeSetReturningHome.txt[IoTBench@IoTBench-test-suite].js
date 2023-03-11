
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When who arrives home...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Monday thru Friday Schedule:', section => {
            section.timeSetting('time1').name('Morning');
            section.timeSetting('time2').name('Day');
            section.timeSetting('time3').name('Evening');
            section.timeSetting('time4').name('Night');

        });


        page.section('Saturday and Sunday Schedule:', section => {
            section.timeSetting('time11').name('Morning');
            section.timeSetting('time21').name('Day');
            section.timeSetting('time31').name('Evening');
            section.timeSetting('time41').name('Night');

        });


        page.section('Zip code:', section => {
            section.textSetting('zip').name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence.present', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        this.unschedule()
        let calendar = Calendar.getInstance()
        calendar.setTimeZone(location.timeZone)
        let today = calendar.get(Calendar.DAY_OF_WEEK)
        let timeNow = this.now()
        let homeMode
        let midnightToday = this.timeToday('2000-01-01T23:59:59.999-0000', location.timeZone)
        let midnightYesturday = this.timeToday('2000-01-01T23:59:59.999-0000', location.timeZone) - 1
        let sunMode
        let zip = (settings.zip as String)
        let sunInfo = this.getSunriseAndSunset(['zipCode': zip ])
        if (sunInfo.sunrise.time < timeNow && sunInfo.sunset.time > timeNow ) {
        sunMode = 'up'
        } else {
        sunMode = 'down'
        }
        let sunsetToday = sunInfo.sunset
        console.log("Current time is ${new Date(timeNow).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        console.log("Midnight today is ${midnightToday.format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        console.log("Midnight yesturday was ${midnightYesturday.format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        console.log("Smart House's current system mode is ${location.mode}")
        console.log("Smart House's zip code is $zip")
        console.log("The sun is currently $sunMode")
        console.log("Sunset today is at ${sunsetToday.format(HH:mm z, location.timeZone)}")
        log.trace("Weekday Morning ${this.timeToday(time1, location.timeZone).format(HH:mm z, location.timeZone)}")
        log.trace("Weekday Day ${this.timeToday(time2, location.timeZone).format(HH:mm z, location.timeZone)}")
        log.trace("Weekday Evening ${this.timeToday(time3, location.timeZone).format(HH:mm z, location.timeZone)}")
        log.trace("Weekday Night ${this.timeToday(time4, location.timeZone).format(HH:mm z, location.timeZone)}")
        log.trace("Weekend Morning ${this.timeToday(time11, location.timeZone).format(HH:mm z, location.timeZone)}")
        log.trace("Weekend Day ${this.timeToday(time21, location.timeZone).format(HH:mm z, location.timeZone)}")
        log.trace("Weekend Evening ${this.timeToday(time31, location.timeZone).format(HH:mm z, location.timeZone)}")
        log.trace("Weekend Night ${this.timeToday(time41, location.timeZone).format(HH:mm z, location.timeZone)}")
        switch ( today ) {
        case Calendar.MONDAY:
        case Calendar.TUESDAY:
        case Calendar.WEDNESDAY:
        case Calendar.THURSDAY:
        case Calendar.FRIDAY:
        if (timeNow >= midnightToday - 1.time && timeNow < this.timeToday(time1, location.timeZone).time) {
        homeMode = 'Night'
        } else {
        if (timeNow >= this.timeToday(time1, location.timeZone).time && timeNow < this.timeToday(time2, location.timeZone).time) {
        homeMode = 'Morning'
        } else {
        if (timeNow >= this.timeToday(time2, location.timeZone).time && timeNow < this.timeToday(time3, location.timeZone).time) {
        homeMode = 'Weekday'
        } else {
        if (timeNow >= this.timeToday(time3, location.timeZone).time && timeNow < sunsetToday.time) {
        homeMode = 'Evening'
        } else {
        if (timeNow >= sunsetToday.time && timeNow < midnightToday.time) {
        homeMode = 'Night'
        }
        }
        }
        }
        }
        if (location.modes?.find({
        it.name == homeMode
        })) {
        this.sendPush("Changing mode to $homeMode, welcome back!")
        this.setLocationMode(homeMode)
        break
        }
        case Calendar.SATURDAY:
        case Calendar.SUNDAY:
        if (timeNow >= midnightToday - 1.time && timeNow < this.timeToday(time11, location.timeZone).time) {
        homeMode = 'Night'
        } else {
        if (timeNow >= this.timeToday(time11, location.timeZone).time && timeNow < this.timeToday(time21, location.timeZone).time) {
        homeMode = 'Morning'
        } else {
        if (timeNow >= this.timeToday(time21, location.timeZone).time && timeNow < this.timeToday(time31, location.timeZone).time) {
        homeMode = 'Weekend'
        } else {
        if (timeNow >= this.timeToday(time31, location.timeZone).time && timeNow < sunsetToday.time) {
        homeMode = 'Evening'
        } else {
        if (timeNow >= sunsetToday.time && timeNow < midnightToday.time) {
        homeMode = 'Night'
        }
        }
        }
        }
        }
        if (location.modes?.find({
        it.name == homeMode
        })) {
        this.sendPush("Changing mode to $homeMode, welcome back!")
        this.setLocationMode(homeMode)
        }
        break
        }
        

	})
