
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Select switch to monitor power...', section => {
            section.deviceSetting('switch1').capability(['powerMeter']).name('');

        });


        page.section('Select switch to turn off...', section => {
            section.deviceSetting('switch2').capability(['switch']).name('');

        });


        page.section('Turn them off at...', section => {
            section.timeSetting('stopTime').name('');

        });


        page.section('When wattage drops below...', section => {
            section.numberSetting('wattageLow').name('');

        });


        page.section('Turn them on at...', section => {
            section.timeSetting('startTime').name('');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('stopTimerCallback', delay);

    })

    .scheduledEventHandler('stopTimerCallback', (context, event) => {
        
        if (switch1.currentPower <= wattageLow ) {
        console.log("${switch1.displayName} current Wattage: ${switch1.currentPower}, turning off ${switch2.displayName}.")
        this.sendEvent(['linkText': app.label, 'name': "${switch1.displayName}", 'value': "${switch1.currentPower}", 'descriptionText': "${switch1.displayName} current Wattage: ${switch1.currentPower}, turning off ${switch2.displayName}.", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', off)
    
        if (startTime != null) {
        this.schedule(startTime, 'startTimerCallback')
        }
        this.runIn(87000, stopTimerRescheduler, ['overwrite': true])
        } else {
        console.log("${switch1.displayName} current Wattage: ${switch1.currentPower}, waiting for next poll cycle.")
        this.sendEvent(['linkText': app.label, 'name': "${switch1.displayName}", 'value': "${switch1.currentPower}", 'descriptionText': "${switch1.displayName} current Wattage: ${switch1.currentPower}, waiting for next poll cycle.", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
        let timeDelay = 598
        this.runIn(timeDelay, stopTimerCallback, ['overwrite': true])
        }
        

	})
