
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkTimeHandler', delay);

    })

    .subscribedEventHandler('trafficCheck', (context, event) => {
        
        if (starting && ending ) {
        console.log("Restrictions: App Active: $activeApp | people: $people | modes: $modes | days: $days | starting: ${this.hhmm(starting)} | ending: ${this.hhmm(ending)}")
        } else {
        if (starting && ending == null) {
        console.log("Restrictions: App Active: $activeApp | people: $people | modes: $modes | days: $days | starting: ${this.hhmm(starting)} | ending: None Selected")
        } else {
        if (starting == null && ending ) {
        console.log("Restrictions: App Active: $activeApp | people: $people | modes: $modes | days: $days | starting: None Selected | ending: ${this.hhmm(ending)}")
        } else {
        console.log("Restrictions: App Active: $activeApp | people: $people | modes: $modes | days: $days | starting: None Selected | ending: None Selected")
        }
        }
        }
        if (checkTime) {
        console.log("Triggers: App Active: $activeApp | motions: $motions | contactOpen: $contactOpen | contactClosed $contactClosed | momentary: $trigger | Start Checking: ${this.hhmm(checkTime)}")
        } else {
        console.log("Triggers: App Active: $activeApp | motions: $motions | contactOpen: $contactOpen | contactClosed $contactClosed | momentary: $trigger | Start Checking: Not Selected")
        }
        log
        if (allOk) {
        if (state.travelTimeTraffic) {
        java.lang.Integer timeLeft = this.getTimeLeft()
        if (timeLeft != null) {
        let runCheck = timeLeft - notifyLead
        if (runCheck > notifyLead ) {
        console.log("First Notify Threshold: $runCheck")
        console.log('Recheck in  ' + runCheck - 6 + ' minutes')
        this.unschedule(trafficCheck)
        this.runIn(runCheck - 6 * 60, trafficCheck)
        state.check = null
        state.notify = null
        state.notifyWarn = null
        state.notifyEmergency = null
        state.notifyNow = null
        state.trafficCheck = null
        }
        }
        if (timeLeft <= 0) {
        if (state.notifyNow != 'true') {
        let timeLeftFixed = -1 * timeLeft
        state.msg = "Attention: With current traffic conditions you will be $timeLeftFixed minutes late for $location2a. Total travel time with traffic is ${state.travelTimeTraffic} minutes."
        log.info("MSG 1[Running Late]: Attention - With current traffic conditions you will be $timeLeftFixed minutes late for $location2a. Total travel time with traffic is ${state.travelTimeTraffic} minutes.")
        this.getNotified()
        state.check = null
        state.notify = null
        state.notifyWarn = null
        state.notifyEmergency = null
        state.notifyNow = 'true'
        if (hues) {
        this.sendcolor(colorEmergency)
        }
        if (state.trafficCheck != true) {
        this.runEvery5Minutes(trafficCheck)
        state.trafficCheck = true
        }
        }
        } else {
        if (timeLeft <= notifyLeadEmergency ) {
        state.msg = "You have $timeLeft minutes until you need to leave $location1a for $location2a. Total travel time with traffic is ${state.travelTimeTraffic} minutes."
        log.info("MSG 2[Notify within $notifyLeadEmergency Minutes]: You have $timeLeft minutes until you need to leave $location1a for $location2a. Total travel time with traffic is ${state.travelTimeTraffic} minutes.")
        this.getNotified()
        if (state.notifyEmergency != 'true') {
        state.check = null
        state.notify = null
        state.notifyWarn = null
        state.notifyNow = null
        state.notifyEmergency = 'true'
        if (hues) {
        this.sendcolor(colorEmergency)
        }
        if (state.trafficCheck != true) {
        this.runEvery5Minutes(trafficCheck)
        state.trafficCheck = true
        }
        }
        } else {
        if (timeLeft <= notifyLeadWarn ) {
        state.msg = "You have $timeLeft minutes until you need to leave $location1a for $location2a. Total travel time with traffic is ${state.travelTimeTraffic} minutes."
        log.info("MSG 3[Notify within $notifyLeadWarn Minutes]: You have $timeLeft minutes until you need to leave $location1a for $location2a. Total travel time with traffic is ${state.travelTimeTraffic} minutes.")
        this.getNotified()
        if (state.notifyWarn != 'true') {
        state.check = null
        state.notify = null
        state.notifyNow = null
        state.notifyWarn = 'true'
        state.notifyEmergency = null
        if (hues) {
        this.sendcolor(colorWarn)
        }
        if (state.trafficCheck != true) {
        this.runEvery5Minutes(trafficCheck)
        state.trafficCheck = true
        }
        }
        } else {
        if (timeLeft <= notifyLead ) {
        state.msg = "You have $timeLeft minutes until you need to leave $location1a for $location2a. Total travel time with traffic is ${state.travelTimeTraffic} minutes."
        log.info("MSG 4[Notify within $notifyLead Minutes]: You have $timeLeft minutes until you need to leave $location1a for $location2a. Total travel time with traffic is ${state.travelTimeTraffic} minutes.")
        this.getNotified()
        if (state.notify != 'true') {
        state.check = null
        state.notify = 'true'
        state.notifyWarn = null
        state.notifyNow = null
        state.notifyEmergency = null
        if (hues) {
        this.sendcolor(colorNotify)
        }
        if (state.trafficCheck != true) {
        this.runEvery5Minutes(trafficCheck)
        state.trafficCheck = true
        }
        }
        } else {
        if (state.notify == 'true' || state.notifyWarn == 'true' || state.notifyEmergency == 'true' && state.check != 'true') {
        state.msg = "Traffic conditions seem to have improved.  You now have $timeLeft minutes to leave $location1a for $location2a. Total travel time with traffic is ${state.travelTimeTraffic} minutes."
        log.info("MSG 5[Improved]: Traffic conditions seem to have improved.  You now have $timeLeft minutes to leave $location1a for $location2a. Total travel time with traffic is ${state.travelTimeTraffic} minutes.")
        this.getNotified()
        state.check = 'true'
        state.notify = null
        state.notifyWarn = null
        state.notifyNow = null
        state.notifyEmergency = null
        this.sendcolor(colorNormal)
        if (hues) {
        hues.off(['delay': 5000])
        }
        if (state.trafficCheck != true) {
        this.runEvery5Minutes(trafficCheck)
        state.trafficCheck = true
        }
        } else {
        if (state.check != 'greeting') {
        state.msg = "You have $timeLeft minutes to leave $location1a for $location2a. Total travel time with traffic is ${state.travelTimeTraffic} minutes."
        log.info("MSG 6[Greeting]: You have $timeLeft minutes to leave $location1a for $location2a. Total travel time with traffic is ${state.travelTimeTraffic} minutes.")
        this.getNotified()
        state.check = 'greeting'
        state.notify = null
        state.notifyWarn = null
        state.notifyEmergency = null
        state.notifyNow = null
        if (state.trafficCheck != true) {
        this.runEvery5Minutes(trafficCheck)
        state.trafficCheck = true
        }
        }
        }
        }
        }
        }
        }
        } else {
        log.info('I do not have a travel time so I will look it up.')
        log.info('Check 7:Getting Details')
        if (travelTimeTraffic == null) {
        log.info('Check 7A:Getting Travel Time')
        this.totalTravelTime()
        }
        if (state.trafficCheck != true) {
        log.info('Check 7B: Next Traffic Check within 5 Minutes')
        this.runEvery5Minutes(trafficCheck)
        state.trafficCheck = true
        }
        }
        } else {
        log.info('Travel App is currently inactive.  Restrictions prevent it from running')
        this.unschedule(trafficCheck)
        state.clear()
        if (activeApp == false) {
        }
        }
        

	})

    .scheduledEventHandler('checkTimeHandler', (context, event) => {
        
        if (ending < checkTime || starting > checkTime ) {
        log.info('Alert: The Time Trigger for the app is outside of your time restriction range.  Please update the app.')
        }
        if (this.now() > this.timeToday(checkTime).time && this.now() < this.timeToday(mytime).time) {
        console.log("Begin checking Travel Time with Traffic to $location2a." + ' Desired Arrival Time: ' + this.hhmm(mytime))
        this.trafficCheck()
        } else {
        console.log('Its not time anymore (checkTimeHandler).')
        this.initialize()
        }
        

	})
