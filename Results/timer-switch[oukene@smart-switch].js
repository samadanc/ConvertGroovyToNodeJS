
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
                this.log("${event.name} : ${event.value} : $actuatorAction")
                if (null != main_switch && main_switch.currentState('switch').value == 'off') {
                    this.log('main switch on')
                    main_switch.on()
                    state.on_time = state.off_time = this.now()
                }
                let device = this.getChildDevice(state.child_dni)
                if (device && device.currentState('switch').value == 'off') {
                    device.on()
                    device.setLevel(appendSecond)
                    state.on_time = state.off_time = this.now()
                    this.runIn(counter_device_refresh_interval, timer, ['overwrite': true])
                }
                this.log('add second : ' + appendSecond )
                state.off_time = state.off_time + appendSecond * 1000
                this.log('now:' + this.now())
                this.log("offTime : ${state.off_time}")
                this.log('runin: ' + state.off_time - this.now() / 1000)
                this.runIn(state.off_time - this.now() / 1000, switchOff, ['overwrite': true])
            

	})

    .subscribedEventHandler('switch_on_handler', (context, event) => {
        
            

	})

    .subscribedEventHandler('switch_off_handler', (context, event) => {
        
                this.log("switch_off_handler called: $evt")
                if (main_switch) {
                    main_switch.off()
                }
                let device = this.getChildDevice(state.child_dni)
                if (device) {
                    device.setLevel(0)
                }
                state.off_time = this.now()
            

	})
