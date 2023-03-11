
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Set Timer ...', section => {
            section.numberSetting('minutes').name('Minutes');

        });


        page.section('Light...', section => {
            section.deviceSetting('bulb').capability(['colorControl']).name('Color-Control Bulb');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('changeColor', delay);

    })

    .scheduledEventHandler('changeColor', (context, event) => {
        
        if (state.endTime <= this.now()) {
        this.timesUp()
        } else {
        this.runIn(state.intervalSeconds, 'changeColor', ['overwrite': false])
        state.counter = state.counter + 1
        this.setColor()
        }
        

	})
