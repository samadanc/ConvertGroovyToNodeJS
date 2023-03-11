
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Please set a main allowable time window', section => {
            section.timeSetting('startTime1').name('Start of main time window');
            section.timeSetting('endTime1').name('End of main time window');

        });


        page.section('Please set a secondary allowable time window (optional)', section => {
            section.timeSetting('startTime2').name('Start of secondary time window');
            section.timeSetting('endTime2').name('End of secondary time window');

        });


        page.section('Maximum TV Time', section => {

        });


        page.section('TV(s)', section => {

        });


        page.section('Contacting You', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('runJob', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.tv, 'device.zwaveMeteringSwitch', 'power', 'tvHandler')

    })

    .subscribedEventHandler('tvHandler', (context, event) => {
        
        log.trace("tvHandler(${event.name}: ${event.value})")
        if (event.numericValue > 5) {
        this.startTimer()
        } else {
        this.stopTimer()
        }
        

	})

    .scheduledEventHandler('runJob', (context, event) => {
        
        log.trace(this.elapsedTime())
        log.trace(this.timeAllowance())
        let debug = ", switch: ${tv.currentSwitch}, power: ${tv.currentPower}, elapsed: ${(this.elapsedTime() / 60000)}, allowance: ${(this.timeAllowance() / 60000)}"
        if (this.inTimeWindow()) {
        if (this.withinTimeAllowance()) {
        if (tv.currentSwitch != 'on') {
        console.log("Turning TV on, within time window and allowance $debug")
        
        context.api.devices.sendCommands(context.config.tv, 'device.zwaveMeteringSwitch', on)
    
        } else {
        log.trace("Leaving TV on, within time window and allowance $debug")
        }
        } else {
        if (tv.currentSwitch == 'on') {
        log.info("Turning TV off, exceeded allowable hours for the day (${this.timeAllowance()} hours) $debug")
        
        context.api.devices.sendCommands(context.config.tv, 'device.zwaveMeteringSwitch', off)
    
        } else {
        log.trace("Turning TV off, exceeded allowable hours for the day (${this.timeAllowance()} hours) $debug")
        }
        }
        } else {
        if (tv.currentSwitch == 'on') {
        log.info("Turning TV off, outside of allowable time window $debug")
        
        context.api.devices.sendCommands(context.config.tv, 'device.zwaveMeteringSwitch', off)
    
        } else {
        log.trace("Leaving TV off, outside of allowable time window $debug")
        }
        }
        
        context.api.devices.sendCommands(context.config.tv, 'device.zwaveMeteringSwitch', poll)
    
        

	})
