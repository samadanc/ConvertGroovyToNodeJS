
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'locationHandler')

    })

    .subscribedEventHandler('locationHandler', (context, event) => {
        
                let description = event.description
                let hub = evt?.hubId
                let parsedEvent = this.parseEventMessage(description)
                parsedEvent << ['hub': hub ]
                if (parsedEvent.ip == this.convertIPtoHex(userip) && parsedEvent.port == this.convertPortToHex(userport)) {
                    let bodyString = ''
                    let body = null
                    if (hub) {
                        state.hub = hub 
                    }
                    if (parsedEvent.headers && parsedEvent.body) {
                        let headerString = new String(parsedEvent.headers.decodeBase64())
                        bodyString = new String(parsedEvent.body.decodeBase64())
                        let type = headerString =~ 'Content-Type:.*' ? headerString =~ 'Content-Type:.*'[0] : null
                        log.trace("DISKSTATION REPONSE TYPE: $type")
                        if (type?.contains('text/plain')) {
                            log.trace(bodyString)
                            body = new groovy.json.JsonSlurper().parseText(bodyString)
                        } else {
                            if (type?.contains('application/json')) {
                                log.trace(bodyString)
                                body = new groovy.json.JsonSlurper().parseText(bodyString)
                            } else {
                                if (type?.contains('text/html')) {
                                    log.trace(bodyString)
                                    body = new groovy.json.JsonSlurper().parseText(bodyString.replaceAll('\<.*?\>', ''))
                                } else {
                                    log.trace('unexpected data type')
                                    if (state.commandList.size() > 0) {
                                        Map commandData = state.commandList.first()
                                        this.handleErrors(commandData, null)
                                    }
                                    return null
                                }
                            }
                        }
                        if (body.error) {
                            if (state.commandList.size() > 0) {
                                Map commandData = state.commandList?.first()
                                if (this.getUniqueCommand(commandData) == this.getUniqueCommand('SYNO.SurveillanceStation.PTZ', 'ListPreset') || this.getUniqueCommand(commandData) == this.getUniqueCommand('SYNO.SurveillanceStation.PTZ', 'ListPatrol')) {
                                    body.data = null
                                } else {
                                    this.handleErrors(commandData, body.error)
                                    return null
                                }
                            } else {
                                this.handleErrorsIgnore(null, body.error)
                                return null
                            }
                        }
                    }
                    let commandType = this.determineCommandFromResponse(parsedEvent, bodyString, body)
                    if (state.commandList.size() > 0 && body != null && commandType != '') {
                        Map commandData = state.commandList.first()
                        if (this.getUniqueCommand(commandData) == commandType ) {
                            let finalizeCommand = true
                            if (body.success == true) {
                                switch (this.getUniqueCommand(commandData)) {
                                    case this.getUniqueCommand('SYNO.API.Info', 'Query'):
                                        let api = commandData.params.split('=')[1]
                                        state.api.put(api, body.data[ api ])
                                        break
                                    case this.getUniqueCommand('SYNO.API.Auth', 'Login'):
                                        state.sid = body.data.sid
                                        break
                                    case this.getUniqueCommand('SYNO.SurveillanceStation.Camera', 'List'):
                                        state.SSCameraList = body.data.cameras
                                        state.getCameraCapabilities = true
                                        this.getCameraCapabilities()
                                        break
                                    case this.getUniqueCommand('SYNO.SurveillanceStation.Camera', 'GetCapability'):
                                        let info = commandData.params =~ 'vendor=(.*)&model=(.*)'
                                        if (info[0][1] != null && info[0][2] != null) {
                                            state.cameraCapabilities.put(this.makeCameraModelKey(info[0][1], info[0][2]), body.data)
                                        }
                                        break
                                    case this.getUniqueCommand('SYNO.SurveillanceStation.Camera', 'GetCapabilityByCamId'):
                                        let cameraId = commandData.params =~ 'cameraId=([0-9]+)' ? commandData.params =~ 'cameraId=([0-9]+)'[0][1] : null
                                        if (cameraId) {
                                            let camera = state.SSCameraList.find({ 
                                                it.id.toString() == cameraId.toString()
                                            })
                                            if (camera) {
                                                let vendor = camera.additional.device.vendor.replaceAll(' ', '%20')
                                                let model = camera.additional.device.model.replaceAll(' ', '%20')
                                                state.cameraCapabilities.put(this.makeCameraModelKey(vendor, model), body.data)
                                            } else {
                                                log.trace('invalid camera id')
                                            }
                                        }
                                        break
                                    case this.getUniqueCommand('SYNO.SurveillanceStation.PTZ', 'ListPreset'):
                                        let cameraId = commandData.params =~ 'cameraId=([0-9]+)' ? commandData.params =~ 'cameraId=([0-9]+)'[0][1] : null
                                        if (cameraId) {
                                            state.cameraPresets[cameraId.toInteger()] = body.data?.presets
                                        }
                                        break
                                    case this.getUniqueCommand('SYNO.SurveillanceStation.PTZ', 'ListPatrol'):
                                        let cameraId = commandData.params =~ 'cameraId=([0-9]+)' ? commandData.params =~ 'cameraId=([0-9]+)'[0][1] : null
                                        if (cameraId) {
                                            state.cameraPatrols[cameraId.toInteger()] = body.data?.patrols
                                        }
                                        break
                                    default: 
                                    console.log('received invalid command: ' + state.lastcommand)
                                    finalizeCommand = false
                                    break
                                }
                            } else {
                                console.log('success = false but how did we know what command it was?')
                            }
                            if (finalizeCommand == true) {
                                this.finalizeDiskstationCommand()
                            }
                            return null
                        }
                    }
                    if (commandType != '') {
                        log.trace("event = $description")
                        let commandInfo = this.getFirstChildCommand(commandType)
                        if (commandInfo != null) {
                            switch ( commandType ) {
                                case this.getUniqueCommand('SYNO.SurveillanceStation.Camera', 'GetSnapshot'):
                                    if (parsedEvent.bucket && parsedEvent.key) {
                                        log.trace('saving image to device')
                                        commandInfo?.child?.putImageInS3(parsedEvent)
                                    }
                                    return this.finalizeChildCommand(commandInfo)
                            }
                        }
                    }
                    if (state.commandList.size() > 0 && body != null) {
                        Map commandData = state.commandList.first()
                        if (body.success == false) {
                            let finalizeCommand = true
                            switch (this.getUniqueCommand(commandData)) {
                                case this.getUniqueCommand('SYNO.API.Info', 'Query'):
                                case this.getUniqueCommand('SYNO.API.Auth', 'Login'):
                                case this.getUniqueCommand('SYNO.SurveillanceStation.Camera', 'List'):
                                case this.getUniqueCommand('SYNO.SurveillanceStation.Camera', 'GetCapability'):
                                    this.handleErrors(commandData, null)
                                    break
                                case this.getUniqueCommand('SYNO.SurveillanceStation.PTZ', 'ListPreset'):
                                    let cameraId = commandData.params =~ 'cameraId=([0-9]+)' ? commandData.params =~ 'cameraId=([0-9]+)'[0][1] : null
                                    if (cameraId) {
                                        state.cameraPresets[cameraId.toInteger()] = null
                                    }
                                    break
                                case this.getUniqueCommand('SYNO.SurveillanceStation.PTZ', 'ListPatrol'):
                                    let cameraId = commandData.params =~ 'cameraId=([0-9]+)' ? commandData.params =~ 'cameraId=([0-9]+)'[0][1] : null
                                    if (cameraId) {
                                        state.cameraPatrols[cameraId.toInteger()] = null
                                    }
                                    break
                                default: 
                                console.log('don\'t know now to handle this command ' + state.lastcommand)
                                finalizeCommand = false
                                break
                            }
                            if (finalizeCommand == true) {
                                this.finalizeDiskstationCommand()
                            }
                            return null
                        } else {
                        }
                    }
                    if (parsedEvent.requestId && !parsedEvent.headers) {
                        let commandInfo = this.getFirstChildCommand(this.getUniqueCommand('SYNO.SurveillanceStation.Camera', 'GetSnapshot'))
                        if (commandInfo) {
                            log.trace('take image command returned an error')
                            if (state.lastErrorResend == null || this.now() - state.lastErrorResend > 15000) {
                                log.trace('resending to get real error message')
                                state.lastErrorResend = this.now()
                                state.doSnapshotResend = true
                                this.sendDiskstationCommand(this.createCommandData('SYNO.SurveillanceStation.Camera', 'GetSnapshot', "cameraId=${this.getDSCameraIDbyChild(commandInfo.child)}", 1))
                            } else {
                                log.trace('not trying to resend again for more error info until later')
                            }
                            return null
                        }
                    }
                    log.trace('Did not use ' + bodyString )
                }
            

	})
