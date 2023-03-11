
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('motion_inside_detect_handler', (context, event) => {
        
                this.log("motion_inside_detect_handler called: $evt")
                this.unschedule(switchOff)
                state.in_motion_time = this.now()
                this.log("in motion : ${state.in_motion_time}, out motion : ${state.out_motion_time}")
                this.log("millisecond : ${(state.in_motion_time - state.out_motion_time)}")
                if (state.in_motion_time - state.out_motion_time <= delay * 1000) {
                    this.incrementCounter()
                    if (main_switch != null) {
                        if (state.counter > 0 && main_switch.currentState('switch').value == 'off' && light_meter == null || light_meter != null && light_meter.currentIlluminance <= lux_max ) {
                            state.autoMode = true
                            main_switch.on()
                            this.log('main switch on')
                            if (sub_switch) {
                                sub_switch.on()
                            }
                            if (isForceOff) {
                                if (0 == forceOffsecond ) {
                                    this.runIn(forceOffsecond, switchOff, ['overwrite': true])
                                } else {
                                    this.schedule(this.now() + forceOffsecond * 1000, switchOff)
                                }
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('motion_outside_detect_handler', (context, event) => {
        
                this.log("motion_outside_detect_handler called: $evt")
                this.unschedule(switchOff)
                state.out_motion_time = this.now()
                this.log("in motion : ${state.in_motion_time}, out motion : ${state.out_motion_time}")
                if (state.out_motion_time - state.in_motion_time <= delay * 1000) {
                    this.decrementCounter()
                    if (state.counter <= 0) {
                        if (true == state.autoMode) {
                            this.log('switch off')
                            if (main_switch) {
                                main_switch.off()
                            }
                            if (sub_switch) {
                                sub_switch.off()
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('switch_off_handler', (context, event) => {
        
                this.log("switch_off_handler called: $evt")
                if (sub_switch) {
                    sub_switch.off()
                }
                this.resetCounter()
                state.autoMode = false
            

	})
