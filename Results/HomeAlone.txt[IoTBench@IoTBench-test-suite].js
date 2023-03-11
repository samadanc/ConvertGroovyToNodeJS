
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


        page.section('How long to keep lights on before selecting different ones', section => {
            section.numberSetting('timeInMinutes').name('How many minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'changedLocationMode')

    })

    .subscribedEventHandler('changedLocationMode', (context, event) => {
        
        if (location.getCurrentMode() != desiredMode ) {
        this.unschedule(turnOnRandomLights)
        return null
        }
        this.runIn(timeInMinutes * 60, turnOnRandomLights)
        

	})
