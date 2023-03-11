
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Make noise on these Door Sensors:', section => {
            section.deviceSetting('doors').capability(['contactSensor']).name('Chime Only on these Doors');
            section.deviceSetting('doors1').capability(['contactSensor']).name('Specific Tone for this door:');
            section.enumSetting('noise1').name('Tone # for door1:');
            section.deviceSetting('doors2').capability(['contactSensor']).name('Specific Tone for this door:');
            section.enumSetting('noise2').name('Tone # for door2:');
            section.deviceSetting('doors3').capability(['contactSensor']).name('Specific Tone for this door:');
            section.enumSetting('noise3').name('Tone # for door3:');
            section.deviceSetting('doors4').capability(['contactSensor']).name('Specific Tone for this door:');
            section.enumSetting('noise4').name('Tone # for door4:');
            section.deviceSetting('doors5').capability(['contactSensor']).name('Specific Tone for this door:');
            section.enumSetting('noise5').name('Tone # for door5:');
            section.deviceSetting('doors6').capability(['contactSensor']).name('Specific Tone for this door:');
            section.enumSetting('noise6').name('Tone # for door6:');
            section.deviceSetting('doors7').capability(['contactSensor']).name('Specific Tone for this door:');
            section.enumSetting('noise7').name('Tone # for door7:');
            section.deviceSetting('doors8').capability(['contactSensor']).name('Specific Tone for this door:');
            section.enumSetting('noise8').name('Tone # for door8:');

        });


        page.section('Doorbell', section => {
            section.deviceSetting('doorbell').capability(['contactSensor']).name('Doorbell Noise');

        });


        page.section('Tornado alarms:', section => {

        });


        page.section('Zip code (optional, defaults to location coordinates)...', section => {
            section.textSetting('zipcode').name('Zip Code');

        });


        page.section('Update on this switch', section => {
            section.deviceSetting('updateSwitch').capability(['switch']).name('Switch that causes update');

        });


        page.section('Use this speaker', section => {
            section.deviceSetting('speaker').capability(['switch']).name('Speaker for sounds');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.doorbell, 'contactSensor', 'contact.open', 'doorbellRing')

        await context.api.subscriptions.subscribeToDevices(context.config.doors7, 'contactSensor', 'contact.open', 'doorChime7')

        await context.api.subscriptions.subscribeToDevices(context.config.doors1, 'contactSensor', 'contact.open', 'doorChime1')

        await context.api.subscriptions.subscribeToDevices(context.config.updateSwitch, 'switch', 'switch.on', 'checkForSevereWeather')

        await context.api.subscriptions.subscribeToDevices(context.config.doors3, 'contactSensor', 'contact.open', 'doorChime3')

        await context.api.subscriptions.subscribeToDevices(context.config.doors8, 'contactSensor', 'contact.open', 'doorChime8')

        await context.api.subscriptions.subscribeToDevices(context.config.doors5, 'contactSensor', 'contact.open', 'doorChime5')

        await context.api.subscriptions.subscribeToDevices(context.config.doors4, 'contactSensor', 'contact.open', 'doorChime4')

        await context.api.subscriptions.subscribeToDevices(context.config.doors6, 'contactSensor', 'contact.open', 'doorChime6')

        await context.api.subscriptions.subscribeToDevices(context.config.doors2, 'contactSensor', 'contact.open', 'doorChime2')

        await context.api.subscriptions.subscribeToDevices(context.config.doors, 'contactSensor', 'contact.open', 'doorChime')

    })

    .subscribedEventHandler('doorChime4', (context, event) => {
        
        console.log("doorChime(1,$noise4)")
        
        context.api.devices.sendCommands(context.config.speaker, 'switch', smsenddoorbell)
    
        

	})

    .subscribedEventHandler('doorChime7', (context, event) => {
        
        console.log("doorChime(1,$noise7)")
        
        context.api.devices.sendCommands(context.config.speaker, 'switch', smsenddoorbell)
    
        

	})

    .subscribedEventHandler('doorChime5', (context, event) => {
        
        console.log("doorChime(1,$noise5)")
        
        context.api.devices.sendCommands(context.config.speaker, 'switch', smsenddoorbell)
    
        

	})

    .subscribedEventHandler('doorChime3', (context, event) => {
        
        console.log("doorChime(1,$noise3)")
        
        context.api.devices.sendCommands(context.config.speaker, 'switch', smsenddoorbell)
    
        

	})

    .subscribedEventHandler('doorChime', (context, event) => {
        
        console.log('doorChime()')
        
        context.api.devices.sendCommands(context.config.speaker, 'switch', smsenddoorbell)
    
        

	})

    .subscribedEventHandler('doorChime6', (context, event) => {
        
        console.log("doorChime(1,$noise6)")
        
        context.api.devices.sendCommands(context.config.speaker, 'switch', smsenddoorbell)
    
        

	})

    .subscribedEventHandler('checkForSevereWeather', (context, event) => {
        
        let alerts
        if (this.locationIsDefined()) {
        if (this.zipcodeIsValid()) {
        alerts = this.getWeatherFeature('alerts', zipcode)?.alerts
        } else {
        log.warn('Severe Weather Alert: Invalid zipcode entered, defaulting to location\'s zipcode')
        alerts = this.getWeatherFeature('alerts')?.alerts
        }
        } else {
        log.warn('Severe Weather Alert: Location is not defined')
        }
        console.log("alerts: $alerts")
        if (alerts == []) {
        state.tornadoWatch = false
        state.tornadoWarning = false
        }
        let newKeys = alerts?.collect({
        it.type + it.date_epoch
        }) ? alerts?.collect({
        it.type + it.date_epoch
        }) : []
        console.log("Severe Weather Alert: newKeys: $newKeys")
        let oldKeys = state.alertKeys ? state.alertKeys : []
        console.log("Severe Weather Alert: oldKeys: $oldKeys")
        if (newKeys != oldKeys ) {
        state.alertKeys = newKeys
        alerts.each({ let alert ->
        if (!(oldKeys.contains(alert.type + alert.date_epoch)) && this.descriptionFilter(alert.description)) {
        let msg = "Weather Alert! ${alert.description} from ${alert.date} until ${alert.expires}"
        if (alert.description.contains('Tornado Warning') && !state.tornadoWarning) {
        console.log('Sending Tornado Warning Siren')
        state.tornadoWatch = false
        state.tornadoWarning = true
        if (warningSiren) {
        
        context.api.devices.sendCommands(context.config.speaker, 'switch', smsenddoorbell)
    
        }
        if (alert.description.contains('Tornado Watch') && !state.tornadoWatch) {
        console.log('Sending Tornado Watch Siren')
        state.tornadoWarning = false
        state.tornadoWatch = true
        if (watchSiren && !state.tornadoWarning) {
        
        context.api.devices.sendCommands(context.config.speaker, 'switch', smsenddoorbell)
    
        }
        }
        }
        }
        })
        }
        

	})

    .subscribedEventHandler('doorChime1', (context, event) => {
        
        console.log("doorChime(1,$noise1)")
        
        context.api.devices.sendCommands(context.config.speaker, 'switch', smsenddoorbell)
    
        

	})

    .subscribedEventHandler('doorChime8', (context, event) => {
        
        console.log("doorChime(1,$noise8)")
        
        context.api.devices.sendCommands(context.config.speaker, 'switch', smsenddoorbell)
    
        

	})

    .subscribedEventHandler('doorbellRing', (context, event) => {
        
        console.log('doorbellRing()')
        
        context.api.devices.sendCommands(context.config.speaker, 'switch', smsenddoorbell)
    
        
        context.api.devices.sendCommands(context.config.doorbell, 'contactSensor', close)
    
        

	})

    .subscribedEventHandler('doorChime2', (context, event) => {
        
        console.log("doorChime(1,$noise2)")
        
        context.api.devices.sendCommands(context.config.speaker, 'switch', smsenddoorbell)
    
        

	})
