
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('FanEvent', (context, event) => {
        
                state.lastFanTimeStamp = '(' + this.timeStampMMDDHHmm() + ')'
            

	})

    .subscribedEventHandler('MotionEvent', (context, event) => {
        
                state.lastMotionTimeStamp = '(' + this.timeStampMMDDHHmm() + ')'
                if (state.loglevel == 2) {
                    this.DEBUG("Motion Sensor | ${event.value}, LastTrigger:${state.trigger}")
                }
                if (event.value == 'inactive' && state.lastMotionStatus == 'active') {
                    if (state.loglevel == 2) {
                        this.DEBUG('Motion Sensor | Motion inactive triggered')
                    }
                    if (state.mode == 'motion') {
                        this.unschedule()
                        state.offtime = settings.motionOff * 60
                        if (state.loglevel == 2) {
                            this.DEBUG('Motion Sensor | Scheduling off based on motion timer')
                        }
                        this.runIn(state.offtime, 'lightsOut')
                        state.scheduled = true
                    }
                    if (state.mode == 'humidity') {
                        this.unschedule()
                        state.offtime = settings.humidityOff * 60
                        if (state.loglevel == 2) {
                            this.DEBUG('Motion Sensor | Scheduling off based on humidity timer')
                        }
                        this.runIn(state.offtime, 'lightsOut')
                        state.scheduled = true
                    }
                } else {
                    if (event.value == 'active' && state.lastMotionStatus == 'inactive') {
                        if (state.trigger == 'none' || state.trigger == 'manual') {
                            if (state.loglevel == 2) {
                                this.DEBUG('Motion Sensor | Switching trigger from none/manual to motion')
                            }
                            state.trigger = 'motion'
                        }
                        if (state.loglevel == 2) {
                            this.DEBUG('Motion Sensor | Motion active triggered')
                        }
                        if (lightswitch.latestValue('switch') == 'off') {
                            this.lightsOn()
                        }
                        if (state.scheduled) {
                            this.unschedule()
                        }
                    }
                }
                state.lastMotionStatus = event.value
            

	})

    .subscribedEventHandler('HumidityEvent', (context, event) => {
        
                state.lastHumidityTimeStamp = '(' + this.timeStampMMDDHHmm() + ')'
                let currentHumidity = Double.parseDouble(event.value.replace('%', ''))
                state.humiditytrend = 'stay'
                if (currentHumidity > state.lastHumidity && currentHumidity - state.lastHumidity > 1) {
                    state.humiditytrend = 'up'
                }
                if (currentHumidity < state.lastHumidity && state.lastHumidity - currentHumidity > 1) {
                    state.humiditytrend = 'down'
                }
                if (!(state.averageHumidity > 0)) {
                    state.humiditytrend = 'stay'
                }
                if (state.loglevel == 2) {
                    this.DEBUG("Humidity Sensor | Current($currentHumidity),last(${state.lastHumidity}),trend(${state.humiditytrend})")
                }
                state.lastHumidity = currentHumidity 
                if (state.averagehumiditycurrentpollcount == state.averagehumiditymaxpollcount) {
                    state.averageHumidity = state.averageHumidityCalc / state.averagehumiditymaxpollcount
                    if (state.loglevel == 2) {
                        this.DEBUG("Humidity Sensor | Average Humidity (${state.averagehumiditymaxpollcount} polls) = ${state.averageHumidity}, Trend: ${state.humiditytrend}")
                    }
                    state.averageHumidityCalc = 0
                    state.averagehumiditycurrentpollcount = 0
                } else {
                    if (state.averageHumidityCalc > 0) {
                        state.averageHumidityCalc = state.averageHumidityCalc + state.lastHumidity
                    } else {
                        state.averageHumidityCalc = state.lastHumidity
                        state.averageHumidity = state.lastHumidity
                    }
                    state.averagehumiditycurrentpollcount = state.averagehumiditycurrentpollcount + 1
                    if (state.loglevel == 2) {
                        this.DEBUG("Humidity Sensor | Collected Humidity on poll # ${state.averagehumiditycurrentpollcount} of ${state.averagehumiditymaxpollcount}")
                    }
                    if (state.loglevel == 2) {
                        this.DEBUG("Humidity Sensor | Current Average Humidity is ${(state.averageHumidityCalc / state.averagehumiditycurrentpollcount)}, Trend: ${state.humiditytrend}")
                    }
                }
                if (lightswitch.latestValue('switch') == 'on') {
                    if (state.lastHumidity > state.averageHumidity && state.humiditytrend == 'up' && state.mode == 'motion') {
                        if (state.loglevel > 0) {
                            this.TRACE('Humidity Sensor | Humidity > Threshold; adjusting to use humidity timer')
                        }
                        state.mode = 'humidity'
                        state.offtime = settings.humidityOff * 60
                        if (state.loglevel == 2) {
                            this.DEBUG("Humidity Sensor | Scheduling off based on inactivity + humidity ${state.offtime}")
                            this.sendNotificationEvent("BLC: ${app.label} switched to Humidity timer via humidity event")
                        }
                        this.unschedule()
                        this.runIn(state.offtime, 'lightsOut')
                        state.scheduled = true
                    }
                    if (state.lastHumidity <= state.averageHumidity || state.humiditytrend == 'down' && state.mode == 'humidity') {
                        if (state.loglevel > 0) {
                            this.TRACE('Humidity Sensor | Humidity <= Threshold or trending down; adjusting to use motion timer')
                        }
                        state.mode = 'motion'
                        state.offtime = settings.motionOff * 60
                        if (state.loglevel == 2) {
                            this.DEBUG("Humidity Sensor | Scheduling off based on inactivity ${state.offtime}")
                            this.sendNotificationEvent("BLC: ${app.label} switched to Motion timer via humidity event")
                        }
                        this.unschedule()
                        this.runIn(state.offtime, 'lightsOut')
                        state.scheduled = true
                    }
                }
                if (!(fanswitch == null)) {
                    if (state.lastHumidity > state.averageHumidity) {
                        if (fanswitch.latestValue('switch') == 'off') {
                            this.fanOn()
                        }
                    } else {
                        if (fanswitch.latestValue('switch') == 'on') {
                            this.fanOff()
                        }
                    }
                }
            

	})

    .subscribedEventHandler('SwitchEvent', (context, event) => {
        
                state.lastSwitchTimeStamp = '(' + this.timeStampMMDDHHmm() + ')'
                if (!(fanswitch == null)) {
                    if (state.lastHumidity > state.averageHumidity) {
                        if (fanswitch.latestValue('switch') == 'off') {
                            this.fanOn()
                        }
                    } else {
                        if (fanswitch.latestValue('switch') == 'on') {
                            this.fanOff()
                        }
                    }
                }
                if (event.value == 'on' && state.lightswitchlastValue == 'off') {
                    if (state.trigger == 'none') {
                        state.trigger = 'manual'
                    }
                    if (state.loglevel == 2) {
                        this.DEBUG("Switch | ${event.value}, trigger:${state.trigger}, mode: ${state.mode}, lasthumidity:${state.lastHumidity}, avghumidity:${state.averageHumidity}, trend:${state.humiditytrend}")
                    }
                    if (state.lastHumidity > state.averageHumidity && state.humiditytrend == 'up' && state.mode == 'motion' && state.trigger == 'manual') {
                        if (state.loglevel == 2) {
                            this.DEBUG('Switch | Using humidity off timer (1)')
                        }
                        this.unschedule()
                        state.mode = 'humidity'
                        state.offtime = settings.humidityOff * 60
                        this.runIn(state.offtime, 'lightsOut')
                        state.scheduled = true
                    } else {
                        if (state.lastHumidity <= state.averageHumidity || state.humiditytrend == 'down' && !(state.humiditytrend == 'stay') && state.mode == 'motion' && state.trigger == 'manual') {
                            if (state.loglevel == 2) {
                                this.DEBUG('Switch | Using motion off timer (1)')
                            }
                            this.unschedule()
                            state.mode = 'motion'
                            state.offtime = settings.motionOff * 60
                            this.runIn(state.offtime, 'lightsOut')
                            state.scheduled = true
                        }
                        if (state.humiditytrend == 'stay' && state.trigger == 'manual') {
                            if (state.mode == 'motion') {
                                if (state.loglevel == 2) {
                                    this.DEBUG('Switch | Using motion off timer (2)')
                                }
                                this.unschedule()
                                state.offtime = settings.motionOff * 60
                                this.runIn(state.offtime, 'lightsOut')
                                state.scheduled = true
                            }
                            if (state.mode == 'humidity') {
                                if (state.loglevel == 2) {
                                    this.DEBUG('Switch | Using humidity off timer (2)')
                                }
                                this.unschedule()
                                state.offtime = settings.humidityOff * 60
                                this.runIn(state.offtime, 'lightsOut')
                                state.scheduled = true
                            }
                        }
                    }
                    if (state.lastHumidity > state.averageHumidity && state.humiditytrend == 'up' && state.mode == 'humidity' && state.trigger == 'manual') {
                        if (state.loglevel == 2) {
                            this.DEBUG('Switch | Using humidity off timer (3)')
                        }
                        this.unschedule()
                        state.mode = 'humidity'
                        state.offtime = settings.humidityOff * 60
                        this.runIn(state.offtime, 'lightsOut')
                        state.scheduled = true
                    }
                    if (state.lastHumidity <= state.averageHumidity || state.humiditytrend == 'down' && !(state.humiditytrend == 'stay') && state.mode == 'humidity' && state.trigger == 'manual') {
                        if (state.loglevel == 2) {
                            this.DEBUG('Switch | Using motion off timer (3)')
                        }
                        this.unschedule()
                        state.mode = 'motion'
                        state.offtime = settings.motionOff * 60
                        this.runIn(state.offtime, 'lightsOut')
                        state.scheduled = true
                    }
                }
                if (event.value == 'off') {
                    if (state.loglevel == 2) {
                        this.DEBUG('Switch | Light was turned off, unscheduling off timer events')
                    }
                    if (state.scheduled) {
                        this.unschedule()
                    }
                    state.trigger = 'none'
                }
                state.lightswitchlastValue = lightswitch.latestValue('switch')
            

	})
