
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices:', section => {
            section.deviceSetting('sonoff').capability(['sensor']).name('Which Compound Sonoff device  detects presence ');
            section.deviceSetting('who1').capability(['presenceSensor']).name('First Forced Mobile Presense?');
            section.deviceSetting('who2').capability(['presenceSensor']).name('Second Forced Mobile Presense?');
            section.deviceSetting('who3').capability(['presenceSensor']).name('Third Forced Mobile Presense?');
            section.deviceSetting('who4').capability(['presenceSensor']).name('Fourth Forced Mobile Presense?');
            section.deviceSetting('who5').capability(['presenceSensor']).name('First Forced Mobile Presense?');
            section.deviceSetting('who6').capability(['presenceSensor']).name('Second Forced Mobile Presense?');
            section.deviceSetting('who7').capability(['presenceSensor']).name('Third Forced Mobile Presense?');
            section.deviceSetting('who8').capability(['presenceSensor']).name('Fourth Forced Mobile Presense?');
            section.deviceSetting('who9').capability(['presenceSensor']).name('First Forced Mobile Presense?');
            section.deviceSetting('who10').capability(['presenceSensor']).name('Second Forced Mobile Presense?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'sensor', 'presence0', 'presence1')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'sensor', 'presence4', 'presence5')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'sensor', 'presence9', 'presence10')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'sensor', 'presence3', 'presence4')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'sensor', 'presence7', 'presence8')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'sensor', 'presence1', 'presence2')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'sensor', 'presence5', 'presence6')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'sensor', 'presence8', 'presence9')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'sensor', 'presence2', 'presence3')

        await context.api.subscriptions.subscribeToDevices(context.config.sonoff, 'sensor', 'presence6', 'presence7')

    })

    .subscribedEventHandler('presence9', (context, event) => {
        
        let who = who9
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})

    .subscribedEventHandler('presence1', (context, event) => {
        
        let who = who1
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})

    .subscribedEventHandler('presence7', (context, event) => {
        
        let who = who7
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})

    .subscribedEventHandler('presence10', (context, event) => {
        
        let who = who10
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})

    .subscribedEventHandler('presence6', (context, event) => {
        
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
        
        let who = who8
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})

    .subscribedEventHandler('presence4', (context, event) => {
        
        let who = who4
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})

    .subscribedEventHandler('presence5', (context, event) => {
        
        let who = who5
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})

    .subscribedEventHandler('presence3', (context, event) => {
        
        let who = who3
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})

    .subscribedEventHandler('presence2', (context, event) => {
        
        let who = who2
        let whoState = who.currentState('presence')
        if (event.value =~ 'present' && whoState.value == 'not present') {
        this.present(who)
        }
        if (event.value =~ 'absent' && whoState.value == 'present') {
        this.absent(who)
        }
        

	})
