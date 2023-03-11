
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Cree light Bulbs:', section => {
            section.deviceSetting('CreeBulbs').capability(['switch']).name('Cree List?');

        });


        page.section('Specify the level of tracing to be done.  Defaults to none', section => {
            section.enumSetting('trclevel').name('Trace Level');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkRestore', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.CreeBulbs, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        let lightsState = [:]
        lightsState = state.lStates
        let allon = state.allon
        this.INFO("${event.displayName} event = ${event.value} at hub ${evt?.hub.id} allon = $allon")
        if (allon == 0) {
        if (event.value == 'on') {
        lightsState[event.deviceId] = this.now()
        state.lStates = lightsState
        } else {
        lightsState[event.deviceId] = 'off'
        }
        this.DEBUG("Saved Light Status is $lightsState")
        }
        if (allon == 1 && event.value == 'off') {
        lightsState[event.deviceId] = 'off'
        }
        

	})

    .scheduledEventHandler('checkRestore', (context, event) => {
        
        this.TRACE('Checking Restore')
        this.ResetBulbs()
        let lightsState = [:]
        lightsState = state.lStates
        let switchcnt = 0
        let oncnt = 0
        this.TRACE('Counting bulbs that are on')
        CreeBulbs?.each({
        switchcnt = switchcnt + 1
        this.DEBUG("Switch id = ${it.id} : ${it.displayName} value ${it.currentSwitch}")
        if (it.currentSwitch == 'on') {
        oncnt = oncnt + 1
        }
        })
        if (switchcnt > 3) {
        switchcnt = switchcnt - 1
        }
        if (switchcnt <= oncnt ) {
        this.INFO('All lights on - turning them off')
        state.allon = 1
        this.TurnOff()
        } else {
        state.allon = 0
        this.pollBulbs()
        }
        

	})
