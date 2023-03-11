
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Time to and close the light(s)', section => {
            section.timeSetting('openTime').name('Open at');
            section.timeSetting('closeTime').name('Close at');

        });


        page.section('When people arrive and leave...', section => {
            section.deviceSetting('peopleToWatch').capability(['presenceSensor']).name('Who?');

        });


        page.section('Visitor', section => {
            section.deviceSetting('visitorSwitch').capability(['switch']).name('Visitor Switch?');

        });


        page.section('Active/Inactive', section => {

        });


        page.section('Send Notifications?', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('openHandler', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.peopleToWatch, 'presenceSensor', 'presence', 'presenseHandler')

        context.api.schedules.schedule('closeHandler', delay);

    })

    .subscribedEventHandler('presenseHandler', (context, event) => {
        
        console.log("${app.label}: presenceHandler ${event.name}: ${event.value}, ${event.displayName}")
        let messages = "${app.label}: "
        if (event.value == 'not present') {
        messages = messages + "Someone left (${event.displayName})"
        let presenceValue = peopleToWatch.find({
        it.currentPresence == 'present'
        })
        if (presenceValue) {
        messages = messages + '\nStill somebody home - nothing to do'
        } else {
        messages = messages + '\nEverybody as left'
        if (!(this.visitorAtHome())) {
        messages = messages + "
        Close lights ${lightsVerif.name}!"
        lightsVerif.off()
        } else {
        messages = messages + 'Visitor at home do nothing!'
        }
        }
        } else {
        messages = messages + "Someone arrive (${event.displayName})"
        if (location.mode != 'Away') {
        messages = messages + '\nSomebody already home'
        } else {
        messages = messages + '\nFirst arrive - Open lightsVerif.name!'
        let between = this.timeOfDayIsBetween(openTime, closeTime, new Date(), location.timeZone)
        if (between) {
        lightsVerif.on()
        }
        }
        }
        this.sendNotificationToContacts(messages, recipients)
        console.log(messages)
        

	})

    .scheduledEventHandler('closeHandler', (context, event) => {
        
        this.sendNotificationToContacts("${app.label} Close!", recipients)
        if (lights != null) {
        lights.off()
        }
        if (lightsVerif != null) {
        lightsVerif.off()
        }
        

	})

    .scheduledEventHandler('openHandler', (context, event) => {
        
        let messages = "${app.label}: "
        if (lights != null) {
        console.log("${app.label}: Open Light ${lights.displayName}")
        lights.on()
        }
        if (lightsVerif != null) {
        let presenceValue = peopleToWatch.find({
        it.currentPresence == 'present'
        })
        if (presenceValue || this.visitorAtHome()) {
        console.log("${app.label}: Somebody home - Open! ${lightsVerif.displayName}")
        messages = messages + "Somebody home - Open! ${lightsVerif.name}"
        lightsVerif.on()
        } else {
        console.log("${app.label}: Nobody at home, stay the lights close!")
        messages = messages + 'Nobody at home, stay the lights close!'
        }
        }
        this.sendNotificationToContacts(messages, recipients)
        

	})
