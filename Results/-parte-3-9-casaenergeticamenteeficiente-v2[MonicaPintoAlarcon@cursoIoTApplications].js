
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

        context.api.schedules.runEvery30Minutes('comprobarLuces', delay);

    })

    .scheduledEventHandler('comprobarLuces', (context, event) => {
        
        log.info(luces[0]?.switchState.value)
        log.info(luces[0]?.currentSwitch)
        log.info(luces[0]?.currentState('switch').value)
        log.info(luces[0]?.currentValue('switch'))
        let numLucesOn = luces.count({
        it?.latestValue('switch') == 'on'
        })
        log.info("numLuces = $numLucesOn")
        if (numLucesOn > 1) {
        console.log('Apaga alguna luz')
        let luzOn = luces.findAll({
        it?.latestValue('switch') == 'on'
        })
        let orden = luzOn.sort({
        it.latestState?.date
        })
        let times = orden*.latestState.date
        console.log("times: $orden orden:$times")
        let cont = luzOn.size
        let j = 0
        while (cont > 1) {
        orden[ j ].off()
        cont = cont - 1
        j = j + 1
        }
        }
        

	})
