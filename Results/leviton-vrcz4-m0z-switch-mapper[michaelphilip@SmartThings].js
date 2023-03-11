
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('updateLights', (context, event) => {
        
                console.log("updateLights evt = $evt")
                console.log("Button 1: ${switches_1*.currentValue(switch)}")
                console.log("Button 2: ${switches_2*.currentValue(switch)}")
                console.log("Button 3: ${switches_3*.currentValue(switch)}")
                console.log("Button 4: ${switches_4*.currentValue(switch)}")
                let one = switches_1*.currentValue('switch').contains('on')
                let two = switches_2*.currentValue('switch').contains('on')
                let three = switches_3*.currentValue('switch').contains('on')
                let four = switches_4*.currentValue('switch').contains('on')
                buttonDevice.setLightStatus(one ? color_1 : 0, two ? color_2 : 0, three ? color_3 : 0, four ? color_4 : 0)
            

	})

    .subscribedEventHandler('buttonEvent', (context, event) => {
        
                let data = this.parseJson(event.data)
                data.button = data.button != null ? data.button : data.buttonNumber
                switch (data.button) {
                    case '0':
                        atomicState.dimmingNow = data.status == 'start' ? true : false
                        if (atomicState.dimmingNow) {
                            this.startDimming(data.switch, data.direction)
                        }
                        break
                    case '1':
                        data.status == 'on' ? switches_1.on() : switches_1.off()
                        break
                    case '2':
                        data.status == 'on' ? switches_2.on() : switches_2.off()
                        break
                    case '3':
                        data.status == 'on' ? switches_3.on() : switches_3.off()
                        break
                    case '4':
                        data.status == 'on' ? switches_4.on() : switches_4.off()
                        break
                    default: 
                    break
                }
                return null
            

	})
