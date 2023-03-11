
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('A_timeStart').name('Starting');
            section.timeSetting('A_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.timeSetting('B_timeStart').name('Starting');
            section.timeSetting('B_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.timeSetting('C_timeStart').name('Starting');
            section.timeSetting('C_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.timeSetting('D_timeStart').name('Starting');
            section.timeSetting('D_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.timeSetting('E_timeStart').name('Starting');
            section.timeSetting('E_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.timeSetting('F_timeStart').name('Starting');
            section.timeSetting('F_timeEnd').name('Ending');

        });


        page.section('', section => {

        });


        page.section(''Instructions'', section => {

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('E_switchHandler', (context, event) => {
        
        if (!E_mode || E_mode.contains(location.mode) && this.getDayOk(E_day) && this.getTimeOk(E_timeStart, E_timeEnd)) {
        console.log("Running $E_ScenarioName")
        if (event.value == 'on' && E_onPhrase || E_onMode || E_onSwitches ) {
        if (E_onPhrase) {
        location.helloHome.execute(E_onPhrase)
        }
        if (E_onMode) {
        this.changeMode(E_onMode)
        }
        if (E_onSwitches) {
        E_onSwitches?.on()
        }
        } else {
        if (event.value == 'off' && !E_momentary && E_offPhrase || E_offMode || E_offSwitches ) {
        if (E_offPhrase) {
        location.helloHome.execute(E_offPhrase)
        }
        if (E_offMode) {
        this.changeMode(E_offMode)
        }
        if (E_offSwitches) {
        E_offSwitches?.off()
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('D_switchHandler', (context, event) => {
        
        if (!D_mode || D_mode.contains(location.mode) && this.getDayOk(D_day) && this.getTimeOk(D_timeStart, D_timeEnd)) {
        console.log("Running $D_ScenarioName")
        if (event.value == 'on' && D_onPhrase || D_onMode || D_onSwitches ) {
        if (!D_delayOn || D_delayOn == 0) {
        this.D_on()
        } else {
        this.runIn(D_delayOn * 60, D_on, ['overwrite': true])
        }
        } else {
        if (event.value == 'off' && !D_momentary && D_offPhrase || D_offMode || D_offSwitches ) {
        if (!D_delayOff || D_delayOff == 0) {
        this.D_off()
        } else {
        this.runIn(D_delayOff * 60, D_off, ['overwrite': true])
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('A_switchHandler', (context, event) => {
        
        if (!A_mode || A_mode.contains(location.mode) && this.getDayOk(A_day) && this.getTimeOk(A_timeStart, A_timeEnd)) {
        console.log("Running $A_ScenarioName")
        if (event.value == 'on' && A_onPhrase || A_onMode || A_onSwitches ) {
        if (!A_delayOn || A_delayOn == 0) {
        this.A_on()
        } else {
        unschedule
        this.runIn(A_delayOn * 60, A_on, ['overwrite': true])
        }
        } else {
        if (event.value == 'off' && !A_momentary && A_offPhrase || A_offMode || A_offSwitches ) {
        if (!A_delayOff || A_delayOff == 0) {
        this.A_off()
        } else {
        this.runIn(A_delayOff * 60, A_off, ['overwrite': true])
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('F_switchHandler', (context, event) => {
        
        if (!F_mode || F_mode.contains(location.mode) && this.getDayOk(F_day) && this.getTimeOk(F_timeStart, F_timeEnd)) {
        console.log("Running $F_ScenarioName")
        if (event.value == 'on' && F_onPhrase || F_onMode || F_onSwitches ) {
        if (F_onPhrase) {
        location.helloHome.execute(F_onPhrase)
        }
        if (F_onMode) {
        this.changeMode(F_onMode)
        }
        if (F_onSwitches) {
        F_onSwitches?.on()
        }
        } else {
        if (event.value == 'off' && !F_momentary && F_offPhrase || F_offMode || F_offSwitches ) {
        if (F_offPhrase) {
        location.helloHome.execute(F_offPhrase)
        }
        if (F_offMode) {
        this.changeMode(F_offMode)
        }
        if (F_offSwitches) {
        F_offSwitches?.off()
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('C_switchHandler', (context, event) => {
        
        if (!C_mode || C_mode.contains(location.mode) && this.getDayOk(C_day) && this.getTimeOk(C_timeStart, C_timeEnd)) {
        console.log("Running $C_ScenarioName")
        if (event.value == 'on' && C_onPhrase || C_onMode || C_onSwitches ) {
        if (!C_delayOn || C_delayOn == 0) {
        this.C_on()
        } else {
        this.runIn(C_delayOn * 60, C_on, ['overwrite': true])
        }
        } else {
        if (event.value == 'off' && !C_momentary && C_offPhrase || C_offMode || C_offSwitches ) {
        if (!C_delayOff || C_delayOff == 0) {
        this.C_off()
        } else {
        this.runIn(C_delayOff * 60, C_off, ['overwrite': true])
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('B_switchHandler', (context, event) => {
        
        if (!B_mode || B_mode.contains(location.mode) && this.getDayOk(B_day) && this.getTimeOk(B_timeStart, B_timeEnd)) {
        console.log("Running $B_ScenarioName")
        if (event.value == 'on' && B_onPhrase || B_onMode || B_onSwitches ) {
        if (!B_delayOn || B_delayOn == 0) {
        this.B_on()
        } else {
        this.runIn(B_delayOn * 60, B_on, ['overwrite': true])
        }
        } else {
        if (event.value == 'off' && !B_momentary && B_offPhrase || B_offMode || B_offSwitches ) {
        if (!B_delayOff || B_delayOff == 0) {
        this.B_off()
        } else {
        this.runIn(B_delayOff * 60, B_off, ['overwrite': true])
        }
        }
        }
        }
        

	})
