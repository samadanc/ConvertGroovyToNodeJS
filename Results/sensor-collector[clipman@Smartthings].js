
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('stateChangeHandler', (context, event) => {
        
                let device = event.getDevice()
                if (smartDevice) {
                    console.log('smartDevice: ' + smartDevice.displayName + ', ' + smartDevice.name)
                    switch (event.name) {
                        case 'dustLevel':
                            try {
                                smartDevice.setDustLevel(device.currentValue(event.name))
                            } 
                            catch (Exception e) {
                                smartDevice.sendEvent(['name': event.name, 'value': device.currentValue(event.name)])
                                log.info(event.name + ", setDustLevel: ${e.message}")
                            } 
                            break
                        case 'fineDustLevel':
                            try {
                                smartDevice.setFineDustLevel(device.currentValue(event.name))
                            } 
                            catch (Exception e) {
                                smartDevice.sendEvent(['name': event.name, 'value': device.currentValue(event.name)])
                                log.info(event.name + ", setFineDustLevel: ${e.message}")
                            } 
                            break
                        case 'odorLevel':
                            try {
                                smartDevice.setOdorLevel(device.currentValue(event.name))
                            } 
                            catch (Exception e) {
                                smartDevice.sendEvent(['name': event.name, 'value': device.currentValue(event.name)])
                                log.info(event.name + ", setOdorLevel: ${e.message}")
                            } 
                            break
                        default: 
                        smartDevice.sendEvent(['name': event.name, 'value': device.currentValue(event.name)])
                        console.log('stateChangeHandler: ' + event.displayName + ', ' + event.name + ', ID: ' + device.id)
                    }
                    smartDevice.refresh()
                }
                console.log('stateChangeHandler: ' + event.displayName + ', ' + event.name + ', ID: ' + device.id)
            

	})
