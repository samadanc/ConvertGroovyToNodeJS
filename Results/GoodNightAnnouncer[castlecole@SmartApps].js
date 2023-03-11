
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('A_buttonDevice').capability(['button']).name('Button Controller');
            section.enumSetting('A_buttonPress').name('Which button...');

        });


        page.section('', section => {
            section.timeSetting('A_timeStart').name('Starting');
            section.timeSetting('A_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.deviceSetting('B_buttonDevice').capability(['button']).name('Button Controller');
            section.enumSetting('B_buttonPress').name('Which button...');

        });


        page.section('', section => {
            section.timeSetting('B_timeStart').name('Starting');
            section.timeSetting('B_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.deviceSetting('C_buttonDevice').capability(['button']).name('Button Controller');
            section.enumSetting('C_buttonPress').name('Which button...');

        });


        page.section('', section => {
            section.timeSetting('C_timeStart').name('Starting');
            section.timeSetting('C_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.deviceSetting('D_buttonDevice').capability(['button']).name('Button Controller');
            section.enumSetting('D_buttonPress').name('Which button...');

        });


        page.section('', section => {
            section.timeSetting('D_timeStart').name('Starting');
            section.timeSetting('D_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.deviceSetting('E_buttonDevice').capability(['button']).name('Button Controller');
            section.enumSetting('E_buttonPress').name('Which button...');

        });


        page.section('', section => {
            section.timeSetting('E_timeStart').name('Starting');
            section.timeSetting('E_timeEnd').name('Ending');

        });


        page.section('', section => {

        });


        page.section(''Instructions'', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.C_buttonDevice, 'button', 'button.pushed', 'buttonHandler_C')

        await context.api.subscriptions.subscribeToDevices(context.config.B_buttonDevice, 'button', 'button.pushed', 'buttonHandler_B')

        await context.api.subscriptions.subscribeToDevices(context.config.E_buttonDevice, 'button', 'button.pushed', 'buttonHandler_E')

        await context.api.subscriptions.subscribeToDevices(context.config.D_buttonDevice, 'button', 'button.pushed', 'buttonHandler_D')

        await context.api.subscriptions.subscribeToDevices(context.config.A_buttonDevice, 'button', 'button.pushed', 'buttonHandler_A')

    })

    .subscribedEventHandler('scenario_C', (context, event) => {
        
        if (!C_triggerOnce || C_triggerOnce && !C_triggered && this.getTimeOk(C_timeStart, C_timeEnd) && this.getDayOk(C_day) && !C_mode || C_mode.contains(location.mode)) {
        state.fullMsgC = ''
        if (C_msg && C_msgFirst ) {
        this.getGreeting(C_msg, 3)
        }
        if (C_weatherReport || C_humidity || C_includeTemp || C_localTemp ) {
        this.getWeatherReport(3, C_weatherReport, C_humidity, C_includeTemp, C_localTemp)
        }
        if (C_includeSunrise || C_includeSunset ) {
        this.getSunriseSunset(3, C_includeSunrise, C_includeSunset)
        }
        if (C_phrase) {
        location.helloHome.execute(C_phrase)
        if (C_confirmPhrase) {
        this.getPhraseConfirmation(C_phrase, 3)
        }
        }
        if (C_triggerMode && location.mode != C_triggerMode ) {
        if (location.modes?.find({
        it.name == C_triggerMode
        })) {
        this.setLocationMode(C_triggerMode)
        } else {
        console.log("Unable to change to undefined mode '$C_triggerMode'")
        }
        if (C_confirmMode) {
        this.getModeConfirmation(C_triggerMode, 3)
        }
        }
        if (C_contactSensors || C_locks || C_doorControls ) {
        this.getDoorsConditions(C_reportAll, C_contactSensors, C_locks, C_doorControls, 3)
        }
        if (C_msg && !C_msgFirst) {
        this.getGreeting(C_msg, 3)
        }
        state.soundC = this.textToSpeech(state.fullMsgC, true)
        if (C_volume) {
        C_sonos.setLevel(C_volume)
        }
        C_sonos.playTrack(state.soundC.uri)
        if (C_triggerOnce) {
        state.C_triggered = true
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        

	})

    .subscribedEventHandler('buttonHandler_D', (context, event) => {
        
        let data = new JsonSlurper().parseText(event.data)
        let button = data.buttonNumber
        let remoteButton = (D_buttonPress as Integer)
        if (button == remoteButton ) {
        this.scenario_D()
        }
        

	})

    .subscribedEventHandler('buttonHandler_C', (context, event) => {
        
        let data = new JsonSlurper().parseText(event.data)
        let button = data.buttonNumber
        let remoteButton = (C_buttonPress as Integer)
        if (button == remoteButton ) {
        this.scenario_C()
        }
        

	})

    .subscribedEventHandler('scenario_D', (context, event) => {
        
        if (!D_triggerOnce || D_triggerOnce && !D_triggered && this.getTimeOk(D_timeStart, D_timeEnd) && this.getDayOk(D_day) && !D_mode || D_mode.contains(location.mode)) {
        state.fullMsgD = ''
        if (D_msg && D_msgFirst ) {
        this.getGreeting(D_msg, 4)
        }
        if (D_weatherReport || D_humidity || D_includeTemp || D_localTemp ) {
        this.getWeatherReport(4, D_weatherReport, D_humidity, D_includeTemp, D_localTemp)
        }
        if (D_includeSunrise || D_includeSunset ) {
        this.getSunriseSunset(4, D_includeSunrise, D_includeSunset)
        }
        if (D_phrase) {
        location.helloHome.execute(D_phrase)
        if (D_confirmPhrase) {
        this.getPhraseConfirmation(D_phrase, 4)
        }
        }
        if (D_triggerMode && location.mode != D_triggerMode ) {
        if (location.modes?.find({
        it.name == D_triggerMode
        })) {
        this.setLocationMode(D_triggerMode)
        } else {
        console.log("Unable to change to undefined mode '$D_triggerMode'")
        }
        if (D_confirmMode) {
        this.getModeConfirmation(D_triggerMode, 4)
        }
        }
        if (D_contactSensors || D_locks || D_doorControls ) {
        this.getDoorsConditions(D_reportAll, D_contactSensors, D_locks, D_doorControls, 4)
        }
        if (D_msg && !D_msgFirst) {
        this.getGreeting(D_msg, 4)
        }
        state.soundD = this.textToSpeech(state.fullMsgD, true)
        if (D_volume) {
        D_sonos.setLevel(D_volume)
        }
        D_sonos.playTrack(state.soundD.uri)
        if (D_triggerOnce) {
        state.D_triggered = true
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        

	})

    .subscribedEventHandler('scenario_E', (context, event) => {
        
        if (!E_triggerOnce || E_triggerOnce && !E_triggered && this.getTimeOk(E_timeStart, E_timeEnd) && this.getDayOk(E_day) && !E_mode || E_mode.contains(location.mode)) {
        state.fullMsgE = ''
        if (E_msg && E_msgFirst ) {
        this.getGreeting(E_msg, 5)
        }
        if (E_weatherReport || E_humidity || E_includeTemp || E_localTemp ) {
        this.getWeatherReport(5, E_weatherReport, E_humidity, E_includeTemp, E_localTemp)
        }
        if (E_includeSunrise || E_includeSunset ) {
        this.getSunriseSunset(5, E_includeSunrise, E_includeSunset)
        }
        if (E_phrase) {
        location.helloHome.execute(E_phrase)
        if (E_confirmPhrase) {
        this.getPhraseConfirmation(E_phrase, 5)
        }
        }
        if (E_triggerMode && location.mode != E_triggerMode ) {
        if (location.modes?.find({
        it.name == E_triggerMode
        })) {
        this.setLocationMode(E_triggerMode)
        } else {
        console.log("Unable to change to undefined mode '$E_triggerMode'")
        }
        if (E_confirmMode) {
        this.getModeConfirmation(E_triggerMode, 5)
        }
        }
        if (E_contactSensors || E_locks || E_doorControls ) {
        this.getDoorsConditions(E_reportAll, E_contactSensors, E_locks, E_doorControls, 5)
        }
        if (E_msg && !E_msgFirst) {
        this.getGreeting(E_msg, 5)
        }
        state.soundE = this.textToSpeech(state.fullMsgE, true)
        if (E_volume) {
        E_sonos.setLevel(E_volume)
        }
        E_sonos.playTrack(state.soundE.uri)
        if (E_triggerOnce) {
        state.E_triggered = true
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        

	})

    .subscribedEventHandler('scenario_A', (context, event) => {
        
        if (!A_triggerOnce || A_triggerOnce && !A_triggered && this.getTimeOk(A_timeStart, A_timeEnd) && this.getDayOk(A_day) && !A_mode || A_mode.contains(location.mode)) {
        state.fullMsgA = ''
        if (A_msg && A_msgFirst ) {
        this.getGreeting(A_msg, 1)
        }
        if (A_weatherReport || A_humidity || A_includeTemp || A_localTemp ) {
        this.getWeatherReport(1, A_weatherReport, A_humidity, A_includeTemp, A_localTemp)
        }
        if (A_includeSunrise || A_includeSunset ) {
        this.getSunriseSunset(1, A_includeSunrise, A_includeSunset)
        }
        if (A_phrase) {
        location.helloHome.execute(A_phrase)
        if (A_confirmPhrase) {
        this.getPhraseConfirmation(A_phrase, 1)
        }
        }
        if (A_triggerMode && location.mode != A_triggerMode ) {
        if (location.modes?.find({
        it.name == A_triggerMode
        })) {
        this.setLocationMode(A_triggerMode)
        } else {
        console.log("Unable to change to undefined mode '$A_triggerMode'")
        }
        if (A_confirmMode) {
        this.getModeConfirmation(A_triggerMode, 1)
        }
        }
        if (A_contactSensors || A_locks || A_doorControls ) {
        this.getDoorsConditions(A_reportAll, A_contactSensors, A_locks, A_doorControls, 1)
        }
        if (A_msg && !A_msgFirst) {
        this.getGreeting(A_msg, 1)
        }
        state.soundA = this.textToSpeech(state.fullMsgA, true)
        if (A_volume) {
        A_sonos.setLevel(A_volume)
        }
        A_sonos.playTrack(state.soundA.uri)
        if (A_triggerOnce) {
        state.A_triggered = true
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        

	})

    .subscribedEventHandler('scenario_B', (context, event) => {
        
        if (!B_triggerOnce || B_triggerOnce && !B_triggered && this.getTimeOk(B_timeStart, B_timeEnd) && this.getDayOk(B_day) && !B_mode || B_mode.contains(location.mode)) {
        state.fullMsgB = ''
        if (B_msg && B_msgFirst ) {
        this.getGreeting(B_msg, 2)
        }
        if (B_weatherReport || B_humidity || B_includeTemp || B_localTemp ) {
        this.getWeatherReport(2, B_weatherReport, B_humidity, B_includeTemp, B_localTemp)
        }
        if (B_includeSunrise || B_includeSunset ) {
        this.getSunriseSunset(2, B_includeSunrise, B_includeSunset)
        }
        if (B_phrase) {
        location.helloHome.execute(B_phrase)
        if (B_confirmPhrase) {
        this.getPhraseConfirmation(B_phrase, 2)
        }
        }
        if (B_triggerMode && location.mode != B_triggerMode ) {
        if (location.modes?.find({
        it.name == B_triggerMode
        })) {
        this.setLocationMode(B_triggerMode)
        } else {
        console.log("Unable to change to undefined mode '$B_triggerMode'")
        }
        if (B_confirmMode) {
        this.getModeConfirmation(B_triggerMode, 2)
        }
        }
        if (B_contactSensors || B_locks || B_doorControls ) {
        this.getDoorsConditions(B_reportAll, B_contactSensors, B_locks, B_doorControls, 2)
        }
        if (B_msg && !B_msgFirst) {
        this.getGreeting(B_msg, 2)
        }
        state.soundB = this.textToSpeech(state.fullMsgB, true)
        if (B_volume) {
        B_sonos.setLevel(B_volume)
        }
        B_sonos.playTrack(state.soundB.uri)
        if (B_triggerOnce) {
        state.B_triggered = true
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        

	})

    .subscribedEventHandler('buttonHandler_E', (context, event) => {
        
        let data = new JsonSlurper().parseText(event.data)
        let button = data.buttonNumber
        let remoteButton = (E_buttonPress as Integer)
        if (button == remoteButton ) {
        this.scenario_E()
        }
        

	})

    .subscribedEventHandler('buttonHandler_B', (context, event) => {
        
        let data = new JsonSlurper().parseText(event.data)
        let button = data.buttonNumber
        let remoteButton = (B_buttonPress as Integer)
        if (button == remoteButton ) {
        this.scenario_B()
        }
        

	})

    .subscribedEventHandler('buttonHandler_A', (context, event) => {
        
        let data = new JsonSlurper().parseText(event.data)
        let button = data.buttonNumber
        let remoteButton = (A_buttonPress as Integer)
        if (button == remoteButton ) {
        this.scenario_A()
        }
        

	})
