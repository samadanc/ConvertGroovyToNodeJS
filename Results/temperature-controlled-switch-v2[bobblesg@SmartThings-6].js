
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('offNow', delay);

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
                state.contact1Now = event.value
                if (state.contact1Now == 'open') {
                    this.LOGDEBUG("Contact is ${state.contact1Now} - Switching off now...")
                    switch2.off()
                    this.LOGDEBUG("$switch2 is OFF - Heating Disabled")
                } else {
                    this.LOGDEBUG("Contact is ${state.contact1Now} - Heating Allowed")
                }
            

	})

    .subscribedEventHandler('switchEnableNow', (context, event) => {
        
                state.enable = event.value
                this.LOGDEBUG("Enable/Disable switch $switch1 is ${state.currS1}")
                if (state.enable == 'off') {
                    switch2.off()
                }
            

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
                if (allOk) {
                    this.LOGDEBUG('All ok so can continue...')
                    let myTemp = temperature1 
                    if (event.doubleValue < myTemp ) {
                        this.LOGDEBUG("Reported temperature is below $myTemp so activating $switch2")
                        switch2.on()
                    } else {
                        if (event.doubleValue >= myTemp ) {
                            this.LOGDEBUG("Reported temperature is equal to, or above, $myTemp so deactivating $switch2")
                            switch2.off()
                        }
                    }
                } else {
                    if (!allOk) {
                        this.LOGDEBUG(' Not ok - one or more conditions are not met')
                        this.LOGDEBUG("modeOk = $modeOk - daysOk = $daysOk - timeOk = $timeOk - enableOk = $enableOk")
                    }
                }
            

	})

    .scheduledEventHandler('offNow', (context, event) => {
        
                this.LOGDEBUG('Time expired.. Switching off now...')
                switch2.off()
            

	})
