
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('tempHandler', (context, event) => {
        
                this.logger(40, 'debug', "tempHandler- evt name: ${event.name}, value: ${event.value}")
                state.zoneTemp = event.value.toFloat()
                if (state.mainOn) {
                    this.logger(30, 'debug', "tempHandler- tempChange, value: ${event.value}")
                    this.zoneEvaluate(['msg': 'temp', 'data': ['tempChange']])
                }
            

	})

    .subscribedEventHandler('levelHandler', (context, event) => {
        
                this.logger(40, 'debug', 'levelHandler:enter- ')
                let ventData = state."${event.deviceId}"
                let v = event.value.toFloat().round(0).toInteger()
                let t = event.date.getTime()
                if (ventData) {
                    if (event.description == '') {
                        ventData.voRequest = v 
                        ventData.voRequestTS = t 
                        this.logger(30, 'debug', "levelHandler- request vo: $v t: $t")
                    } else {
                        ventData.voResponse = v 
                        ventData.voResponseTS = t 
                        ventData.voTTC = t - ventData.voRequestTS / 1000.toFloat().round(1)
                        this.logger(30, 'debug', "levelHandler- response vo: $v t: $t voTTC: ${ventData.voTTC}")
                    }
                } else {
                    if (event.description == '') {
                        state."${event.deviceId}" = ['voRequest': v , 'voRequestTS': t , 'voResponse': null, 'voResponseTS': null, 'voTTC': null]
                        this.logger(30, 'debug', "levelHandler-init request vo: $v t: $t")
                    } else {
                        state."${event.deviceId}" = ['voRequest': null, 'voRequestTS': null, 'voResponse': t , 'voResponseTS': v , 'voTTC': null]
                        this.logger(30, 'debug', "levelHandler-init response vo: $v t: $t")
                    }
                }
                this.logger(40, 'debug', 'levelHandler:exit- ')
            

	})
