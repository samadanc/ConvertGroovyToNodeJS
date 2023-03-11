
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Inputs', section => {
            section.enumSetting('configLoggingLevelIDE').name('IDE Live Logging Level:');

        });


        page.section('''', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('startTimerAlerts', delay);

        context.api.schedules.schedule('startTimerMyDataSync', delay);

        context.api.schedules.runIn('initDevice', delay);

        context.api.schedules.runIn('initialize', delay);

    })

    .scheduledEventHandler('startTimerMyDataSync', (context, event) => {
        
        let seconds = 32
        console.log('in DataSync start timer')
        let now = new Date()
        let runTime = new Date(now.getTime() + seconds * 1000)
        console.log("runTime  $runTime")
        this.runOnce(runTime, syncLocationData, ['data': ['deviceID': state.myLocations.get(0).myDeviceID, 'overwrite': true]])
        

	})

    .scheduledEventHandler('initDevice', (context, event) => {
        
        this.logger('Flume SM initDevice() called', 'trace')
        let Flume_Devices = this.getChildDevices()
        console.log("line 651 Flume_Devices '$Flume_Devices'")
        Flume_Devices?.each({
        this.determineDeviceFlow(it.deviceNetworkId)
        let existingDevice = this.getChildDevice(it.deviceNetworkId)
        existingDevice?.refresh()
        })
        

	})

    .scheduledEventHandler('startTimerAlerts', (context, event) => {
        
        Random rnd = new Random()
        java.lang.Integer my1stSecond = rnd.nextInt(2) + 1
        java.lang.Integer my2ndSecond = rnd.nextInt(8) + 1
        java.lang.Integer firstTimeOffset = (("2$my1stSecond") as int)
        java.lang.Integer secondTimeOffset = (("3$my2ndSecond") as int)
        console.log("line 356 ${new Date()} state.delayPollData '${state.delayPollData}'")
        let i = rnd.next(5)
        java.lang.Integer delaySeconds = i % 2
        let seconds = delaySeconds == 0 ? firstTimeOffset : secondTimeOffset
        console.log('in Alerts start timer')
        let now = new Date()
        let runTime = new Date(now.getTime() + seconds * 1000)
        console.log("line 370 pollSLAlert runTime  $runTime")
        this.runOnce(runTime, pollSLAlert, ['data': ['deviceID': state.myLocations.get(0).myDeviceID, 'overwrite': true]])
        

	})

    .scheduledEventHandler('initialize', (context, event) => {
        
        state.loggingLevelIDE = settings.configLoggingLevelIDE ? settings.configLoggingLevelIDE.toInteger
        this.logger("Flume SM initialize() called with settings: $settings", 'trace')
        let mySecret = this.FlumeAPISecret()
        if (mySecret.length() < 20) {
        this.logger("Flume SM initialize- api_secret value not set properly in IDE: $mySecret", 'error')
        }
        state.lastSuccessfulCall = null
        state.initializeDelay = false
        state.currentDeviceIndex = null
        state.messageRead = false
        state.firstDevice = null
        state.secondDevice = null
        state.delayPollData = false
        state.delayFlowData = false
        state.delaySyncData = false
        state.lastPolledSuccess = false
        state.lastSyncSuccess = false
        state.lastFlowDataSuccess = false
        state.myLocations = []
        state.myQueryData = []
        state.myAlertData = []
        state.deviceBattery = null
        state.bridgeConnection = null
        state.sameTZ = true
        state.myTZ = null
        state.sameBatteryLevel = true
        state.myBatterLevel = null
        state.sameConnectedStatus = true
        state.myConnectedSatus = null
        state.flumeUserId = this.getflumeUserId()
        this.initFlume_locations(flumeUserId)
        let data = []
        let Flume_Devices = this.getChildDevices()
        console.log("line 160 Flume_Devices '$Flume_Devices'")
        Flume_Devices?.each({
        state.flumeDeviceId = it.deviceNetworkId
        state.Flume_location = null
        state.childDevice = null
        state.inAlert = false
        this.schedule('0 0/4 * * * ?', startTimerAlerts)
        this.schedule('0 0/31 * * * ?', startTimerMyDataSync)
        this.subscribe(location, 'mode')
        console.log("line 172 initialize()FLOW state.Flume_location = ${state.Flume_location}")
        if (state.flumeDeviceId) {
        console.log('line 175 we have a device; put it into initial state')
        let eventData = ['name': 'water', 'value': 'dry']
        console.log("inside initialize state.flumeDeviceId '${state.flumeDeviceId}'")
        let existingDevice = this.getChildDevice(state.flumeDeviceId)
        existingDevice?.generateEvent(eventData)
        state.inAlert = false
        this.runIn(5, 'initDevice')
        }
        })
        

	})
