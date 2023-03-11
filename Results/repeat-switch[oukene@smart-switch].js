
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleOffHandler', delay);

        context.api.schedules.schedule('scheduleOnHandler', delay);

    })

    .subscribedEventHandler('switch_on_handler', (context, event) => {
        
                console.log('switch_on_handler')
                if (sub_switch) {
                    sub_switch.on()
                }
                this.switch_for_repeat()
            

	})

    .subscribedEventHandler('switch_off_handler', (context, event) => {
        
                this.log('switch_off_handler')
                if (sub_switch) {
                    sub_switch.off()
                }
                if (state.repeat_reservation == true) {
                    this.log('stop repeat')
                    this.resetSwitch()
                } else {
                    this.switch_for_repeat()
                }
            

	})

    .scheduledEventHandler('scheduleOffHandler', (context, event) => {
        
                this.log('end schedule')
                this.resetSwitch()
            

	})

    .scheduledEventHandler('scheduleOnHandler', (context, event) => {
        
                this.log("start schedule - currentSwitch : ${main_switch.currentSwitch}")
                state.repeat_reservation = true
                if (main_switch.currentSwitch == 'off') {
                    this.log('main switch on')
                    main_switch.on()
                } else {
                    this.switch_for_repeat()
                }
            

	})
