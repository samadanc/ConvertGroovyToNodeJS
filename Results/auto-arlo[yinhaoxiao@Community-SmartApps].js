
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Arlo credentials', section => {
            section.textSetting('strCredentialsEmail').name('Email');

        });


        page.section('Change Arlo to this mode', section => {
            section.textSetting('strArloMode').name('Mode');

        });


        page.section('When SmartThings mode becomes', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'onModeChange')

    })

    .subscribedEventHandler('onModeChange', (context, event) => {
        
        if (mapEvent.value == settings.strSmartThingsMode) {
        console.log("Mode changed to "${mapEvent.value}". Changing Arlo mode to "${settings.strArloMode}"")
        if (this.setArloBaseStationMode(settings.strArloMode)) {
        console.log('Successfully changed!')
        } else {
        log.error('Failed to change modes!')
        }
        }
        

	})
