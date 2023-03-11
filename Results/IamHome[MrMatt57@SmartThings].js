
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this person(s) arive...', section => {
            section.deviceSetting('person').capability(['presenceSensor']).name('Who to Monitor:');

        });


        page.section('Turn on these switches...', section => {
            section.deviceSetting('switchDevices').capability(['switch']).name('Switch(s):');
            section.numberSetting('switchHowLongMinutes').name('Minutes (default 5):');

        });


        page.section('Turn on these dimmers...', section => {
            section.deviceSetting('dimmerDevices').capability(['switchLevel']).name('Dimmer(s):');
            section.numberSetting('dimmerLevel').name('Dimmer level (default 100):');
            section.numberSetting('dimmerHowLongMinutes').name('How many minutes to leave on (default 5):');

        });


        page.section('Turn off when this device is switched/opened...', section => {
            section.deviceSetting('TurnOffContactDevices').capability(['contactSensor']).name('Contact(s):');
            section.deviceSetting('TurnOffSwitchDevices').capability(['switch']).name('Swtiches(s):');

        });


        page.section('Options...', section => {
            section.enumSetting('preserveState').name('Preserve switch/dimmer state?');
            section.enumSetting('activeAfterSunset').name('Only active after sunset?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.TurnOffContactDevices, 'contactSensor', 'contact.open', 'turnOffActived')

        await context.api.subscriptions.subscribeToDevices(context.config.TurnOffSwitchDevices, 'switch', 'switch.on', 'turnOffActived')

        await context.api.subscriptions.subscribeToDevices(context.config.person, 'presenceSensor', 'presence', 'someoneArived')

    })

    .subscribedEventHandler('someoneArived', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'present') {
        let findFalseAlarmThreshold = findFalseAlarmThreshold ? findFalseAlarmThreshold : 10
        let threshold = 1000 * 60 * findFalseAlarmThreshold - 1000
        let currentDate = new Date()
        console.log("currentDate: $currentDate")
        let lastLeft = state.lastLeft ? state.lastLeft : this.now()
        lastLeft = Date.parse('yyyy-MM-dd\'T\'HH:mm:ssZ', lastLeft)
        console.log("lastLeft: $lastLeft")
        let elapsed = this.now() - lastLeft.time
        if (elapsed >= threshold ) {
        console.log('Away long enough, activated arrival')
        this.activateArrival()
        } else {
        log.info('Not gone long enough, false positive?')
        }
        } else {
        state.lastLeft = new Date()
        console.log("Last left: ${state.lastLeft}")
        }
        

	})

    .subscribedEventHandler('turnOffActived', (context, event) => {
        
        if (state.active == 'Yes') {
        this.switchTimeout()
        this.dimmerTimeout()
        }
        

	})
