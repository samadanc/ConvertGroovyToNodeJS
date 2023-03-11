
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('updateServicePrefs', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'changeHandler')

        context.api.schedules.runIn('registerDevices', delay);

        context.api.schedules.runIn('registerSensors', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'changeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'lanEventHandler')

        context.api.schedules.runIn('registerSwitches', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'changeHandler')

    })

    .subscribedEventHandler('changeHandler', (context, event) => {
        
                let sendItems = []
                let sendNum = 1
                let src = evt?.source
                let deviceid = evt?.deviceId
                let deviceName = evt?.displayName
                let attr = evt?.name
                let value = evt?.value
                let dt = evt?.date
                let sendEvt = true
                switch (evt?.name) {
                    case 'hsmStatus':
                        deviceid = "alarmSystemStatus_${location?.id}"
                        attr = 'alarmSystemStatus'
                        sendItems?.push(['evtSource': src , 'evtDeviceName': deviceName , 'evtDeviceId': deviceid , 'evtAttr': attr , 'evtValue': value , 'evtUnit': evt?.unit ? evt?.unit : '', 'evtDate': dt ])
                        break
                    case 'hsmAlert':
                        if (evt?.value == 'intrusion') {
                            deviceid = "alarmSystemStatus_${location?.id}"
                            attr = 'alarmSystemStatus'
                            value = 'alarm_active'
                            sendItems?.push(['evtSource': src , 'evtDeviceName': deviceName , 'evtDeviceId': deviceid , 'evtAttr': attr , 'evtValue': value , 'evtUnit': evt?.unit ? evt?.unit : '', 'evtDate': dt ])
                        } else {
                            sendEvt = false
                        }
                        break
                    case 'hsmRules':
                    case 'hsmSetArm':
                        sendEvt = false
                        break
                    case 'alarmSystemStatus':
                        deviceid = "alarmSystemStatus_${location?.id}"
                        sendItems?.push(['evtSource': src , 'evtDeviceName': deviceName , 'evtDeviceId': deviceid , 'evtAttr': attr , 'evtValue': value , 'evtUnit': evt?.unit ? evt?.unit : '', 'evtDate': dt ])
                        break
                    case 'mode':
                        settings?.modeList?.each({ let id ->
                            let md = this.getModeById(id)
                            if (md && md?.id) {
                                sendItems?.push(['evtSource': 'MODE', 'evtDeviceName': "Mode - ${md?.name}", 'evtDeviceId': md?.id, 'evtAttr': 'switch', 'evtValue': this.modeSwitchState(md?.name), 'evtUnit': '', 'evtDate': dt ])
                            }
                        })
                        break
                    case 'routineExecuted':
                        settings?.routineList?.each({ let id ->
                            let rt = this.getRoutineById(id)
                            if (rt && rt?.id) {
                                sendItems?.push(['evtSource': 'ROUTINE', 'evtDeviceName': "Routine - ${rt?.label}", 'evtDeviceId': rt?.id, 'evtAttr': 'switch', 'evtValue': 'off', 'evtUnit': '', 'evtDate': dt ])
                            }
                        })
                        break
                    default: 
                    sendItems?.push(['evtSource': src , 'evtDeviceName': deviceName , 'evtDeviceId': deviceid , 'evtAttr': attr , 'evtValue': value , 'evtUnit': evt?.unit ? evt?.unit : '', 'evtDate': dt ])
                    break
                }
                if (sendEvt && state?.directIP != '' && sendItems?.size()) {
                    sendItems?.each({ let send ->
                        if (settings?.showLogs) {
                            String unitStr = ''
                            switch ((send?.evtAttr as String)) {
                                case 'temperature':
                                    unitStr = "°${send?.evtUnit}"
                                    break
                                case 'humidity':
                                case 'level':
                                case 'battery':
                                    unitStr = '%'
                                    break
                                case 'power':
                                    unitStr = 'W'
                                    break
                                case 'illuminance':
                                    unitStr = ' Lux'
                                    break
                                default: 
                                unitStr = "${send?.evtUnit}"
                                break
                            }
                            console.log("Sending${( ${send?.evtSource}) ?  ${send?.evtSource} : } Event (${send?.evtDeviceName} | ${send?.evtAttr.toUpperCase()}: ${send?.evtValue}$unitStr) to Homebridge at (${state?.directIP}:${state?.directPort})")
                        }
                        let params = ['method': 'POST', 'path': '/update', 'headers': ['HOST': "${state?.directIP}:${state?.directPort}", 'Content-Type': 'application/json'], 'body': ['change_name': send?.evtDeviceName, 'change_device': send?.evtDeviceId, 'change_attribute': send?.evtAttr, 'change_value': send?.evtValue, 'change_date': send?.evtDate]]
                        let result = new physicalgraph.device.HubAction(params)
                        this.sendHubCommand(result)
                    })
                }
            

	})

    .subscribedEventHandler('lanEventHandler', (context, event) => {
        
                let msg = this.parseLanMessage(evt?.description)
                Map headerMap = msg?.headers
                try {
                    Map msgData = [:]
                    if (headerMap?.size()) {
                        if (headerMap?.evtSource && headerMap?.evtSource == "Homebridge_${this.pluginName()}") {
                            if (msg?.body != null) {
                                let slurper = new groovy.json.JsonSlurper()
                                msgData = slurper?.parseText((msg?.body as String))
                                console.log("msgData: $msgData")
                                if (headerMap?.evtType) {
                                    switch (headerMap?.evtType) {
                                        case 'hkCommand':
                                            let val1 = msgData?.values?.value1 ? msgData?.values?.value1 : null
                                            let val2 = msgData?.values?.value2 ? msgData?.values?.value2 : null
                                            this.processCmd(msgData?.deviceid, msgData?.command, val1, val2, true)
                                            break
                                        case 'enableDirect':
                                            state?.directIP = msgData?.ip
                                            state?.directPort = msgData?.port
                                            this.activateDirectUpdates(true)
                                            break
                                    }
                                }
                            }
                        }
                    }
                } 
                catch (let ex) {
                    log.error('lanEventHandler Exception:', ex)
                } 
            

	})
