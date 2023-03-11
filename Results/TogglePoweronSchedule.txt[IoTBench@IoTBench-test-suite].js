
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''App Information'', section => {

        });


        page.section('Outlets to toggle:', section => {
            section.deviceSetting('outlets').capability(['switch']).name('Outlets');

        });


        page.section('Hours to leave on/off:', section => {
            section.numberSetting('hours').name('Hours');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('toggleSwitches', delay);

    })

    .scheduledEventHandler('toggleSwitches', (context, event) => {
        
        outlets.each({
        let currentValue = it.currentValue('switch')
        let msg = "${it.displayName} is $currentValue, switching it "
        if (currentValue == 'on') {
        msg += 'off'
        it.off()
        } else {
        msg += 'on'
        it.on()
        }
        console.log(msg)
        this.sendNotificationEvent(msg)
        })
        

	})
