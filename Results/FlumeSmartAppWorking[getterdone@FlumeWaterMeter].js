
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Inputs', section => {
            section.textSetting('userFlume_locName').name('Enter Flume location name assigned to Flume flow meter');
            section.enumSetting('configLoggingLevelIDE').name('IDE Live Logging Level:\nMessages with this level and higher will be logged to the IDE.');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('initDevice', delay);

        context.api.schedules.runIn('initialize', delay);

        context.api.schedules.schedule('pollSLAlert', delay);

    })

    .scheduledEventHandler('pollSLAlert', (context, event) => {
        
        this.logger('Flume SM pollSLAlert() called', 'trace')
        let existingDevice = this.getChildDevice(state.flumeDeviceId)
        if (state.Flume_location) {
        let params = ['uri': this.getApiBase(), 'path': "users/$flumeUserId/notifications", 'headers': this.getDefaultAuthHeaders()]
        try {
        this.httpGet(params, { let resp ->
        this.logger("Flume SM pollSLAlert resp.data: ${resp.data}", 'debug')
        let resp_data = resp.data
        console.log("resp_data line 262 begin $resp_data end")
        let myLowWaterFlowAlert = null
        let myLowWaterFlowAlertMessage = null
        let Flume_locationsAlert
        resp_data.data.message.each({ let tempMessage ->
        console.log(tempMessage)
        if (tempMessage.contains('Low Flow Leak')) {
        myLowWaterFlowAlertMessage = tempMessage
        myLowWaterFlowAlert = true
        Flume_locationsAlert = 'Low Flow Leak'
        }
        })
        console.log("resp_data line 277 begin '$myLowWaterFlowAlertMessage' end ")
        if (myLowWaterFlowAlert) {
        this.logger("Flume SM pollSLAlert Alert0 received: $Flume_locationsAlert; call changeWaterToWet", 'info')
        existingDevice?.changeWaterToWet()
        state.inAlert = true
        } else {
        if (state.inAlert) {
        this.logger('Flume SM pollSLAlert Alert0 deactivated ; call changeWaterToDry', 'info')
        existingDevice?.changeWaterToDry()
        state.inAlert = false
        }
        }
        })
        }
        catch (let e) {
        this.logger("Flume SM pollSLAlert error retrieving alerts: $e", 'error')
        }
        }
        

	})

    .scheduledEventHandler('initDevice', (context, event) => {
        
        this.logger('Flume SM initDevice() called', 'trace')
        this.determineFlows()
        let existingDevice = this.getChildDevice(state.flumeDeviceId)
        existingDevice?.refresh()
        

	})

    .scheduledEventHandler('initialize', (context, event) => {
        
        state.loggingLevelIDE = settings.configLoggingLevelIDE ? settings.configLoggingLevelIDE.toInteger
        this.logger("Flume SM initialize() called with settings: $settings", 'trace')
        let mySecret = this.FlumeAPISecret()
        if (mySecret.length() < 20) {
        this.logger("Flume SM initialize- api_secret value not set properly in IDE: $mySecret", 'error')
        }
        state.flumeUserId = this.getflumeUserId()
        state.flumeDeviceId = this.getflumeDeviceId()
        state.Flume_location = null
        state.childDevice = null
        state.inAlert = false
        this.subscribe(location, 'mode')
        this.initFlume_locations(flumeUserId)
        console.log("initialize()FLOW state.Flume_location = ${state.Flume_location}")
        if (state.Flume_location) {
        console.log('we have a device; put it into initial state')
        let eventData = ['name': 'water', 'value': 'dry']
        console.log("inside initialize state.flumeDeviceId '${state.flumeDeviceId}'")
        let existingDevice = this.getChildDevice(state.flumeDeviceId)
        existingDevice?.generateEvent(eventData)
        state.inAlert = false
        this.schedule('0 0/3 * * * ?', pollSLAlert)
        this.runIn(8, 'initDevice')
        }
        

	})
