
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select what button you want for each mode...', section => {
            section.deviceSetting('myDisarmButton').capability(['momentary']).name('What Button will disarm the alarm?');
            section.deviceSetting('myArmStay').capability(['momentary']).name('What button will put the alarm in Armed/Stay?');
            section.deviceSetting('myArmAway').capability(['momentary']).name('What button will put the alarm in Armed/Away?');

        });


        page.section('Smartthings location alarm state setup. These must be configured to use the Any Sensory Child App.', section => {
            section.booleanSetting('locAlarmSync').name('Maintain synchronization between Smartthings ADT alarm panel and location clound alarm state');
            section.numberSetting('delay').name('Please specify your Alarm Delay');

        });


        page.section('Select your ADT Smart Panel...', section => {
            section.deviceSetting('panel').capability(['battery']).name('ADT Panel?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'securitySystemStatus', 'alarmModeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.myArmStay, 'momentary', 'momentary.pushed', 'armstayHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.myDisarmButton, 'momentary', 'momentary.pushed', 'disarmHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.myArmAway, 'momentary', 'momentary.pushed', 'armawayHandler')

    })

    .subscribedEventHandler('disarmHandler', (context, event) => {
        
        console.log('Disarming alarm')
        panel?.disarm()
        

	})

    .subscribedEventHandler('armawayHandler', (context, event) => {
        
        console.log('Changeing alarm to Alarm/Away')
        let alarmState = panel.currentSecuritySystemStatus
        if (alarmState == 'armedStay') {
        console.log("Current alarm mode: $alarmState. Alarm must be in Disarmed state before changeing state")
        } else {
        panel?.armAway(armedAway)
        }
        

	})

    .subscribedEventHandler('armstayHandler', (context, event) => {
        
        console.log('Changeing alarm to Alarm/Stay')
        let alarmState = panel.currentSecuritySystemStatus
        if (alarmState == 'armedAway') {
        console.log("Current alarm mode: $alarmState. Alarm must be in Disarmed state before changeing state")
        } else {
        panel?.armStay(armedStay)
        }
        

	})

    .subscribedEventHandler('alarmModeHandler', (context, event) => {
        
        switch (event.value) {
        case 'armedAway':
        this.runIn(delay, armawaySHMHandler)
        break
        case 'armedStay':
        console.log('Attempting change of Hub alarm Mode')
        this.runIn(delay, armstaySHMHandler)
        break
        case 'disarmed':
        this.sendLocationEvent(['name': 'alarmSystemStatus', 'value': 'off'])
        break
        default:
        console.log('Ignoring unexpected alarmtype mode.')
        console.log('Unexpected value for Alarm status')
        break
        }
        

	})
