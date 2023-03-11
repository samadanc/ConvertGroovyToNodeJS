
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
        console.log("checkDoors: Door $doorName: $doorOpen, previous state: " + state.opened[ doorName ])
        if (doorOpen == 'open' && !(state.opened[ doorName ])) {
        state.threshold = state.threshold + 5
        console.log("checkDoors: Door was closed, is now open.  Threshold check: ${state.threshold} minutes (need " + threshold + 'minutes)')
        if (state.threshold >= threshold ) {
        console.log('checkDoors: Door has been open past threshold, sending an alert')
        this.send("Alert: It's sunset and $doorName is open for $threshold minutes")
        state.opened[ doorName ] = true
        }
        } else {
        if (doorOpen == 'closed' && state.opened[ doorName ]) {
        console.log('checkDoors: Door had been previously open, is now closed')
        this.send("OK: $doorName closed")
        state.opened[ doorName ] = false
        state.threshold = 0
        } else {
        if (doorOpen == 'closed') {
        console.log('checkDoors: Door closed before ' + threshold + " threshold.  Threshold check: ${state.threshold} minutes (threshold reset to 0)")
        state.threshold = 0
        }
        }
        }
        })
        

	})
