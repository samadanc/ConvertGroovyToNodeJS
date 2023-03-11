
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which Thermostat', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Monitor the temperature...', section => {
            section.deviceSetting('temperatureSensor1').capability(['temperatureMeasurement']).name('');

        });


        page.section('What is the desired room temperature', section => {
            section.numberSetting('temperature1').name('Temperature?');

        });


        page.section(''Sunday'', section => {

        });


        page.section('Heating on periods', section => {
            section.timeSetting('startTime1').name('Turn On Period 1?');
            section.timeSetting('stopTime1').name('Turn Off Period 1?');
            section.timeSetting('startTime2').name('Turn On Period 2?');
            section.timeSetting('stopTime2').name('Turn Off Period 2?');

        });


        page.section(''Monday'', section => {

        });


        page.section('Heating on periods', section => {
            section.timeSetting('startTime3').name('Turn On Period 1?');
            section.timeSetting('stopTime3').name('Turn Off Period 1?');
            section.timeSetting('startTime4').name('Turn On Period 2?');
            section.timeSetting('stopTime4').name('Turn Off Period 2?');

        });


        page.section(''Tuesday'', section => {

        });


        page.section('Heating on periods', section => {
            section.timeSetting('startTime5').name('Turn On Period 1?');
            section.timeSetting('stopTime5').name('Turn Off Period 1?');
            section.timeSetting('startTime6').name('Turn On Period 2?');
            section.timeSetting('stopTime6').name('Turn Off Period 2?');

        });


        page.section(''Wednesday'', section => {

        });


        page.section('Heating on periods', section => {
            section.timeSetting('startTime7').name('Turn On Period 1?');
            section.timeSetting('stopTime7').name('Turn Off Period 1?');
            section.timeSetting('startTime8').name('Turn On Period 2?');
            section.timeSetting('stopTime8').name('Turn Off Period 2?');

        });


        page.section(''Thursday'', section => {

        });


        page.section('Heating on periods', section => {
            section.timeSetting('startTime9').name('Turn On Period 1?');
            section.timeSetting('stopTime9').name('Turn Off Period 1?');
            section.timeSetting('startTime10').name('Turn On Period 2?');
            section.timeSetting('stopTime10').name('Turn Off Period 2?');

        });


        page.section(''Friday'', section => {

        });


        page.section('Heating on periods', section => {
            section.timeSetting('startTime11').name('Turn On Period 1?');
            section.timeSetting('stopTime11').name('Turn Off Period 1?');
            section.timeSetting('startTime12').name('Turn On Period 2?');
            section.timeSetting('stopTime12').name('Turn Off Period 2?');

        });


        page.section(''Saturday'', section => {

        });


        page.section('Heating on periods', section => {
            section.timeSetting('startTime13').name('Turn On Period 1?');
            section.timeSetting('stopTime13').name('Turn Off Period 1?');
            section.timeSetting('startTime14').name('Turn On Period 2?');
            section.timeSetting('stopTime14').name('Turn Off Period 2?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

    })

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        Calendar cal = Calendar.getInstance()
        log.trace('scheduledCheck')
        let day = cal.get(Calendar.DAY_OF_WEEK)
        log.trace("$day")
        if (day == 1) {
        Date d = new Date(this.now())
        log.trace("$timeOfDayStart")
        log.trace("$d")
        if (this.check(startTime1, stopTime1) || this.check(startTime2, stopTime2)) {
        if (temperatureSensor1.currentTemperature < temperature1 ) {
        this.switchOn()
        } else {
        this.switchOff()
        }
        } else {
        this.switchOff()
        }
        } else {
        if (day == 2) {
        Date d = new Date(this.now())
        log.trace("$d")
        if (this.check(startTime3, stopTime3) || this.check(startTime4, stopTime4)) {
        if (temperatureSensor1.currentTemperature < temperature1 ) {
        this.switchOn()
        } else {
        this.switchOff()
        }
        } else {
        this.switchOff()
        }
        } else {
        if (day == 3) {
        Date d = new Date(this.now())
        log.trace("$timeOfDayStart")
        log.trace("$d")
        if (this.check(startTime5, stopTime5) || this.check(startTime6, stopTime6)) {
        if (temperatureSensor1.currentTemperature < temperature1 ) {
        this.switchOn()
        } else {
        this.switchOff()
        }
        } else {
        this.switchOff()
        }
        } else {
        if (day == 4) {
        Date d = new Date(this.now())
        log.trace("$timeOfDayStart")
        log.trace("$d")
        if (this.check(startTime7, stopTime7) || this.check(startTime8, stopTime8)) {
        if (temperatureSensor1.currentTemperature < temperature1 ) {
        this.switchOn()
        } else {
        this.switchOff()
        }
        } else {
        this.switchOff()
        }
        } else {
        if (day == 5) {
        Date d = new Date(this.now())
        log.trace("$timeOfDayStart")
        log.trace("$d")
        if (this.check(startTime9, stopTime9) || this.check(startTime10, stopTime10)) {
        if (temperatureSensor1.currentTemperature < temperature1 ) {
        this.switchOn()
        } else {
        this.switchOff()
        }
        } else {
        this.switchOff()
        }
        } else {
        if (day == 6) {
        Date d = new Date(this.now())
        log.trace("$timeOfDayStart")
        log.trace("$d")
        if (this.check(startTime11, stopTime11) || this.check(startTime12, stopTime12)) {
        if (temperatureSensor1.currentTemperature < temperature1 ) {
        this.switchOn()
        } else {
        this.switchOff()
        }
        } else {
        this.switchOff()
        }
        } else {
        if (day == 7) {
        Date d = new Date(this.now())
        log.trace("$timeOfDayStart")
        log.trace("$d")
        if (this.check(startTime13, stopTime13) || this.check(startTime14, stopTime14)) {
        if (temperatureSensor1.currentTemperature < temperature1 ) {
        this.switchOn()
        } else {
        this.switchOff()
        }
        } else {
        this.switchOff()
        }
        }
        }
        }
        }
        }
        }
        }
        

	})
