
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When a door unlocks...', section => {
            section.deviceSetting('lock1').capability(['lock']).name('Door Lock?');

        });


        page.section('...and any of these codes (or methods) opened the door...', section => {
            section.enumSetting('unlockCode').name('User Code');

        });


        page.section('...Then...', section => {
            section.deviceSetting('doors').capability(['doorControl']).name('Close these doors');
            section.deviceSetting('switches').capability(['switch']).name('Turn on these switches');
            section.booleanSetting('sendPush').name('Push notification to mobile devices?');

        });


        page.section('Within these limits:', section => {
            section.booleanSetting('nightOnly').name('Only between sunset and sunrise?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock.unlocked', 'lockHandler')

    })

    .subscribedEventHandler('lockHandler', (context, event) => {
        
        let bIsValidTime = !nightOnly
        if (!bIsValidTime) {
        let tz = TimeZone.getTimeZone('UTC')
        this.retrieveSunData(false)
        bIsValidTime = this.now() < this.timeToday(state.sunriseTime, tz).time || this.now() > this.timeToday(state.sunsetTime, tz).time
        }
        if (bIsValidTime) {
        if (event.data != null) {
        let evData = this.parseJson(event.data)
        if
        this.performActions(evt)
        }
        } else {
        if (event.descriptionText.contains('manually')) {
        if
        this.performActions(evt)
        }
        } else {
        if
        this.performActions(evt)
        }
        }
        }
        }
        

	})
