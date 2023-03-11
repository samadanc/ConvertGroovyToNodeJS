
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose thermostat (s)', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Switch HVAC mode (auto to cool/heat) based on the outside temperature (optional)', section => {
            section.deviceSetting('temperatureSensor').capability(['temperatureMeasurement']).name('');
            section.numberSetting('temperatureH').name('Switch to heating temperature');
            section.numberSetting('temperatureC').name('Switch to cooling temperature');

        });


        page.section('Monday to Friday Schedule', section => {
            section.timeSetting('time1').name('Wake Time');
            section.numberSetting('tempSetpoint1').name('Wake Heat Temp');
            section.numberSetting('tempSetpointA').name('Wake Cool Temp');
            section.timeSetting('time2').name('Leave Time');
            section.numberSetting('tempSetpoint2').name('Leave Heat Temp');
            section.numberSetting('tempSetpointB').name('Leave Cool Temp');
            section.timeSetting('time3').name('Return Time');
            section.numberSetting('tempSetpoint3').name('Return Heat Temp');
            section.numberSetting('tempSetpointC').name('Return Cool Temp');
            section.timeSetting('time4').name('Sleep Time');
            section.numberSetting('tempSetpoint4').name('Sleep Heat Temp');
            section.numberSetting('tempSetpointD').name('Sleep Cool Temp');

        });


        page.section('Saturday and Sunday Schedule', section => {
            section.timeSetting('time11').name('Wake Time');
            section.numberSetting('tempSetpoint11').name('Wake Heat Temp');
            section.numberSetting('tempSetpointAA').name('Wake Cool Temp');
            section.timeSetting('time21').name('Leave Time');
            section.numberSetting('tempSetpoint21').name('Leave Heat Temp');
            section.numberSetting('tempSetpointBB').name('Leave Cool Temp');
            section.timeSetting('time31').name('Return Time');
            section.numberSetting('tempSetpoint31').name('Return Heat Temp');
            section.numberSetting('tempSetpointCC').name('Return Cool Temp');
            section.timeSetting('time41').name('Sleep Time');
            section.numberSetting('tempSetpoint41').name('Sleep Heat Temp');
            section.numberSetting('tempSetpointDD').name('Sleep Cool Temp');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('initialize', delay);

    })

    .scheduledEventHandler('initialize', (context, event) => {
        
        this.unschedule()
        let calendar = Calendar.getInstance()
        calendar.setTimeZone(location.timeZone)
        let today = calendar.get(Calendar.DAY_OF_WEEK)
        let timeNow = this.now()
        let midnightToday = this.timeToday('2000-01-01T23:59:59.999-0000', location.timeZone)
        console.log("Current time is ${new Date(timeNow).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        console.log("Midnight today is ${midnightToday.format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        log.trace("Weekday schedule1 ${this.timeToday(time1, location.timeZone).format(HH:mm z, location.timeZone)}")
        log.trace("Weekday schedule2 ${this.timeToday(time2, location.timeZone).format(HH:mm z, location.timeZone)}")
        log.trace("Weekday schedule3 ${this.timeToday(time3, location.timeZone).format(HH:mm z, location.timeZone)}")
        log.trace("Weekday schedule4 ${this.timeToday(time4, location.timeZone).format(HH:mm z, location.timeZone)}")
        log.trace("Weekend schedule1 ${this.timeToday(time11, location.timeZone).format(HH:mm z, location.timeZone)}")
        log.trace("Weekend schedule2 ${this.timeToday(time21, location.timeZone).format(HH:mm z, location.timeZone)}")
        log.trace("Weekend schedule3 ${this.timeToday(time31, location.timeZone).format(HH:mm z, location.timeZone)}")
        log.trace("Weekend schedule4 ${this.timeToday(time41, location.timeZone).format(HH:mm z, location.timeZone)}")
        switch ( today ) {
        case Calendar.MONDAY:
        case Calendar.TUESDAY:
        case Calendar.WEDNESDAY:
        case Calendar.THURSDAY:
        if (timeNow >= this.timeToday(time1, location.timeZone).time && timeNow < this.timeToday(time2, location.timeZone).time) {
        this.changeTemp1()
        this.schedule(this.timeToday(time2, location.timeZone), initialize)
        log.info("$thermostat Scheduled next adjustment for ${this.timeToday(time2, location.timeZone).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        } else {
        if (timeNow >= this.timeToday(time2, location.timeZone).time && timeNow < this.timeToday(time3, location.timeZone).time) {
        this.changeTemp2()
        this.schedule(this.timeToday(time3, location.timeZone), initialize)
        log.info("$thermostat Scheduled next adjustment for ${this.timeToday(time3, location.timeZone).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        } else {
        if (timeNow >= this.timeToday(time3, location.timeZone).time && timeNow < this.timeToday(time4, location.timeZone).time) {
        this.changeTemp3()
        this.schedule(this.timeToday(time4, location.timeZone), initialize)
        log.info("$thermostat Scheduled next adjustment for ${this.timeToday(time4, location.timeZone).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        } else {
        if (timeNow >= this.timeToday(time4, location.timeZone).time && timeNow < midnightToday.time) {
        this.changeTemp4()
        this.schedule(this.timeToday(time1, location.timeZone) + 1, initialize)
        log.info("$thermostat Scheduled next adjustment for ${(this.timeToday(time1, location.timeZone) + 1).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        } else {
        if (timeNow >= midnightToday - 1.time && timeNow < this.timeToday(time1, location.timeZone).time) {
        this.changeTemp4()
        this.schedule(this.timeToday(time1, location.timeZone), initialize)
        log.info("$thermostat Scheduled next adjustment for ${this.timeToday(time1, location.timeZone).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        }
        }
        }
        }
        }
        break
        case Calendar.FRIDAY:
        if (timeNow >= this.timeToday(time1, location.timeZone).time && timeNow < this.timeToday(time2, location.timeZone).time) {
        this.changeTemp1()
        this.schedule(this.timeToday(time2, location.timeZone), initialize)
        log.info("$thermostat Scheduled next adjustment for ${this.timeToday(time2, location.timeZone).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        } else {
        if (timeNow >= this.timeToday(time2, location.timeZone).time && timeNow < this.timeToday(time3, location.timeZone).time) {
        this.changeTemp2()
        this.schedule(this.timeToday(time3, location.timeZone), initialize)
        log.info("$thermostat Scheduled next adjustment for ${this.timeToday(time3, location.timeZone).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        } else {
        if (timeNow >= this.timeToday(time3, location.timeZone).time && timeNow < this.timeToday(time4, location.timeZone).time) {
        this.changeTemp3()
        this.schedule(this.timeToday(time4, location.timeZone), initialize)
        log.info("$thermostat Scheduled next adjustment for ${this.timeToday(time4, location.timeZone).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        } else {
        if (timeNow >= this.timeToday(time4, location.timeZone).time && timeNow < midnightToday.time) {
        this.changeTemp4()
        this.schedule(this.timeToday(time11, location.timeZone) + 1, initialize)
        log.info("$thermostat Scheduled next adjustment for ${(this.timeToday(time11, location.timeZone) + 1).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        } else {
        if (timeNow >= midnightToday - 1.time && timeNow < this.timeToday(time11, location.timeZone).time) {
        this.changeTemp4()
        this.schedule(this.timeToday(time11, location.timeZone), initialize)
        log.info("$thermostat Scheduled next adjustment for ${this.timeToday(time11, location.timeZone).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        }
        }
        }
        }
        }
        break
        case Calendar.SATURDAY:
        if (timeNow >= this.timeToday(time11, location.timeZone).time && timeNow < this.timeToday(time21, location.timeZone).time) {
        this.changeTemp11()
        this.schedule(this.timeToday(time21, location.timeZone), initialize)
        log.info("$thermostat Scheduled next adjustment for ${this.timeToday(time21, location.timeZone).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        } else {
        if (timeNow >= this.timeToday(time21, location.timeZone).time && timeNow < this.timeToday(time31, location.timeZone).time) {
        this.changeTemp21()
        this.schedule(this.timeToday(time31, location.timeZone), initialize)
        log.info("$thermostat Scheduled next adjustment for ${this.timeToday(time31, location.timeZone).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        } else {
        if (timeNow >= this.timeToday(time31, location.timeZone).time && timeNow < this.timeToday(time41, location.timeZone).time) {
        this.changeTemp31()
        this.schedule(this.timeToday(time41, location.timeZone), initialize)
        log.info("$thermostat Scheduled next adjustment for ${this.timeToday(time41, location.timeZone).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        } else {
        if (timeNow >= this.timeToday(time41, location.timeZone).time && timeNow < midnightToday.time) {
        this.changeTemp41()
        this.schedule(this.timeToday(time11, location.timeZone) + 1, initialize)
        log.info("$thermostat Scheduled next adjustment for ${(this.timeToday(time11, location.timeZone) + 1).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        } else {
        if (timeNow >= midnightToday - 1.time && timeNow < this.timeToday(time11, location.timeZone).time) {
        this.changeTemp41()
        this.schedule(this.timeToday(time11, location.timeZone), initialize)
        log.info("$thermostat Scheduled next adjustment for ${this.timeToday(time11, location.timeZone).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        }
        }
        }
        }
        }
        break
        case Calendar.SUNDAY:
        if (timeNow >= this.timeToday(time11, location.timeZone).time && timeNow < this.timeToday(time21, location.timeZone).time) {
        this.changeTemp11()
        this.schedule(this.timeToday(time21, location.timeZone), initialize)
        log.info("$thermostat Scheduled next adjustment for ${this.timeToday(time21, location.timeZone).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        } else {
        if (timeNow >= this.timeToday(time21, location.timeZone).time && timeNow < this.timeToday(time31, location.timeZone).time) {
        this.changeTemp21()
        this.schedule(this.timeToday(time31, location.timeZone), initialize)
        log.info("$thermostat Scheduled next adjustment for ${this.timeToday(time31, location.timeZone).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        } else {
        if (timeNow >= this.timeToday(time31, location.timeZone).time && timeNow < this.timeToday(time41, location.timeZone).time) {
        this.changeTemp31()
        this.schedule(this.timeToday(time41, location.timeZone), initialize)
        log.info("$thermostat Scheduled next adjustment for ${this.timeToday(time41, location.timeZone).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        } else {
        if (timeNow >= this.timeToday(time41, location.timeZone).time && timeNow < midnightToday.time) {
        this.changeTemp41()
        this.schedule(this.timeToday(time1, location.timeZone) + 1, initialize)
        log.info("$thermostat Scheduled next adjustment for ${(this.timeToday(time1, location.timeZone) + 1).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        } else {
        if (timeNow >= midnightToday - 1.time && timeNow < this.timeToday(time1, location.timeZone).time) {
        this.changeTemp41()
        this.schedule(this.timeToday(time1, location.timeZone), initialize)
        log.info("$thermostat Scheduled next adjustment for ${this.timeToday(time1, location.timeZone).format(EEE MMM dd yyyy HH:mm z, location.timeZone)}")
        }
        }
        }
        }
        }
        break
        }
        

	})
