
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('statusUpdate', (context, event) => {
        
                console.log("${event.description}")
                console.log("statusUpdate ${event.value} ")
                let val = event.value
                let idx = 0
                if (event.value == null) {
                    return null
                }
                while (idx < event.value.length()) {
                    if (val[ idx ] == 'R') {
                        8.times({ let i ->
                            idx++
                            let child = this.getChildDevice("${app.id}:relay$i")
                            let curVal = val[ idx ].toInteger()
                            if (child) {
                                let strVal = curVal ? 'on' : 'off'
                                console.log("Sending $child $strVal")
                                child.sendEvent(['name': 'switch', 'value': strVal ])
                            }
                        })
                    } else {
                        break
                    }
                    idx++
                }
            

	})
