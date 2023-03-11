
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these bulbs...', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Hue Bulbs?');

        });


        page.section('Light level...', section => {
            section.numberSetting('level').name('In percent');

        });


        page.section('Warn for these contact sensors...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contacts');

        });


        page.section('Low temperature to trigger warning...', section => {
            section.numberSetting('lowtemp').name('In degrees F');

        });


        page.section('How far out should we look for freezing temps?', section => {
            section.numberSetting('hours').name('Hours');

        });


        page.section('Days between calendar alerts...', section => {
            section.numberSetting('caldays').name('Days');

        });


        page.section('Switch to use to reset calendar alert', section => {
            section.deviceSetting('calswitch').capability(['momentary']).name('Switch');

        });


        page.section('Forecast API Key', section => {
            section.textSetting('apikey').name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.calswitch, 'momentary', 'momentary.pushed', 'calendarResetHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact.closed', 'contactClosedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        log.trace('contactOpenHandler')
        state.contacts[event.displayName] = false
        state.alerts['contact'] = true
        this.flashToOn('Red')
        console.log(state)
        

	})

    .subscribedEventHandler('calendarResetHandler', (context, event) => {
        
        log.trace('calendarResetHandler')
        state.dogmeds = this.now()
        state.alerts['dogmeds'] = false
        this.checkAll()
        

	})

    .subscribedEventHandler('contactClosedHandler', (context, event) => {
        
        log.trace('contactClosedHandler')
        state.contacts[event.displayName] = true
        console.log(state.contacts)
        this.checkDoors()
        this.flash('Green')
        console.log('continuing')
        this.updateHues()
        

	})
