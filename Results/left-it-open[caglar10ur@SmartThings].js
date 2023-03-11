
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor this door or window', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Sensor to monitor');

        });


        page.section('And notify me if it\'s open for more than this many minutes (default 10)', section => {
            section.numberSetting('openThreshold').name('Number of minutes');

        });


        page.section('', section => {
            section.deviceSetting('sonos').capability(['musicPlayer']).name('On this Sonos player');

        });


        page.section('Delay between notifications (default 10 minutes', section => {
            section.numberSetting('frequency').name('Number of minutes');
            section.booleanSetting('resumePlaying').name('Resume currently playing music after notification');
            section.numberSetting('volume').name('Temporarily change volume');

        });


        page.section('['hideable': true, 'hidden': true], 'More options', section => {
            section.booleanSetting('resumePlaying').name('Resume currently playing music after notification');
            section.numberSetting('volume').name('Temporarily change volume');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.closed', 'closed')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.open', 'opened')

    })

    .subscribedEventHandler('closed', (context, event) => {
        
        log.trace("closed(${event.name}: ${event.value})")
        

	})

    .subscribedEventHandler('opened', (context, event) => {
        
        log.trace("opened(${event.name}: ${event.value})")
        let delay = openThreshold != null && openThreshold != '' ? openThreshold * 60 : 600
        this.runIn(delay, tooLong, ['overwrite': false])
        

	})
