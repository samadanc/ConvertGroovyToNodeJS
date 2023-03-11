
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        log.info(event.value)
        if (allOk) {
        let recentStates = master.eventsSince(new Date(this.now() - 4000), ['all': true, 'max': 10]).findAll({
        it.name == 'switch'
        })
        console.log("${recentStates?.size()} STATES FOUND, LAST AT ${(recentStates) ? recentStates[0].dateCreated : }")
        if (event.isPhysical()) {
        if (event.value == 'on' && this.lastTwoStatesWere('on', recentStates, evt)) {
        console.log('detected two taps, execute ON phrase')
        location.helloHome.execute(settings.onPhrase)
        let message = "${location.name} executed ${settings.onPhrase} because ${event.title} was tapped twice."
        this.send(message)
        this.flashLights()
        } else {
        if (event.value == 'off' && this.lastTwoStatesWere('off', recentStates, evt)) {
        console.log('detected two taps, execute OFF phrase')
        location.helloHome.execute(settings.offPhrase)
        let message = "${location.name} executed ${settings.offPhrase} because ${event.title} was tapped twice."
        this.send(message)
        this.flashLights()
        }
        }
        } else {
        log.trace('Skipping digital on/off event')
        }
        }
        

	})
