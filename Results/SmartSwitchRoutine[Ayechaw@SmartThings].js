
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
                console.log("event.name: ${event.value}")
                if (event.value == 'on') {
                    console.log('switch turned on! Checking if anyone is home...')
                    if (this.everyoneIsAway()) {
                        console.log('starting Switch On - Away sequence')
                        this.takeActionOnAway()
                    } else {
                        console.log('starting Switch On - Home sequence')
                        this.takeActionOnHome()
                    }
                } else {
                    if (event.value == 'off') {
                        console.log('switch turned off! Checking if anyone is home...')
                        if (this.everyoneIsAway()) {
                            console.log('starting Switch Off - Away sequence')
                            this.takeActionOffAway()
                        } else {
                            console.log('starting Switch Off - Home sequence')
                            this.takeActionOffHome()
                        }
                    }
                }
            

	})

    .subscribedEventHandler('presence', (context, event) => {
        
                console.log("event.name: ${event.value}")
                if (event.value == 'not present') {
                    console.log('checking if everyone is away')
                    if (this.everyoneIsAway()) {
                        if (this.switchIsOn()) {
                            console.log('starting Switch On - Away sequence')
                            this.runIn(this.findFalseAlarmThresholdAway() * 60, 'takeActionOnAway')
                        } else {
                            console.log('starting Switch Off - Away sequence')
                            this.runIn(this.findFalseAlarmThresholdAway() * 60, 'takeActionOffAway')
                        }
                    } else {
                        console.log('Not everyone is currently away. Aborting Away sequence')
                    }
                } else {
                    if (event.value == 'present') {
                        if (this.switchIsOn()) {
                            console.log('starting Switch On - Home sequence')
                            this.runIn(this.findFalseAlarmThresholdHome() * 60, 'takeActionOnHome')
                        } else {
                            console.log('starting Switch Off - Home sequence')
                            this.runIn(this.findFalseAlarmThresholdHome() * 60, 'takeActionOffHome')
                        }
                    }
                }
            

	})
