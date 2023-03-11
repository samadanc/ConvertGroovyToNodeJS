
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('luces').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.luces, 'switch', 'switch.off', 'apagarLuz')

        await context.api.subscriptions.subscribeToDevices(context.config.luces, 'switch', 'switch.on', 'encenderLuz')

        context.api.schedules.runEvery30Minutes('comprobarLuces', delay);

    })

    .subscribedEventHandler('apagarLuz', (context, event) => {
        
        state.numLuces = state.numLuces - 1
        console.log("numLuces = ${state.numLuces}")
        

	})

    .subscribedEventHandler('encenderLuz', (context, event) => {
        
        state.numLuces = state.numLuces + 1
        console.log("numLuces = ${state.numLuces}")
        

	})

    .scheduledEventHandler('comprobarLuces', (context, event) => {
        
        let c = luces.count({
        it?.latestValue('switch') == 'on'
        })
        let c2 = luces.count({
        it?.latestState('switch')?.getValue() == 'on'
        })
        console.log("numLuces = $c")
        console.log("numLuces = $c2")
        console.log("numLuces = ${state.numLuces}")
        if (state.numLuces > 1) {
        console.log('Apaga alguna luz')
        let luzOn = luces.findAll({
        it?.latestValue('switch') == 'on'
        })
        console.log("numLuces = ${luzOn.size()}")
        let orden = luzOn.sort({
        it?.latestState?.date
        })
        let times = orden*.latestState.date
        console.log("times: $times orden:$orden")
        let i = 0
        while (i < luzOn.size - 1) {
        orden[ i ].off()
        i = i + 1
        }
        }
        

	})
