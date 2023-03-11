
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose switches to group one multi-way switch.', section => {
            section.deviceSetting('switches').capability(['switch']).name('Select Switches');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Select Dimmers');
            section.booleanSetting('dimonoff').name('Use \');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'level', 'dimmersHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchesHandler')

    })

    .subscribedEventHandler('dimmersHandler', (context, event) => {
        
        let evtSource = event.source
        let evtDevice = event.device
        let dimLevel = event.value.toInteger()
        let swTarget = dimLevel == 0 ? 'off' : 'on'
        if (!(state.silent.contains(event.device.id))) {
        console.log("Process event '${event.value}' from ${evtDevice.displayName} (${event.source})")
        let effectiveSwitches = []
        let effectiveDimmers = []
        switches.each({ let sw ->
        if (sw.id != event.device.id && !(this.deviceInList(sw, dimmers)) && sw.currentValue('switch') != event.value) {
        effectiveSwitches.add(sw)
        }
        })
        dimmers.each({ let dim ->
        if (dim.id != event.device.id && dim.currentValue('level').toInteger() != dimLevel ) {
        effectiveDimmers.add(dim)
        }
        })
        state.silent = []
        if (effectiveSwitches != null && effectiveSwitches.size() > 0) {
        state.silent = state.silent + effectiveSwitches.id
        }
        if (effectiveDimmers != null && effectiveDimmers.size() > 0) {
        state.silent = state.silent + effectiveDimmers.id
        }
        console.log("Device ${state.silent} are put into silence mode.")
        this.operateSwitchDimmer(effectiveSwitches, swTarget, effectiveDimmers, dimLevel)
        } else {
        console.log("Process event '${event.value}' from ${evtDevice.displayName} (${event.source}) since device is silenced")
        state.silent.remove(event.device.id)
        }
        

	})

    .subscribedEventHandler('switchesHandler', (context, event) => {
        
        let evtSource = event.source
        let evtDevice = event.device
        let swTarget = event.value
        let dimLevel = swTarget == 'on' ? 99 : 0
        if (!(state.silent.contains(event.device.id))) {
        console.log("Process event '${event.value}' from ${evtDevice.displayName} (${event.source})")
        let effectiveSwitches = []
        let effectiveDimmers = []
        if (dimonoff == true) {
        switches.each({ let sw ->
        if (sw.id != event.device.id && !(this.deviceInList(sw, dimmers)) && sw.currentValue('switch') != event.value) {
        effectiveSwitches.add(sw)
        }
        })
        dimmers.each({ let dim ->
        if (dim.id != event.device.id && dim.currentValue('level').toInteger() != dimLevel ) {
        effectiveDimmers.add(dim)
        }
        })
        } else {
        switches.each({ let sw ->
        if (sw.id != event.device.id && sw.currentValue('switch') != event.value) {
        effectiveSwitches.add(sw)
        }
        })
        dimmers.each({ let dim ->
        if (dim.id != event.device.id && !(this.deviceInList(dim, switches)) && dim.currentValue('level').toInteger() != dimLevel ) {
        effectiveDimmers.add(dim)
        }
        })
        }
        state.silent = []
        if (effectiveSwitches != null && effectiveSwitches.size() > 0) {
        state.silent = state.silent + effectiveSwitches.id
        }
        if (effectiveDimmers != null && effectiveDimmers.size() > 0) {
        state.silent = state.silent + effectiveDimmers.id
        }
        console.log("Device ${state.silent} are put into silence mode.")
        this.operateSwitchDimmer(effectiveSwitches, swTarget, effectiveDimmers, dimLevel)
        } else {
        console.log("Process event '${event.value}' from ${evtDevice.displayName} (${event.source}) since device is silenced")
        state.silent.remove(event.device.id)
        }
        

	})
