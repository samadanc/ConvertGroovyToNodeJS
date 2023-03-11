
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
                let myDev = event.device
                Lutron.sendMsg("${myDev.name},${event.value}")
            

	})

    .subscribedEventHandler('removeHandler', (context, event) => {
        
                this.unsubscribe()
            

	})

    .subscribedEventHandler('dimmerHandler', (context, event) => {
        
                let myDev = event.device
                let level = event.value
                if (level == 'on') {
                    level = myDev.currentLevel ? myDev.currentLevel : 100
                } else {
                    if (level == 'off') {
                        level = 0
                    }
                }
                Lutron.sendMsg("${myDev.name},$level")
            

	})

    .subscribedEventHandler('LutronHandler', (context, event) => {
        
                if (event.value.startsWith('LZC') && !(event.value.endsWith('CHG'))) {
                    let ndx = event.value.substring(event.value[4] == '0' ? 5 : 4, 6)
                    let device = this.getChildDevice(state.myDevices["$ndx"])
                    device.sendEvent(['name': 'switch', 'value': event.value.endsWith('ON ') ? 'son' : 'soff'])
                } else {
                    if (event.value.startsWith('ZMP')) {
                        let zmp = event.value.substring(3)
                        for (java.lang.Integer i = 1; i <= state.myDevices.size(); i++) {
                            if (state.zmp[ i ] != zmp[ i ]) {
                                let device = this.getChildDevice(state.myDevices["$i"])
                                device.sendEvent(['name': 'switch', 'value': zmp[ i ] == '1' ? 'son' : 'soff'])
                            }
                        }
                        state.zmp = zmp 
                    } else {
                        if (event.value.startsWith('LMP')) {
                            let lmp = event.value.substring(3)
                            for (java.lang.Integer i = 1; i <= state.myPhantoms.size(); i++) {
                                if (state.lmp[ i ] == '1' && lmp[ i ] == '0') {
                                    let device = this.getChildDevice(state.myPhantoms["$i"])
                                    device.sendEvent(['name': 'switch', 'value': 'soff'])
                                }
                            }
                            state.lmp = lmp 
                        }
                    }
                }
            

	})
