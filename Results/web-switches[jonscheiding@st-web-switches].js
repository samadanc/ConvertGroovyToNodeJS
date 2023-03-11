
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow external service to control these things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which switches should the API expose?');
            section.deviceSetting('temperatureSensors').capability(['temperatureMeasurement']).name('Which temperature readings should the API provide?');

        });


        page.section('['mobileOnly': true], 'Turn off switches automatically...', section => {
            section.numberSetting('timer_default').name('After how many minutes?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('check_timers', delay);

    })

    .subscribedEventHandler('subscribe_switch_on', (context, event) => {
        
        return null
        this.handle_switch_on(event.device)
        

	})

    .subscribedEventHandler('subscribe_switch_off', (context, event) => {
        
        this.handle_switch_off(event.device)
        

	})

    .scheduledEventHandler('check_timers', (context, event) => {
        
        let now = new Date()
        let remove = []
        console.log("Checking all timers ${state.switches}.")
        let timers_remaining = 0
        switches.each({ let sw ->
        let sw_state = state.switches[sw.id]
        switch (sw_state.currently) {
        case 'on':
        case 'turning off':
        if (sw.currentSwitch == 'off') {
        this.handle_switch_off(sw)
        }
        break
        case 'off':
        case 'turning on':
        if (sw.currentSwitch == 'on') {
        this.handle_switch_on(sw)
        }
        break
        }
        let sw_timer = sw_state.timer
        if (sw_timer == null) {
        return null
        }
        if (now < Date.parseToStringDate(sw_timer.at)) {
        timers_remaining++
        return null
        }
        log.info("Turning ${sw_timer.turn} switch ${sw.id}, since its timer went off at ${sw_timer.at}.")
        switch (sw_timer.turn) {
        case 'off':
        sw.off()
        break
        case 'on':
        sw.on()
        break
        }
        this.update_currently_value("turning ${sw_timer.turn}")
        sw_state.timer = null
        })
        state
        

	})
