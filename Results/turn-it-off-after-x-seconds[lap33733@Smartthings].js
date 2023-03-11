
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When a switch turns on...', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


        page.section('Turn off how many seconds later?', section => {
            section.deviceSetting('theSwitch2').capability(['switch']).name('Switch to turn Off');
            section.booleanSetting('switchSHM').name('Switch SHM');
            section.numberSetting('secondsLater').name('How many seconds?');
            section.booleanSetting('alsoTurnOn').name('Also turn on?');

        });


        page.section('Optionaly play a message', section => {
            section.enumSetting('stLanguage').name('SmartThings Voice?');
            section.textSetting('message').name('Play this message');
            section.deviceSetting('sonos').capability(['musicPlayer']).name('On this Speaker player');
            section.numberSetting('volume').name('Temporarily change volume');
            section.timeSetting('fromTime').name('From');
            section.timeSetting('toTime').name('To');
            section.booleanSetting('onlyOnce').name('Run Only Once a day');
            section.deviceSetting('person').capability(['presenceSensor']).name('if is present');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('resetHasRun', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        console.log("Switch $theSwitch turned: ${event.value}")
        let delay = secondsLater
        console.log("Turning off Switch $theSwitch2 in $secondsLater")
        if (state.hasRunToday == null) {
        state.hasRunToday = false
        }
        if (alsoTurnOn == true) {
        
        context.api.devices.sendCommands(context.config.theSwitch2, 'switch', on)
    
        console.log('Turning on switches')
        }
        if (message) {
        if (fromTime != null && toTime != null) {
        let between = this.timeOfDayIsBetween(fromTime, toTime, new Date(), location.timeZone)
        if (between) {
        this.playMessage()
        } else {
        console.log('Not correct time')
        }
        } else {
        if (onlyOnce == true && state.hasRunToday == false) {
        this.playMessage()
        } else {
        if (onlyOnce == false) {
        this.playMessage()
        } else {
        console.log('Did not run because hasRunToday=' + state.hasRunToday)
        }
        }
        }
        }
        this.runIn(delay, turnOffSwitch)
        

	})

    .scheduledEventHandler('resetHasRun', (context, event) => {
        
        state.hasRunToday = false
        

	})
