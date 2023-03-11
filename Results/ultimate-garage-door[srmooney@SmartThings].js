
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('The Door', section => {
            section.deviceSetting('doorSensor').capability(['contactSensor']).name('Which Sensor?');
            section.deviceSetting('doorSwitch').capability(['momentary']).name('Which Relay?');
            section.textSetting('doorName').name('Name');

        });


        page.section(''Settings'', section => {

        });


        page.section('Arrival / Departure', section => {
            section.deviceSetting('presenceArrive').capability(['presenceSensor']).name('Open when these people arrive:');
            section.deviceSetting('presenceDepart').capability(['presenceSensor']).name('Close when these people leave:');

        });


        page.section('Night Settings', section => {
            section.booleanSetting('closeSunset').name('Close after sunset');

        });


        page.section('['hideable': true, 'hidden': true], 'Sunset offset (optional)...', section => {
            section.numberSetting('sunsetOffsetValue').name('Minutes');
            section.enumSetting('sunsetOffsetDir').name('Before or After');

        });


        page.section('If opened after dark, close after...', section => {
            section.numberSetting('closeAfter').name('Minutes');

        });


        page.section('', section => {
            section.enumSetting('notify').name('Notify when...');

        });


        page.section('', section => {
            section.numberSetting('notifyLeftOpen').name('Minutes');
            section.numberSetting('notifyFrequency').name('Minutes');
            section.numberSetting('notifyMax').name('Times');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presenceArrive, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceDepart, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.doorSensor, 'contactSensor', 'contact', 'contactHandler')

        context.api.schedules.runOnce('closeAfterSunset', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunsetTimeHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("Contact is in ${event.value} state")
        if
        let msg = "${this.getDoorName()} opened"
        console.log("$msg")
        this.sendPush("$msg")
        }
        if
        let msg = "${this.getDoorName()} closed"
        console.log("$msg")
        this.sendPush("$msg")
        }
        if (event.value == 'open' && closeAfter && this.isItNight()) {
        this.runIn(closeAfter * 60, closeWhenDark)
        }
        if (notifyLeftOpen && event.value == 'open') {
        this.scheduleDoorCheck()
        }
        if (event.value == 'close') {
        state.openTime = 0
        state.openNotifyCount = 0
        }
        

	})

    .subscribedEventHandler('sunsetTimeHandler', (context, event) => {
        
        let sunsetTime = Date.parse('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'', event.value)
        let sunsetTomorrow = sunsetTime.time + this.getSunsetOffsetValue()
        this.sendPush("Next Sunset: ${new Date(sunsetTomorrow)} (${this.formatLocalDate(sunsetTomorrow)} local time)")
        if (settings.closeSunset) {
        console.log("schedule close for $sunsetTomorrow, ${new Date(sunsetTomorrow)}")
        this.runOnce(new Date(sunsetTomorrow), closeAfterSunset)
        }
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        if (event.value == 'not present' && doorSensor.contactState.value == 'open') {
        for (let person : presenceDepart ) {
        if (person.toString() == event.displayName) {
        this.close()
        if
        let msg = "Closing ${this.getDoorName()} due to the departure of ${event.displayName}"
        console.log("$msg")
        this.sendPush("$msg")
        }
        break
        }
        }
        }
        if (event.value == 'present' && doorSensor.contactState.value == 'closed') {
        for (let person : presenceArrive ) {
        if (person.toString() == event.displayName) {
        this.open()
        if
        let msg = "Opening ${this.getDoorName()} due to the arriaval of ${event.displayName}"
        console.log("$msg")
        this.sendPush("$msg")
        }
        break
        }
        }
        }
        

	})

    .subscribedEventHandler('sunriseTimeHandler', (context, event) => {
        
        

	})

    .scheduledEventHandler('closeAfterSunset', (context, event) => {
        
        if (closeSunset == true && doorSensor.contactState.value == 'open') {
        
        context.api.devices.sendCommands(context.config.sunsetOffsetDir, 'enum', sendPush)
    
        this.close()
        }
        

	})
