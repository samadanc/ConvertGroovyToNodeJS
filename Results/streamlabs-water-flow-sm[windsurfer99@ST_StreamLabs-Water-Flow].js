
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Inputs', section => {
            section.textSetting('SL_locName').name('Enter Streamlabs location name assigned to Streamlabs flow meter');
            section.enumSetting('configLoggingLevelIDE').name('IDE Live Logging Level:\nMessages with this level and higher will be logged to the IDE.');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

        context.api.schedules.runIn('initDevice', delay);

        context.api.schedules.runIn('initialize', delay);

        context.api.schedules.schedule('pollSLAlert', delay);

    })

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
        this.logger("StreamLabs SM modeChangeHandler() called by SmartThings mode changing to: ${event.value}", 'info')
        let foundmode = false
        this.logger("StreamLabs SM modeChangeHandler- user specified SL_awayModes: $SL_awayModes; # of modes: ${SL_awayModes?.size}", 'debug')
        if (SL_awayModes?.size() > 0) {
        SL_awayModes?.each({ let awayModes ->
        if (location.currentMode == awayModes ) {
        foundmode = true
        }
        })
        if (foundmode) {
        this.logger('StreamLabs SM modeChangeHandler- changing StreamLabs to away', 'info')
        this.updateAway('away')
        } else {
        this.logger('StreamLabs SM modeChangeHandler- changing StreamLabs to home', 'info')
        this.updateAway('home')
        }
        }
        

	})

    .scheduledEventHandler('pollSLAlert', (context, event) => {
        
        this.logger('StreamLabs SM pollSLAlert() called', 'trace')
        let existingDevice = this.getChildDevice(state.SL_location?.locationId)
        if (state.SL_location) {
        let params = ['uri': 'https://api.streamlabswater.com/v1/locations/' + state.SL_location.locationId, 'headers': ['Authorization': 'Bearer ' + appSettings.api_key], 'contentType': 'application/json']
        try {
        this.httpGet(params, { let resp ->
        this.logger("StreamLabs SM pollSLAlert resp.data: ${resp.data}", 'debug')
        let SL_Leak_Found = false
        let resp_data = resp.data
        let SL_locationsAlerts = resp_data.alerts
        if (SL_locationsAlerts.size > 0) {
        this.logger("StreamLabs SM pollSLAlert # of alerts: ${SL_locationsAlerts.size}", 'trace')
        SL_locationsAlerts.each({
        if (it.active == true) {
        this.logger("StreamLabs SM pollSLAlert, alert is active: $it", 'trace')
        if (it.type.contains('Leak')) {
        this.logger("StreamLabs SM pollSLAlert Leak Alert received: $it; call changeWaterToWet", 'info')
        existingDevice?.changeWaterToWet()
        state.inAlert = true
        SL_Leak_Found = true
        }
        }
        })
        }
        if (state.inAlert && !SL_Leak_Found) {
        this.logger('StreamLabs SM pollSLAlert Leak Alert deactivated ; call changeWaterToDry', 'info')
        existingDevice?.changeWaterToDry()
        state.inAlert = false
        }
        })
        }
        catch (let e) {
        this.logger("StreamLabs SM pollSLAlert error retrieving alerts: $e", 'error')
        }
        }
        

	})

    .scheduledEventHandler('initDevice', (context, event) => {
        
        this.logger('StreamLabs SM initDevice() called', 'trace')
        this.determineFlows()
        this.determinehomeAway()
        let existingDevice = this.getChildDevice(state.SL_location?.locationId)
        existingDevice?.refresh()
        

	})

    .scheduledEventHandler('initialize', (context, event) => {
        
        state.loggingLevelIDE = settings.configLoggingLevelIDE ? settings.configLoggingLevelIDE.toInteger
        this.logger("StreamLabs SM initialize() called with settings: $settings", 'trace')
        let mySecret = appSettings.api_key
        if (mySecret.length() < 40) {
        this.logger("StreamLabs SM initialize- api_key value not set properly in IDE: $mySecret", 'error')
        }
        state.SL_location = null
        state.childDevice = null
        state.inAlert = false
        state.homeAway = 'home'
        this.subscribe(location, 'mode', modeChangeHandler)
        this.initSL_Locations()
        if (state.SL_location) {
        let eventData = ['name': 'water', 'value': 'dry']
        let existingDevice = this.getChildDevice(state.SL_location?.locationId)
        existingDevice?.generateEvent(eventData)
        state.inAlert = false
        this.schedule('0 0/3 * * * ?', pollSLAlert)
        this.runIn(8, 'initDevice')
        }
        

	})
