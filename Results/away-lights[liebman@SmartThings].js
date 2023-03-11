
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Settings', section => {
            section.deviceSetting('switches').capability(['switch']).name('Control these switches...');
            section.numberSetting('modeDelay').name('Delay in minutes from mode change to first light change');
            section.numberSetting('active').name('Active switch count');
            section.numberSetting('interval').name('Minutes between changes');
            section.numberSetting('intervalDelay').name('increase interval by up to this randomly');
            section.timeSetting('starting').name('Start time');
            section.numberSetting('startingDelay').name('random delay for start time');
            section.timeSetting('ending').name('End time');
            section.numberSetting('endingDelay').name('random delay for end time');
            section.booleanSetting('debugEvents').name('send debug messages as events');
            section.deviceSetting('logger').capability(['switch']).name('LogDevice:');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

        context.api.schedules.schedule('endTimeHandler', delay);

        context.api.schedules.schedule('startTimeHandler', delay);

    })

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
        this.debug('modeChangeHandler', event.value)
        if (this.shouldBeActive()) {
        this.logit('debug', 'should be active so making it so!')
        if (modeDelay) {
        this.logit('debug', "scheduling intervalHandler to run in $modeDelay minutes")
        this.runIn(modeDelay * 60, intervalHandler)
        } else {
        this.doActivity()
        }
        }
        

	})

    .scheduledEventHandler('startTimeHandler', (context, event) => {
        
        this.debug('startTimeHandler', 'called')
        let delay = this.getRandomDelay(startingDelay)
        this.debug('startTimeHandler', "delaying $delay minutes")
        this.runIn(delay * 60, this.doActivity())
        

	})

    .scheduledEventHandler('endTimeHandler', (context, event) => {
        
        this.debug('endTimeHandler', 'called')
        let delay = this.getRandomDelay(startingDelay)
        this.debug('endTimeHandler', "delaying $delay minutes")
        this.runIn(this.getRandomDelay(endingDelay) * 60, endTimeActivity)
        

	})
