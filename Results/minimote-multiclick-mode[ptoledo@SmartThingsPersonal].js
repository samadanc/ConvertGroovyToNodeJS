
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('thebutton').capability(['button']).name('Pick your button');

        });


        page.section('', section => {
            section.deviceSetting('switchOn_1_0').capability(['switch']).name('Pick a Switch on button 1 Hold');
            section.deviceSetting('switchOn_1_1').capability(['switch']).name('Pick a Switch on button 1, 1 click');
            section.deviceSetting('switchOn_1_2').capability(['switch']).name('Pick a Switch on button 1, 2 click');
            section.deviceSetting('switchOn_1_3').capability(['switch']).name('Pick a Switch on button 1, 3 click');
            section.deviceSetting('switchOn_1_4').capability(['switch']).name('Pick a Switch on button 1, 4 click');
            section.deviceSetting('switchOn_2_0').capability(['switch']).name('Pick a Switch on button 2 Hold');
            section.deviceSetting('switchOn_2_1').capability(['switch']).name('Pick a Switch on button 2, 1 click');
            section.deviceSetting('switchOn_2_2').capability(['switch']).name('Pick a Switch on button 2, 2 click');
            section.deviceSetting('switchOn_2_3').capability(['switch']).name('Pick a Switch on button 2, 3 click');
            section.deviceSetting('switchOn_2_4').capability(['switch']).name('Pick a Switch on button 2, 4 click');
            section.deviceSetting('switchOn_3_0').capability(['switch']).name('Pick a Switch on button 3 Hold');
            section.deviceSetting('switchOn_3_1').capability(['switch']).name('Pick a Switch on button 3, 1 click');
            section.deviceSetting('switchOn_3_2').capability(['switch']).name('Pick a Switch on button 3, 2 click');
            section.deviceSetting('switchOn_3_3').capability(['switch']).name('Pick a Switch on button 3, 3 click');
            section.deviceSetting('switchOn_3_4').capability(['switch']).name('Pick a Switch on button 3, 4 click');
            section.deviceSetting('switchOn_4_0').capability(['switch']).name('Pick a Switch on button 4 Hold');
            section.deviceSetting('switchOn_4_1').capability(['switch']).name('Pick a Switch on button 4, 1 click');
            section.deviceSetting('switchOn_4_2').capability(['switch']).name('Pick a Switch on button 4, 2 click');
            section.deviceSetting('switchOn_4_3').capability(['switch']).name('Pick a Switch on button 4, 3 click');
            section.deviceSetting('switchOn_4_4').capability(['switch']).name('Pick a Switch on button 4, 4 click');

        });


        page.section('', section => {
            section.deviceSetting('switchOff_1_0').capability(['switch']).name('Pick a Switch off button 1 Hold');
            section.deviceSetting('switchOff_1_1').capability(['switch']).name('Pick a Switch off button 1, 1 click');
            section.deviceSetting('switchOff_1_2').capability(['switch']).name('Pick a Switch off button 1, 2 click');
            section.deviceSetting('switchOff_1_3').capability(['switch']).name('Pick a Switch off button 1, 3 click');
            section.deviceSetting('switchOff_1_4').capability(['switch']).name('Pick a Switch off button 1, 4 click');
            section.deviceSetting('switchOff_2_0').capability(['switch']).name('Pick a Switch off button 2 Hold');
            section.deviceSetting('switchOff_2_1').capability(['switch']).name('Pick a Switch off button 2, 1 click');
            section.deviceSetting('switchOff_2_2').capability(['switch']).name('Pick a Switch off button 2, 2 click');
            section.deviceSetting('switchOff_2_3').capability(['switch']).name('Pick a Switch off button 2, 3 click');
            section.deviceSetting('switchOff_2_4').capability(['switch']).name('Pick a Switch off button 2, 4 click');
            section.deviceSetting('switchOff_3_0').capability(['switch']).name('Pick a Switch off button 3 Hold');
            section.deviceSetting('switchOff_3_1').capability(['switch']).name('Pick a Switch off button 3, 1 click');
            section.deviceSetting('switchOff_3_2').capability(['switch']).name('Pick a Switch off button 3, 2 click');
            section.deviceSetting('switchOff_3_3').capability(['switch']).name('Pick a Switch off button 3, 3 click');
            section.deviceSetting('switchOff_3_4').capability(['switch']).name('Pick a Switch off button 3, 4 click');
            section.deviceSetting('switchOff_4_0').capability(['switch']).name('Pick a Switch off button 4 Hold');
            section.deviceSetting('switchOff_4_1').capability(['switch']).name('Pick a Switch off button 4, 1 click');
            section.deviceSetting('switchOff_4_2').capability(['switch']).name('Pick a Switch off button 4, 2 click');
            section.deviceSetting('switchOff_4_3').capability(['switch']).name('Pick a Switch off button 4, 3 click');
            section.deviceSetting('switchOff_4_4').capability(['switch']).name('Pick a Switch off button 4, 4 click');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thebutton, 'button', 'button', 'buttonHandler')

    })

    .subscribedEventHandler('buttonHandler', (context, event) => {
        
        java.lang.Integer current_button
        try {
        let data = event.jsonData
        current_button = data.buttonNumber
        }
        catch (let e) {
        log.warn("caught exception getting event data as json: $e")
        }
        if (event.value == 'pushed') {
        state.current_event = this.now()
        if (state.current_event - state.last_event < 1000 && state.click_counter < 4) {
        state.click_counter = state.click_counter + 1
        console.log('Click ++')
        } else {
        state.click_counter = 1
        state.last_button = current_button
        console.log('Click start pushed')
        this.runIn(2, buttonAction)
        }
        state.last_event = state.current_event
        } else {
        state.click_counter = 5
        state.last_button = current_button
        console.log('Click start hold')
        this.buttonAction()
        }
        

	})
