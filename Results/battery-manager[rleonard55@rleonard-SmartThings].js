
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('updateStatus', delay);

    })

    .scheduledEventHandler('updateStatus', (context, event) => {
        
                if (!(this.dayToRun())) {
                    return null
                }
                batteryDevices.each({ 
                    let percent = settings."${it.id}warningPercent"
                    let batteryType = settings."${it.id}batteryType"
                    let batteryCount = settings."${it.id}batteryCount"
                    let BatteryTypeMsg = ", make sure you have at least [$batteryCount] $batteryType batterie(s) on hand."
                    if (batteryType == null) {
                        BatteryTypeMsg = ''
                    }
                    if (it.currentBattery == null) {
                        this.sendNotifications("${it.displayName} isn't reporting it's battery level" + BatteryTypeMsg )
                    } else {
                        if (it.currentBattery < percent ) {
                            this.sendNotifications("${it.displayName} battery is at ${it.currentBattery}%" + BatteryTypeMsg )
                        }
                    }
                })
            

	})
