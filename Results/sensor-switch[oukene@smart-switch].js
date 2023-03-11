
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
                this.log("${event.name} : ${event.value} : $sensorAction : $reactionValue")
                if (event.value == sensorAction && reactionValue == 'on') {
                    if (isAllDevices && !(this.isAllDevicesConditionCheck(event.value))) {
                        return null
                    }
                    this.unschedule(switchOff)
                    let isBetween = true
                    if (null != startTime && null != endTime ) {
                        isBetween = this.timeOfDayIsBetween(startTime, endTime, new Date(), location.timeZone)
                    }
                    this.log("between: $isBetween")
                    if (isBetween) {
                        this.log('main switch: ' + main_switch.currentState('switch').value)
                        this.log('light_meter: ' + light_meter )
                        if (main_switch.currentSwitch == 'off' && light_meter == null || light_meter != null && light_meter.currentIlluminance <= lux_max ) {
                            state.autoMode = true
                            this.switchOn()
                        }
                        this.log('main switch on')
                    }
                } else {
                    if (event.value == sensorAction && reactionValue == 'toggle') {
                        let isBetween = true
                        if (null != startTime && null != endTime ) {
                            isBetween = this.timeOfDayIsBetween(startTime, endTime, new Date(), location.timeZone)
                        }
                        this.log("between: $isBetween")
                        if (isBetween) {
                            main_switch.currentSwitch == 'on' ? this.switchOff() : this.switchOn()
                        }
                    } else {
                        if (event.value == sensorAction && reactionValue == 'off') {
                            this.switchOff()
                        } else {
                            if (event.value != sensorAction ) {
                                if (reactionValue == 'on') {
                                    if (state.autoMode == true) {
                                        if (sensorType != 'button') {
                                            if (isAllDevices_off && !(this.isAllDevicesConditionCheck(event.value))) {
                                                return null
                                            }
                                            this.log("scheduled off : $stay seconds")
                                            if (0 == stay ) {
                                                this.runIn(stay, switchOff, ['overwrite': true])
                                            } else {
                                                this.schedule(this.now() + stay * 1000, switchOff)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('switch_on_handler', (context, event) => {
        
                this.log("switch_on_handler called: $evt")
            

	})

    .subscribedEventHandler('switch_off_handler', (context, event) => {
        
                this.log("switch_off_handler called: $evt")
                state.autoMode = false
            

	})
