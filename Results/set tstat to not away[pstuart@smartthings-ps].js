
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Thermostats', section => {
            section.deviceSetting('tstat1').capability(['thermostat']).name('Which Tstats?');

        });


        page.section('When there\'s movement...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('Schedule', section => {
            section.enumSetting('days').name('Allow Automatic Away/Not Away On These Days');
            section.timeSetting('timeAway').name('Turn On Away Time?');
            section.timeSetting('timeHome').name('Turn Off Away Time?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('changeModeAway', delay);

        context.api.schedules.schedule('changeModeHome', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion.active', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("Motion detected, $evt Set to Not Away")
        this.setHome()
        

	})

    .scheduledEventHandler('changeModeAway', (context, event) => {
        
        console.log('change Mode Away Fired')
        let today = new Date().format('EEEE')
        if
        console.log("Set to Away on $today")
        this.setAway()
        }
        

	})

    .scheduledEventHandler('changeModeHome', (context, event) => {
        
        console.log('change Mode Home Fired')
        let today = new Date().format('EEEE')
        if
        console.log("Set to Not Away on $today")
        this.setHome()
        }
        

	})
