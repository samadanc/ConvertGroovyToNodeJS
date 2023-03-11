
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select dimmers to control...', section => {
            section.deviceSetting('switches').capability(['switchLevel']).name('');

        });


        page.section('Time and Levels...', section => {
            section.timeSetting('startTime').name('Time?');
            section.numberSetting('lightLevel').name('Level 0-100');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

    })

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        this.defaultState()
        this.debug('Light Level Scheduler checking scheduling')
        let today = new Date().format('EEEE')
        this.debug("today: $today, days: $days")
        if (!days || days.contains(today)) {
        this.debug('Setting light levels')
        
        context.api.devices.sendCommands(context.config.switches, 'switchLevel', setLevel)
    
        } else {
        this.debug('Light Level Scheduler skipped running today')
        }
        

	})
