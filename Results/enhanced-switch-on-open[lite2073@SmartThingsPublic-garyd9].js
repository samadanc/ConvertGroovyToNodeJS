
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Nighttime light on door open', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('When this door opens...');
            section.deviceSetting('switch1').capability(['switch']).name('Turn on this light...');
            section.numberSetting('howLong').name('For this many minutes...');
            section.booleanSetting('nightOnly').name('Only between sunset and sunrise?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'contactOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (state.active == true) {
        console.log('Switch event detected.  Canceling scheduled turn off')
        this.unschedule()
        state.active = false
        }
        

	})

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        let timer = howLong ? howLong : 3000
        let bIsValidTime = !nightOnly
        if (!bIsValidTime) {
        this.retrieveSunData(false)
        TimeZone.setDefault(location.timeZone)
        let curTime = new Date(this.now())
        let dtSunrise = this.timeTodayAfter('0:00', state.sunriseTime, location.timeZone)
        let dtSunset = this.timeTodayAfter('12:00', state.sunsetTime, location.timeZone)
        console.log("state.sunriseTime: ${state.sunriseTime} dtSunrise: ${dtSunrise.inspect()}")
        console.log("state.sunsetTime: ${state.sunsetTime} dtSunrise: ${dtSunset.inspect()}")
        console.log("curTime: ${curTime.inspect()}")
        bIsValidTime = curTime.getTime() < dtSunrise.time || curTime.getTime() > dtSunset.time
        }
        if (bIsValidTime) {
        if (switch1.switchState.value == 'off' || state.active == true) {
        if (state.active == true) {
        console.log('Cancelling existing schedule to reset.')
        this.unschedule()
        state.active = false
        }
        log.trace("Turning on switch: $switch1")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        state.active = true
        this.runIn(60 * timer , turnOffSwitch)
        } else {
        console.log('Switch was already on; not doing anything')
        }
        } else {
        console.log("$contact1 opened, but it's daytime")
        }
        

	})
