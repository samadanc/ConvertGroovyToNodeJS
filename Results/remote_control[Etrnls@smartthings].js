
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Light0', section => {
            section.deviceSetting('light0').capability(['switch']).name('Light');
            section.numberSetting('light0_up').name('Up');
            section.numberSetting('light0_down').name('Down');

        });


        page.section('Light1', section => {
            section.deviceSetting('light1').capability(['switch']).name('Light');
            section.numberSetting('light1_up').name('Up');
            section.numberSetting('light1_down').name('Down');

        });


        page.section('Light2', section => {
            section.deviceSetting('light2').capability(['switch']).name('Light');
            section.numberSetting('light2_up').name('Up');
            section.numberSetting('light2_down').name('Down');

        });


        page.section('Light3', section => {
            section.deviceSetting('light3').capability(['switch']).name('Light');
            section.numberSetting('light3_up').name('Up');
            section.numberSetting('light3_down').name('Down');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('button', (context, event) => {
        
        log.trace("button(${event.value} ${event.data})")
        let buttonNumber = this.parseJson(event.data).buttonNumber
        if (settings['off'] == buttonNumber ) {
        console.log('Turning all off')
        (0..3).each({
        settings["light$it"]?.off()
        })
        }
        (0..3).each({
        if (settings["light$it_up"] == buttonNumber ) {
        console.log("Turning on light $it")
        settings["light$it"].on()
        } else {
        if (settings["light$it_down"] == buttonNumber ) {
        console.log("Turning off light $it")
        settings["light$it"].off()
        }
        }
        })
        

	})
