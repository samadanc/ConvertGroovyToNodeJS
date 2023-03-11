
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.enumSetting('nhlTeam').name('Select NHL Team');

        });


        page.section('['mobileOnly': true]', section => {

        });


        page.section(''About'', section => {

        });


        page.section('Momentary Buttons (ie. Doorbell, Alarm)', section => {
            section.deviceSetting('buttonGoals').capability(['momentary']).name('Devices Selection');
            section.numberSetting('buttonDelay').name('Delay after goal (in seconds)');

        });


        page.section('Turn On/Off Lights', section => {
            section.deviceSetting('switchLights').capability(['switch']).name('Select Lights');
            section.numberSetting('switchOnFor').name('Turn Off After');
            section.numberSetting('switchDelay').name('Delay after goal (in seconds)');

        });


        page.section('Flashing Lights', section => {
            section.deviceSetting('flashLights').capability(['switch']).name('Select Lights');
            section.numberSetting('numFlashes').name('Number Of Times To Flash');
            section.numberSetting('flashOnFor').name('On For (default 1000ms)');
            section.numberSetting('flashOffFor').name('Off For (default 1000ms)');
            section.numberSetting('flashDelay').name('Delay After Goal (in seconds)');
            section.enumSetting('lightColor').name('Flashing Light Color?');
            section.enumSetting('lightLevel').name('Flashing Light Level?');

        });


        page.section('Sirens To Trigger', section => {
            section.deviceSetting('sirens').capability(['alarm']).name('Sirens Selection');
            section.booleanSetting('sirensOnly').name('Don\');
            section.numberSetting('sirensOnFor').name('Turn Off After');
            section.numberSetting('sirenDelay').name('Delay After Goal (in seconds)');

        });


        page.section('Speaker Used To Play Goal Scoring Horn', section => {
            section.deviceSetting('sound').capability(['musicPlayer']).name('Speaker Selection');
            section.numberSetting('volume').name('Speaker Volume');
            section.numberSetting('soundDuration').name('Duration To Play (in seconds)');
            section.numberSetting('soundDelay').name('Delay After Goal (in seconds)');

        });


        page.section('Enable Notifications', section => {
            section.booleanSetting('sendGoalMessage').name('Enable Goal Score Notifications?');
            section.booleanSetting('sendGameDayMessage').name('Enable Game Day Status Notifications?');
            section.deviceSetting('notificationSwitch').capability(['switch']).name('Use Switch To Enable/Disable Goal Notifications');
            section.deviceSetting('manualGoalTrigger').capability(['button']).name('Manual Goal Trigger');
            section.numberSetting('goalDelay').name('Notification Delay After Goal (in seconds)');

        });


        page.section('Push And Text Notifications', section => {
            section.booleanSetting('sendPushMessage').name('Send Push Notifications?');

        });


        page.section('Number Of Hours Prior To Game Before Sending Status Notifications', section => {
            section.numberSetting('hoursBeforeStart').name('Hours Before Game Start');

        });


        page.section('Turn On At Start Of Game', section => {
            section.deviceSetting('gameSwitches').capability(['switch']).name('Select Switches');
            section.booleanSetting('gameSwitchOff').name('Turn Off After Game?');

        });


        page.section('Debug', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.manualGoalTrigger, 'button', 'button.pushed', 'manualGoalHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.notificationSwitch, 'switch', 'switch', 'notificationSwitchHandler')

        context.api.schedules.schedule('setupForGameDay', delay);

    })

    .subscribedEventHandler('notificationSwitchHandler', (context, event) => {
        
        try {
        if (event.value == 'on') {
        console.log('Re-enabling Game Notifications')
        state.enableGameNotifications = true
        this.setupForGameDay()
        } else {
        if (event.value == 'off') {
        console.log('Disabling game notifications')
        state.enableGameNotifications = false
        }
        }
        }
        catch (let e) {
        log.error("something went wrong: $e")
        }
        

	})

    .subscribedEventHandler('manualGoalHandler', (context, event) => {
        
        try {
        if (state.enableGameNotifications) {
        this.teamGoalScored()
        } else {
        console.log('Game Notifications has been disabled, ignore manual goal')
        }
        }
        catch (let e) {
        log.error("something went wrong: $e")
        }
        

	})

    .scheduledEventHandler('setupForGameDay', (context, event) => {
        
        state.teamScore = 0
        state.opponentScore = 0
        state.Team = null
        state.Game = null
        state.currentGameStatus = state.GAME_STATUS_UNKNOWN
        state.notifiedGameStatus = state.GAME_STATUS_UNKNOWN
        state.gameDate = null
        state.gameTime = null
        state.gameStations = null
        state.gameLocation = null
        state.gameStarted = false
        this.getTeam()
        

	})
