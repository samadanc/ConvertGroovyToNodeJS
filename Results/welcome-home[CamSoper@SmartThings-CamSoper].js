
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Who are we greeting?', section => {
            section.deviceSetting('greetingList').capability(['presenceSensor']).name('');

        });


        page.section('Which doors do they enter?', section => {
            section.deviceSetting('doorList').capability(['contactSensor']).name('');

        });


        page.section('Where are we speaking?', section => {
            section.deviceSetting('mySpeaker').capability(['musicPlayer']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.doorList, 'contactSensor', 'contact.open', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.greetingList, 'presenceSensor', 'presence.present', 'presenceHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("The ${event.device.label} sensor is open.")
        let arrivalCount = state.newArrivals.size
        if (arrivalCount > 0) {
        console.log('There are people to welcome.')
        console.log(state.newArrivals)
        let welcomeText = 'Welcome home, '
        if (arrivalCount > 0) {
        for (java.lang.Integer i = 0; i < arrivalCount ; i++) {
        welcomeText += state.newArrivals[ i ]
        if (i < arrivalCount - 2 && arrivalCount > 2) {
        welcomeText += ', '
        } else {
        if (i == arrivalCount - 2 && arrivalCount > 2) {
        welcomeText += ', and '
        } else {
        if (i == arrivalCount - 2 && arrivalCount == 2) {
        welcomeText += ' and '
        }
        }
        }
        }
        }
        welcomeText += '!'
        console.log("Speaking $welcomeText")
        
        context.api.devices.sendCommands(context.config.mySpeaker, 'musicPlayer', speak)
    
        atomicState.newArrivals = []
        }
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("There are currently ${state.newArrivals.size} items in the list.")
        let theDevice = event.device
        let personsName = ''
        if (theDevice.label == null || theDevice.label == '') {
        personsName = theDevice.name
        } else {
        personsName = theDevice.label
        }
        console.log("$personsName is home.")
        if (!(state.newArrivals.contains(personsName))) {
        state.newArrivals.add(personsName)
        console.log("Added $personsName")
        }
        console.log("There are now ${state.newArrivals.size} items in the list.")
        

	})
