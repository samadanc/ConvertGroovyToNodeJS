
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('stateCleanup', delay);

    })

    .scheduledEventHandler('stateCleanup', (context, event) => {
        
                log.trace('stateCleanup...')
                state.remove('pollValue')
                state.remove('pollStrValue')
                state.remove('pollWaitVal')
                state.remove('tempChgWaitVal')
                state.remove('cmdDelayVal')
                state.remove('testedDhInst')
                state.remove('missedPollNotif')
                state.remove('updNotif')
                state.remove('updChildOnNewOnly')
                state.remove('disAppIcons')
                state.remove('showProtAlarmStateEvts')
                state.remove('showAwayAsAuto')
                state.remove('cmdQ')
                state.remove('recentSendCmd')
                state.remove('currentWeather')
                state.remove('altNames')
                state.remove('locstr')
                state.remove('custLocStr')
                if (!atomicState?.cmdQlist) {
                    state.remove('cmdQ2')
                    state.remove('cmdQ3')
                    state.remove('cmdQ4')
                    state.remove('cmdQ5')
                    state.remove('cmdQ6')
                    state.remove('cmdQ7')
                    state.remove('cmdQ8')
                    state.remove('cmdQ9')
                    state.remove('cmdQ10')
                    state.remove('cmdQ11')
                    state.remove('cmdQ12')
                    state.remove('cmdQ13')
                    state.remove('cmdQ14')
                    state.remove('cmdQ15')
                    state.remove('lastCmdSentDt2')
                    state.remove('lastCmdSentDt3')
                    state.remove('lastCmdSentDt4')
                    state.remove('lastCmdSentDt5')
                    state.remove('lastCmdSentDt6')
                    state.remove('lastCmdSentDt7')
                    state.remove('lastCmdSentDt8')
                    state.remove('lastCmdSentDt9')
                    state.remove('lastCmdSentDt10')
                    state.remove('lastCmdSentDt11')
                    state.remove('lastCmdSentDt12')
                    state.remove('lastCmdSentDt13')
                    state.remove('lastCmdSentDt14')
                    state.remove('lastCmdSentDt15')
                    state.remove('recentSendCmd2')
                    state.remove('recentSendCmd3')
                    state.remove('recentSendCmd4')
                    state.remove('recentSendCmd5')
                    state.remove('recentSendCmd6')
                    state.remove('recentSendCmd7')
                    state.remove('recentSendCmd8')
                    state.remove('recentSendCmd9')
                    state.remove('recentSendCmd10')
                    state.remove('recentSendCmd11')
                    state.remove('recentSendCmd12')
                    state.remove('recentSendCmd13')
                    state.remove('recentSendCmd14')
                    state.remove('recentSendCmd15')
                }
            

	})
