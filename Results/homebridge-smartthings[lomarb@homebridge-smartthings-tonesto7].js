
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'changeHandler')

        context.api.schedules.runIn('registerDevices', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'HubResponseEvent')

        context.api.schedules.runIn('registerSensors', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'changeHandler')

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
                    case 'alarmSystemStatus':
                        deviceid = evt?.name
                        state?.alarmSystemStatus = value 
                        sendItems?.push(['evtSource': src , 'evtDeviceName': deviceName , 'evtDeviceId': deviceid , 'evtAttr': attr , 'evtValue': value , 'evtUnit': evt?.unit ? evt?.unit : '', 'evtDate': dt ])
                        break
                    case 'mode':
                        settings?.modeList?.each({ let id ->
                            let md = this.getModeById(id)
                            if (md && md?.id) {
                                sendItems?.push(['evtSource': 'MODE', 'evtDeviceName': md?.name, 'evtDeviceId': md?.id, 'evtAttr': 'switch', 'evtValue': this.modeSwitchState(md?.name), 'evtUnit': '', 'evtDate': dt ])
                            }
                        })
                        break
                    case 'routineExecuted':
                        settings?.routineList?.each({ let id ->
                            let rt = this.getRoutineById(id)
                            if (rt && rt?.id) {
                                sendItems?.push(['evtSource': 'ROUTINE', 'evtDeviceName': rt?.label, 'evtDeviceId': rt?.id, 'evtAttr': 'switch', 'evtValue': 'off', 'evtUnit': '', 'evtDate': dt ])
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
                            console.log("Sending${( ${send?.evtSource}) ?  ${send?.evtSource} : } Event (${send?.evtDeviceName} | ${send?.evtAttr.toUpperCase()}: ${send?.evtValue}${send?.evtUnit}) to Homebridge at (${state?.directIP}:${state?.directPort})")
                        }
                        let result = new physicalgraph.device.HubAction(['method': 'POST', 'path': '/update', 'headers': ['HOST': "${state?.directIP}:${state?.directPort}", 'Content-Type': 'application/json'], 'body': ['change_name': send?.evtDeviceName, 'change_device': send?.evtDeviceId, 'change_attribute': send?.evtAttr, 'change_value': send?.evtValue, 'change_date': send?.evtDate]])
                        this.sendHubCommand(result)
                    })
                }
            

	})

    .subscribedEventHandler('HubResponseEvent', (context, event) => {
        
            

	})

    .scheduledEventHandler('registerDevices', (context, event) => {
        
                console.log("Registering (${(settings?.deviceList?.size()) ? settings?.deviceList?.size() : 0}) Other Devices")
                this.registerChangeHandler(settings?.deviceList)
                console.log("Registering (${(settings?.irrigationList?.size()) ? settings?.irrigationList?.size() : 0}) Sprinklers")
                this.registerChangeHandler(settings?.irrigationList)
            

	})

    .scheduledEventHandler('registerSensors', (context, event) => {
        
                console.log("Registering (${(settings?.sensorList?.size()) ? settings?.sensorList?.size() : 0}) Sensors")
                this.registerChangeHandler(settings?.sensorList)
                console.log("Registering (${(settings?.speakerList?.size()) ? settings?.speakerList?.size() : 0}) Speakers")
                this.registerChangeHandler(settings?.speakerList)
                console.log("Registering (${(settings?.hamptonBayFanLightList?.size()) ? settings?.hamptonBayFanLightList?.size() : 0}) FanLights")
                this.registerChangeHandler(settings?.hamptonBayFanLightList)
            

	})

    .scheduledEventHandler('registerSwitches', (context, event) => {
        
                console.log("Registering (${(settings?.switchList?.size()) ? settings?.switchList?.size() : 0}) Switches")
                this.registerChangeHandler(settings?.switchList)
                console.log("Registering (${(settings?.lightList?.size()) ? settings?.lightList?.size() : 0}) Lights")
                this.registerChangeHandler(settings?.lightList)
                console.log("Registering (${(settings?.fanList?.size()) ? settings?.fanList?.size() : 0}) Fans")
                this.registerChangeHandler(settings?.fanList)
            

	})
