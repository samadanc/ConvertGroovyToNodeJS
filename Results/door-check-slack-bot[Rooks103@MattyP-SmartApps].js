
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sensor Configuration', section => {
            section.deviceSetting('officeDoors').capability(['contactSensor']).name('Doors that will be monitored.');

        });


        page.section('Time Configuration', section => {
            section.timeSetting('normalTime').name('Normal Time');
            section.timeSetting('hereTime').name('Here Time');
            section.timeSetting('channelTime').name('Channel Time');
            section.timeSetting('endTime').name('Stop Time');

        });


        page.section('Slack Configuration', section => {
            section.textSetting('slackURI').name('Slack Instance');
            section.textSetting('slackChannel').name('Slack Channel');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('hereSenderMethod', delay);

        context.api.schedules.schedule('openDoorCheckMethod', delay);

        context.api.schedules.schedule('normalSenderMethod', delay);

        context.api.schedules.schedule('channelSenderMethod', delay);

    })

    .scheduledEventHandler('channelSenderMethod', (context, event) => {
        
        console.log('Channel message')
        if (this.findOpenDoors().size() != 0) {
        asynchttp_v1.post(processResponse, this.messagePicker('channel', "${this.findOpenDoors()}"))
        }
        

	})

    .scheduledEventHandler('openDoorCheckMethod', (context, event) => {
        
        String[] openDoors = this.findOpenDoors()
        if (this.timeOfDayIsBetween(normalTime, endTime, new Date(), location.timeZone)) {
        console.log('Time is right')
        if (openDoors.size() != 0) {
        console.log('Doors are open')
        state.wereDoorsOpenPreviously = true
        } else {
        console.log('No open doors.')
        console.log("${state.wereDoorsOpenPreviously} || ${state.hasCloseMessageBeenSent}")
        if (state.wereDoorsOpenPreviously && !state.hasCloseMessageBeenSent) {
        console.log('Sending door closure.')
        asynchttp_v1.post(processResponse, this.messagePicker('closed', "${this.findOpenDoors()}"))
        state.hasCloseMessageBeenSent = true
        }
        }
        } else {
        console.log('Outside the specified timeframe for sending messages.')
        state.wereDoorsOpenPreviously = false
        }
        

	})

    .scheduledEventHandler('normalSenderMethod', (context, event) => {
        
        console.log('Normal message')
        if (this.findOpenDoors().size() != 0) {
        state.hasCloseMessageBeenSent = false
        asynchttp_v1.post(processResponse, this.messagePicker('normal', "${this.findOpenDoors()}"))
        }
        

	})

    .scheduledEventHandler('hereSenderMethod', (context, event) => {
        
        console.log('Here message')
        if (this.findOpenDoors().size() != 0) {
        asynchttp_v1.post(processResponse, this.messagePicker('here', "${this.findOpenDoors()}"))
        }
        

	})
