
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
                if (device) {
                    let type = device.hasCommand('on') ? 'switch' : 'sensor'
                    let theAtts = device.supportedAttributes
                    let resultMap = [:]
                    resultMap['friendly_name'] = device.displayName
                    theAtts.each({ let att ->
                        let item = { 
                        }
                        try {
                            let _attr = "${att.name}State"
                            let val = device."$_attr".value
                            resultMap["${att.name}"] = val 
                        } 
                        catch (let e) {
                        } 
                    })
                    let value = "${event.value}"
                    String pattern = '[^?-?xfe0-9a-zA-Z\s+/]'
                    String idString = "$type.st_" + device.name.toLowerCase().replaceAll(pattern, '_') + '_' + device.deviceNetworkId.toLowerCase().replaceAll(pattern, '_')
                    String ids = idString.replaceAll(' ', '_')
                    let options = ['method': 'POST', 'path': '/api/states/' + ids , 'headers': ['HOST': settings.haAddress, 'Authorization': "Bearer ${settings.haPassword}", 'Content-Type': 'application/json'], 'body': ['state': value , 'attributes': resultMap ]]
                    let myhubAction = new physicalgraph.device.HubAction(options, null, ['callback': notifyCallback ])
                    this.sendHubCommand(myhubAction)
                }
            

	})
