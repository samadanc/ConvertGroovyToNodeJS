
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Doors to Monitor', section => {
            section.deviceSetting('doors').capability(['contactSensor']).name('Which doors?');

        });


        page.section('Monitoring Type', section => {
            section.enumSetting('monitoringType').name('Monitoring Type');

        });


        page.section('Time of Day Monitoring', section => {
            section.timeSetting('startMonitoring').name('Start Monitoring (hh:mm 24h)');
            section.timeSetting('stopMonitoring').name('Stop Monitoring (hh:mm 24h)');

        });


        page.section('Sunset Monitoring', section => {
            section.textSetting('sunsetOffsetValue').name('HH:MM');
            section.enumSetting('sunsetOffsetDir').name('Before or After');

        });


        page.section('Zipcode (optional)', section => {
            section.textSetting('zipCode').name('Zip Code');

        });


        page.section('Alert Thresholds', section => {
            section.numberSetting('threshold').name('Minutes (use multiples of 5)');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunriseSunsetTimeHandler')

        context.api.schedules.runEvery5Minutes('checkDoors', delay);

    })

    .subscribedEventHandler('sunriseSunsetTimeHandler', (context, event) => {
        
        log.trace('sunriseSunsetTimeHandler()')
        this.astroCheck()
        

	})

    .scheduledEventHandler('checkDoors', (context, event) => {
        
        console.log("checkDoors: What is timeToClose? ${state.timeToClose}")
        if (monitoringType == 'Time of Day') {
        let currTime = this.now()
        let eveningStartTime = this.timeToday(startMonitoring)
        let morningEndTime = this.timeToday(stopMonitoring)
        state.monitoring = currTime >= eveningStartTime.time || currTime <= morningEndTime.time
        }
        log.info("checkDoors: Should we check? ${state.monitoring}")
        if (!state.monitoring) {
        return null
        }
        doors?.each({ let door ->
        let doorName = door.displayName
        let doorOpen = this.checkDoor(door)
        let readableNowTime = new Date(this.now()).format('yyyy-MM-dd\'T\'HH:mm:ss\'Z\'', TimeZone.getTimeZone('EST'))
        console.log("checkDoors: readableNowTime: $readableNowTime")
        if (doorOpen == 'open') {
        console.log("checkDoors: Should times be set? ${(state.timeToClose == null)}")
        if (state.timeToClose == null) {
        state.timeToClose = new Date(this.now() + 5 * 60 * 1000).format('yyyy-MM-dd\'T\'HH:mm:ss\'Z\'', TimeZone.getTimeZone('EST'))
        }
        console.log("checkDoors: When to close ${state.timeToClose}")
        console.log("checkDoors: state.timeToClose: ${state.timeToClose}")
        console.log("checkDoors: Compare is ${(this.timeToday(state.timeToClose, location.timeZone).time > this.timeToday(readableNowTime, location.timeZone).time)}")
        if (this.timeToday(state.timeToClose, location.timeZone).time < this.timeToday(readableNowTime, location.timeZone).time) {
        console.log('checkDoors: About to close door')
        door.close()
        console.log('checkDoors: Door closing')
        console.log("checkDoors: The Door object is $door")
        this.runIn(60, this.resetDoor())
        } else {
        this.send("Alert: The $doorName is open")
        }
        } else {
        if (doorOpen == 'closed') {
        state.timeToClose = null
        console.log("checkDoors: Door is Closed. Time to close is ${state.timeToClose}")
        }
        }
        console.log('checkDoors: End ' + state.opened[ doorName ])
        })
        

	})
