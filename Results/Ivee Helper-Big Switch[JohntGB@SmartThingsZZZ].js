
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

        });


        page.section(''Instructions'', section => {

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('offHandler_B', (context, event) => {
        
        if (this.getDayOk(B_day) && this.getTimeOk(B_timeStart, B_timeEnd)) {
        B_lightsOff?.off()
        if (B_phraseOff) {
        location.helloHome.execute(B_phraseOff)
        }
        if (B_modeOff && location.mode != B_modeOff ) {
        if (location.modes?.find({
        it.name == B_modeOff
        })) {
        this.setLocationMode(B_modeOff)
        } else {
        console.log("Unable to change to undefined mode '$B_modeOff'")
        }
        }
        console.log("Master switch in $B_name was turned off. Completing off actions for this Ivee control.")
        }
        

	})

    .subscribedEventHandler('onHandler_C', (context, event) => {
        
        if (this.getDayOk(C_day) && this.getTimeOk(C_timeStart, C_timeEnd)) {
        C_lightsOn?.on()
        if (C_phraseOn) {
        location.helloHome.execute(C_phraseOn)
        }
        if (C_modeOn && location.mode != C_modeOn ) {
        if (location.modes?.find({
        it.name == C_modeOn
        })) {
        this.setLocationMode(C_modeOn)
        } else {
        console.log("Unable to change to undefined mode '$C_modeOn'")
        }
        }
        console.log("Master switch in $C_name was turned on. Completing on actions for this Ivee control.")
        }
        

	})

    .subscribedEventHandler('onHandler_D', (context, event) => {
        
        if (this.getDayOk(D_day) && this.getTimeOk(D_timeStart, D_timeEnd)) {
        D_lightsOn?.on()
        if (D_phraseOn) {
        location.helloHome.execute(D_phraseOn)
        }
        if (D_modeOn && location.mode != D_modeOn ) {
        if (location.modes?.find({
        it.name == D_modeOn
        })) {
        this.setLocationMode(D_modeOn)
        } else {
        console.log("Unable to change to undefined mode '$D_modeOn'")
        }
        }
        console.log("Master switch in $D_name was turned on. Completing on actions for this Ivee control.")
        }
        

	})

    .subscribedEventHandler('offHandler_D', (context, event) => {
        
        if (this.getDayOk(D_day) && this.getTimeOk(D_timeStart, D_timeEnd)) {
        D_lightsOff?.off()
        if (D_phraseOff) {
        location.helloHome.execute(D_phraseOff)
        }
        if (D_modeOff && location.mode != D_modeOff ) {
        if (location.modes?.find({
        it.name == D_modeOff
        })) {
        this.setLocationMode(D_modeOff)
        } else {
        console.log("Unable to change to undefined mode '$D_modeOff'")
        }
        }
        console.log("Master switch in $D_name was turned off. Completing off actions for this Ivee control.")
        }
        

	})

    .subscribedEventHandler('offHandler_A', (context, event) => {
        
        if (this.getDayOk(A_day) && this.getTimeOk(A_timeStart, A_timeEnd)) {
        A_lightsOff?.off()
        if (A_phraseOff) {
        location.helloHome.execute(A_phraseOff)
        }
        if (A_modeOff && location.mode != A_modeOff ) {
        if (location.modes?.find({
        it.name == A_modeOff
        })) {
        this.setLocationMode(A_modeOff)
        } else {
        console.log("Unable to change to undefined mode '$A_modeOff'")
        }
        }
        console.log("Master switch in $A_name was turned off. Completing off actions for this Ivee control.")
        }
        

	})

    .subscribedEventHandler('onHandler_A', (context, event) => {
        
        if (this.getDayOk(A_day) && this.getTimeOk(A_timeStart, A_timeEnd)) {
        A_lightsOn?.on()
        if (A_phraseOn) {
        location.helloHome.execute(A_phraseOn)
        }
        if (A_modeOn && location.mode != A_modeOn ) {
        if (location.modes?.find({
        it.name == A_modeOn
        })) {
        this.setLocationMode(A_modeOn)
        } else {
        console.log("Unable to change to undefined mode '$A_modeOn'")
        }
        }
        console.log("Master switch in $A_name was turned on. Completing on actions for this Ivee control.")
        }
        

	})

    .subscribedEventHandler('onHandler_B', (context, event) => {
        
        if (this.getDayOk(B_day) && this.getTimeOk(B_timeStart, B_timeEnd)) {
        B_lightsOn?.on()
        if (B_phraseOn) {
        location.helloHome.execute(B_phraseOn)
        }
        if (B_modeOn && location.mode != B_modeOn ) {
        if (location.modes?.find({
        it.name == B_modeOn
        })) {
        this.setLocationMode(B_modeOn)
        } else {
        console.log("Unable to change to undefined mode '$B_modeOn'")
        }
        }
        console.log("Master switch in $B_name was turned on. Completing on actions for this Ivee control.")
        }
        

	})

    .subscribedEventHandler('offHandler_C', (context, event) => {
        
        if (this.getDayOk(C_day) && this.getTimeOk(C_timeStart, C_timeEnd)) {
        C_lightsOff?.off()
        if (C_phraseOff) {
        location.helloHome.execute(C_phraseOff)
        }
        if (C_modeOff && location.mode != C_modeOff ) {
        if (location.modes?.find({
        it.name == C_modeOff
        })) {
        this.setLocationMode(C_modeOff)
        } else {
        console.log("Unable to change to undefined mode '$C_modeOff'")
        }
        }
        console.log("Master switch in $C_name was turned off. Completing off actions for this Ivee control.")
        }
        

	})
