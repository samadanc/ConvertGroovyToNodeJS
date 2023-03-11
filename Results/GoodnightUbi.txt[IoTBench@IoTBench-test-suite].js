
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Enter Ubi information:', section => {
            section.textSetting('behaviorToken').name('What is the Ubi Token?');
            section.deviceSetting('trigger').capability(['switch']).name('Which virtual tile is the trigger?');

        });


        page.section('Which doors and windows should I check?', section => {
            section.deviceSetting('doors').capability(['contactSensor']).name('Which doors/windows?');

        });


        page.section('(Optional) Which light switches will I be turning off?', section => {
            section.deviceSetting('theSwitches').capability(['switch']).name('Which lights?');
            section.numberSetting('minutes').name('After how many minutes?');

        });


        page.section('(Optional) Which lights should I turn on?', section => {
            section.deviceSetting('onSwitches').capability(['switch']).name('Which lights?');
            section.enumSetting('turnOff').name('Turn them off later?');
            section.numberSetting('minutes2').name('After how many minutes?');

        });


        page.section('Should I say \'Goodnight\' to Hello Home?', section => {
            section.enumSetting('sayPhrase').name('Yes or No:');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.trigger, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        console.log('trigger turned on!')
        if (theSwitches) {
        let timeDelay = minutes * 60
        this.runIn(timeDelay, lightsOut)
        }
        if (onSwitches) {
        
        context.api.devices.sendCommands(context.config.onSwitches, 'switch', on)
    
        let timeDelay2 = minutes2 * 60
        if (turnOff == 'Yes') {
        this.runIn(timeDelay2, secondLightsOut)
        }
        }
        let phrase = ''
        doors.each({ let doorOpen ->
        if (doorOpen.currentContact == 'open') {
        console.log("${doorOpen.displayName}")
        let toReplace = doorOpen.displayName
        let replaced = toReplace.replaceAll(' ', '%20')
        console.log(replaced)
        phrase = phrase.replaceAll('%20And%20', '%20')
        if (phrase == '') {
        phrase = 'The%20' + replaced
        } else {
        phrase = phrase + ',%20And%20The%20' + replaced
        }
        console.log(phrase)
        }
        })
        if (phrase == '') {
        phrase = 'The%20house%20is%20ready%20for%20night.'
        } else {
        phrase = 'You%20have%20left%20' + phrase + 'open'
        }
        this.httpGet("https://portal.theubi.com/webapi/behaviour?access_token=$behaviorToken&variable=$phrase")
        console.log('Turning off trigger')
        
        context.api.devices.sendCommands(context.config.trigger, 'switch', off)
    
        

	})
