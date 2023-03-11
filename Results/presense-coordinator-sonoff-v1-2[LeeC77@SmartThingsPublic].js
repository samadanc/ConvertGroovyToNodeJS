
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices:', section => {
            section.deviceSetting('sonoff').capability(['presenceSensor']).name('Which Compound Sonoff device detects WiFi presence ');
            section.deviceSetting('who1').capability(['presenceSensor']).name('First Forced Mobile Presence?');
            section.deviceSetting('who2').capability(['presenceSensor']).name('Second Forced Mobile Presence?');
            section.deviceSetting('who3').capability(['presenceSensor']).name('Third Forced Mobile Presence?');
            section.deviceSetting('who4').capability(['presenceSensor']).name('Fourth Forced Mobile Presence?');
            section.deviceSetting('who5').capability(['presenceSensor']).name('Fith Forced Mobile Presence?');
            section.deviceSetting('who6').capability(['presenceSensor']).name('Sixth Forced Mobile Presence?');
            section.deviceSetting('who7').capability(['presenceSensor']).name('Seventh Forced Mobile Presence?');
            section.deviceSetting('who8').capability(['presenceSensor']).name('Eighth Forced Mobile Presence?');
            section.deviceSetting('who9').capability(['presenceSensor']).name('Nineth Forced Mobile Presence?');
            section.deviceSetting('who10').capability(['presenceSensor']).name('Tenth Forced Mobile Presence?');

        });


        page.section('Expected time between door opening and person disconnecting <5 minutes>', section => {
            section.numberSetting('delay').name('Minutes?');

        });


        page.section('Enter exit doors?', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Door 1');
            section.deviceSetting('contact2').capability(['contactSensor']).name('Door 2');

        });


        page.section('Optinallly also use these mobile devices', section => {
            section.deviceSetting('dev1').capability(['presenceSensor']).name('Which mobile device for Presence1?');
            section.deviceSetting('dev2').capability(['presenceSensor']).name('Which mobile device for Presence2?');
            section.deviceSetting('dev3').capability(['presenceSensor']).name('Which mobile device for Presence3?');
            section.deviceSetting('dev4').capability(['presenceSensor']).name('Which mobile device for Presence4?');
            section.deviceSetting('dev5').capability(['presenceSensor']).name('Which mobile device for Presence5?');
            section.deviceSetting('dev6').capability(['presenceSensor']).name('Which mobile device for Presence6?');
            section.deviceSetting('dev7').capability(['presenceSensor']).name('Which mobile device for Presence7?');
            section.deviceSetting('dev8').capability(['presenceSensor']).name('Which mobile device for Presence8?');
            section.deviceSetting('dev9').capability(['presenceSensor']).name('Which mobile device for Presence9?');
            section.deviceSetting('dev10').capability(['presenceSensor']).name('Which mobile device for Presence10?');

        });


        page.section('Debug', section => {
            section.enumSetting('level').name('What level of debug? ');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.dev4, 'presenceSensor', 'presence', 'device4')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'presenceSensor', 'presence5', 'presence6')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'presenceSensor', 'presence1', 'presence2')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'presenceSensor', 'presence3', 'presence4')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'presenceSensor', 'presence8', 'presence9')

        await context.api.subscriptions.subscribeToDevices(context.config.dev5, 'presenceSensor', 'presence', 'device5')

        await context.api.subscriptions.subscribeToDevices(context.config.dev7, 'presenceSensor', 'presence', 'device7')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'presenceSensor', 'presence6', 'presence7')

        await context.api.subscriptions.subscribeToDevices(context.config.dev6, 'presenceSensor', 'presence', 'device6')

        await context.api.subscriptions.subscribeToDevices(context.config.dev3, 'presenceSensor', 'presence', 'device3')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'presenceSensor', 'presence2', 'presence3')

        await context.api.subscriptions.subscribeToDevices(context.config.dev2, 'presenceSensor', 'presence', 'device2')

        await context.api.subscriptions.subscribeToDevices(context.config.dev10, 'presenceSensor', 'presence', 'device10')

        await context.api.subscriptions.subscribeToDevices(context.config.dev9, 'presenceSensor', 'presence', 'device9')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'presenceSensor', 'presence4', 'presence5')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'presenceSensor', 'presence9', 'presence10')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'presenceSensor', 'presence7', 'presence8')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'presenceSensor', 'presence0', 'presence1')

        await context.api.subscriptions.subscribeToDevices(context.config.dev8, 'presenceSensor', 'presence', 'device8')

        await context.api.subscriptions.subscribeToDevices(context.config.dev1, 'presenceSensor', 'presence', 'device1')

    })

    .subscribedEventHandler('device9', (context, event) => {
        
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who9
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})

    .subscribedEventHandler('device8', (context, event) => {
        
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who8
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})

    .subscribedEventHandler('presence3', (context, event) => {
        
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who3
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        if (this.checkexit()) {
        this.absent(who)
        }
        }
        

	})

    .subscribedEventHandler('device5', (context, event) => {
        
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who5
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})

    .subscribedEventHandler('device3', (context, event) => {
        
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who3
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})

    .subscribedEventHandler('presence1', (context, event) => {
        
        if ((level as Integer) > 1) {
        console.log(' Start ')
        }
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who1
        let whoState = who.currentState('presence')
        if ((level as Integer) > 1) {
        console.log("$who, ${whoState.value}")
        }
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        if (this.checkexit()) {
        this.absent(who)
        }
        }
        

	})

    .subscribedEventHandler('presence10', (context, event) => {
        
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who10
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        if (this.checkexit()) {
        this.absent(who)
        }
        }
        

	})

    .subscribedEventHandler('presence4', (context, event) => {
        
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who4
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        if (this.checkexit()) {
        this.absent(who)
        }
        }
        

	})

    .subscribedEventHandler('device1', (context, event) => {
        
        if ((level as Integer) > 1) {
        console.log('Mobile Device ')
        }
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who1
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})

    .subscribedEventHandler('device10', (context, event) => {
        
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who10
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})

    .subscribedEventHandler('presence2', (context, event) => {
        
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who2
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        if (this.checkexit()) {
        this.absent(who)
        }
        }
        

	})

    .subscribedEventHandler('presence7', (context, event) => {
        
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who7
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        if (this.checkexit()) {
        this.absent(who)
        }
        }
        

	})

    .subscribedEventHandler('device4', (context, event) => {
        
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who4
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})

    .subscribedEventHandler('device7', (context, event) => {
        
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who7
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})

    .subscribedEventHandler('presence6', (context, event) => {
        
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who6
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        if (this.checkexit()) {
        this.absent(who)
        }
        }
        

	})

    .subscribedEventHandler('presence5', (context, event) => {
        
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who5
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        if (this.checkexit()) {
        this.absent(who)
        }
        }
        

	})

    .subscribedEventHandler('presence9', (context, event) => {
        
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who9
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        if (this.checkexit()) {
        this.absent(who)
        }
        }
        

	})

    .subscribedEventHandler('device2', (context, event) => {
        
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who2
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})

    .subscribedEventHandler('device6', (context, event) => {
        
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who6
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})

    .subscribedEventHandler('presence8', (context, event) => {
        
        if ((level as Integer) > 0) {
        console.log("Event : ${event.value}")
        }
        let who = who8
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        if (this.checkexit()) {
        this.absent(who)
        }
        }
        

	})
