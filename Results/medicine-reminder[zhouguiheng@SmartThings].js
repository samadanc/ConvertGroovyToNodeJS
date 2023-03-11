
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the medicine motion sensor:', section => {
            section.deviceSetting('medicineSensor').capability(['motionSensor']).name('');

        });


        page.section('Select the location motion sensor:', section => {
            section.deviceSetting('locationSensor').capability(['motionSensor']).name('');

        });


        page.section('Select the presence sensor:', section => {
            section.deviceSetting('presenceSensor').capability(['presenceSensor']).name('');

        });


        page.section('Select the tone device:', section => {
            section.deviceSetting('toneDevice').capability(['tone']).name('');

        });


        page.section('How to play sound:', section => {
            section.enumSetting('playType').name('Type');
            section.numberSetting('soundNumber').name('Sound number for playSound');
            section.numberSetting('doneSoundNumber').name('Sound number for playSound when motion detected');

        });


        page.section('Between what time?', section => {
            section.timeSetting('fromTime').name('From');
            section.timeSetting('toTime').name('To');

        });


        page.section('On Which Days', section => {
            section.enumSetting('days').name('Select Days of the Week');

        });


        page.section('Time to remind regardless location / presence sensor:', section => {
            section.timeSetting('finalTime').name('Time to remind');

        });


        page.section('Debug logging', section => {
            section.booleanSetting('enableLog').name('Enable?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.locationSensor, 'motionSensor', 'motion.active', 'nearMedicine')

        await context.api.subscriptions.subscribeToDevices(context.config.medicineSensor, 'motionSensor', 'motion.active', 'medicineTaken')

        context.api.schedules.schedule('maybeRemind', delay);

    })

    .subscribedEventHandler('nearMedicine', (context, event) => {
        
        this.logDebug('nearMedicine()')
        if
        return null
        }
        this.maybeRemind(evt)
        

	})

    .subscribedEventHandler('medicineTaken', (context, event) => {
        
        this.logDebug("medicineTaken() at ${this.now()}")
        state.lastMedicineTakenTime = this.now()
        if (playType != 'beep' && doneSoundNumber != null) {
        
        context.api.devices.sendCommands(context.config.toneDevice, 'tone', playSound)
    
        }
        

	})

    .scheduledEventHandler('maybeRemind', (context, event) => {
        
        this.logDebug("maybeRemind(), hours: ${this.hoursSinceLastMedicineTaken()}")
        if (this.hoursSinceLastMedicineTaken() < 6) {
        return null
        }
        this.logDebug('More than 6 hours')
        if (!(this.timeOfDayIsBetween(this.toDateTime(fromTime), this.toDateTime(toTime), new Date(), location.timeZone))) {
        return null
        }
        this.logDebug('Within given time')
        let df = new java.text.SimpleDateFormat('EEEE')
        df.setTimeZone(location.timeZone)
        let day = df.format(new Date())
        if
        return null
        }
        this.logDebug('In given days')
        if (playType == 'beep') {
        
        context.api.devices.sendCommands(context.config.toneDevice, 'tone', beep)
    
        } else {
        
        context.api.devices.sendCommands(context.config.toneDevice, 'tone', playSound)
    
        }
        

	})
