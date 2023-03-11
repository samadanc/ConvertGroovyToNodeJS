
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section('['hideWhenEmpty': true], 'Turn on when motion detected:', section => {
            section.deviceSetting('themotions').capability(['motionSensor']).name('Motion where?');

        });


        page.section('['hideWhenEmpty': true], 'Turn on when contact opened:', section => {
            section.deviceSetting('thecontacts').capability(['contactSensor']).name('Which contact?');

        });


        page.section('', section => {

        });


        page.section('['hideWhenEmpty': true], 'Turn on if illuminance bellow treshold in:', section => {
            section.deviceSetting('theilluminances').capability(['illuminanceMeasurement']).name('Which illuminance?');

        });


        page.section('['hideWhenEmpty': true], 'Trun illuminance treshhold:', section => {

        });


        page.section('', section => {

        });


        page.section('Turn on for how long:', section => {

        });


        page.section('Turn on these lights', section => {
            section.deviceSetting('theswitches').capability(['switch']).name('');

        });


        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theswitches, 'switch', 'switch.on', 'switchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theilluminances, 'illuminanceMeasurement', 'illuminance', 'illuminanceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thecontacts, 'contactSensor', 'contact.open', 'contactDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.themotions, 'motionSensor', 'motion.active', 'motionDetectedHandler')

    })

    .subscribedEventHandler('contactDetectedHandler', (context, event) => {
        
        console.log("contactDetectedHandler called: $evt")
        this.on()
        

	})

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        console.log("motionDetectedHandler called: $evt")
        this.on()
        

	})

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
        console.log("illuminanceHandler called: $evt")
        if (!theseconds || !thecontacts || !themotions) {
        if (this.checkIlluminance()) {
        this.on()
        } else {
        this.off()
        }
        }
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        console.log("swhitchOnHandler called: $evt")
        if (theseconds) {
        console.log('setting a switch off timer')
        this.runIn(theseconds, off)
        }
        

	})
