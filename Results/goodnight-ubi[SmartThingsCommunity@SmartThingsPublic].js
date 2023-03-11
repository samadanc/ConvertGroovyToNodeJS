
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
            section.deviceSetting('doors').capability(['contactSensor']).name('');

        });


        page.section('Which light switches will I be turning off?', section => {
            section.deviceSetting('theSwitches').capability(['switch']).name('');
            section.numberSetting('minutes').name('');

        });


        page.section('Should I say \'Goodnight\' to Hello Home?', section => {
            section.enumSetting('sayPhrase').name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.trigger, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        console.log('trigger turned on!')
        let timeDelay = minutes * 60
        this.runIn(timeDelay, lightsOut)
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
        if (sayPhrase == 'Yes') {
        location.helloHome.execute('Good Night!')
        }
        

	})
