
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('airMonitorChangeHandler', (context, event) => {
        
                let smartAirMonitor = this.getAirMonitor()
                if (smartAirMonitor) {
                    smartAirMonitor.refresh()
                }
                console.log('airMonitorChangeHandler: ' + event.displayName + ', ' + event.name)
            

	})

    .subscribedEventHandler('airPurifierChangeHandler', (context, event) => {
        
                let smartAirPurifier = this.getAirPurifier()
                if (smartAirPurifier) {
                    smartAirPurifier.refresh()
                }
                console.log('airPurifierChangeHandler: ' + event.displayName + ', ' + event.name)
            

	})

    .subscribedEventHandler('airConditionerChangeHandler', (context, event) => {
        
                let smartAirConditioner = this.getAirConditioner()
                if (smartAirConditioner) {
                    smartAirConditioner.refresh()
                }
                console.log('airConditionerChangeHandler: ' + event.displayName + ', ' + event.name)
            

	})

    .subscribedEventHandler('airConditionerWallChangeHandler', (context, event) => {
        
                let smartAirConditionerWall = this.getAirConditionerWall()
                if (smartAirConditionerWall) {
                    smartAirConditionerWall.refresh()
                }
                console.log('airConditionerWallChangeHandler: ' + event.displayName + ', ' + event.name)
            

	})
