
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I\'m in mode', section => {

        });


        page.section('Turn on these lights randomly', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('How long to pause between random light selection', section => {
            section.numberSetting('timeInMinutes').name('How many minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'changedLocationMode')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (location.getCurrentMode() == desiredMode ) {
        return null
        }
        console.log('Tracking switch behavior')
        let lights = state.myStateLights
        let light = lights.findAll({ let dictionary ->
        event.displayName == dictionary['displayName']
        })[0]
        if (event.value == 'on') {
        light['currentOn'] = this.now()
        } else {
        if (event.value == 'off') {
        light['currentOff'] = this.now()
        }
        }
        if (light['currentOn'] != null && light['currentOff'] != null) {
        let seconds = Math.round(Math.abs(light['currentOn'] - light['currentOff']) / 1000 * 100) / 100
        let listOfTimes = light['timeIlluminated']
        listOfTimes.add(seconds)
        light['timeIlluminated'] = listOfTimes
        light['currentOn'] = null
        light['currentOff'] = null
        let averageTime = this.calculateAverageTimeOn(light['timeIlluminated'])
        light['averageTime'] = averageTime
        }
        state.myStateLights = lights
        

	})

    .subscribedEventHandler('changedLocationMode', (context, event) => {
        
        if (location.getCurrentMode() != desiredMode ) {
        this.unschedule(turnOnRandomLights)
        return null
        }
        this.runIn(60, turnOnRandomLights)
        

	})
