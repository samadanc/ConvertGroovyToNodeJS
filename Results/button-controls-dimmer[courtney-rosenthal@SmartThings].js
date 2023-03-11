
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Assign this button', section => {
            section.deviceSetting('myButton').capability(['button']).name('Button device:');
            section.enumSetting('myButtonNumber').name('Button number (for remote with multiple buttons):');

        });


        page.section('To control these dimmers', section => {
            section.deviceSetting('myDimmers').capability(['switchLevel']).name('Dimmers:');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.myButton, 'button', 'button', 'buttonHandler')

    })

    .subscribedEventHandler('buttonHandler', (context, event) => {
        
        console.log("buttonHandler, invoked: button = $myButton, buttonNumber = $myButtonNumber, dimmers = $myDimmers")
        if
        console.log('buttonHandler: no dimmers selected')
        return null
        }
        let currentButtonAction = event.value
        let currentButtonNumber = null
        if (myButtonNumber) {
        try {
        let data = event.jsonData
        currentButtonNumber = (event.jsonData.buttonNumber as String)
        }
        catch (let e) {
        log.warn("caught exception getting event data as json: $e")
        }
        if (myButtonNumber != currentButtonNumber ) {
        console.log("buttonHandler: currentButtonNumber = $currentButtonNumber, ignoring button event")
        return null
        }
        }
        console.log("buttonHandler: currentButtonAction = $currentButtonAction, currentButtonNumber = $currentButtonNumber")
        switch ( currentButtonAction ) {
        case 'held':
        console.log("buttonHandler: turning off, myDimmers = $myDimmers")
        for (let d : myDimmers ) {
        if (d.hasCommand('off')) {
        d.off()
        } else {
        d.setLevel(0)
        }
        }
        break
        case 'pushed':
        
        context.api.devices.sendCommands(context.config.myDimmers, 'switchLevel', getCurrentLevel)
    
        let newLevel = this.calculateNewLevel(currentLevel)
        console.log("buttonHandler: currentLevel = $currentLevel, newLevel = $newLevel, myDimmers = $myDimmers")
        myDimmers.each({ let d ->
        d.setLevel(newLevel)
        })
        break
        default:
        log.warn("buttonHandler: bad button event value "${event.value}"")
        return null
        }
        

	})
