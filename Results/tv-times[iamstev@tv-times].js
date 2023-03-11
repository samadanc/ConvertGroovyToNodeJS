
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Time', section => {
            section.booleanSetting('onoff').name('Watching TV tonight?');
            section.timeSetting('starttime').name('When does the show start?');
            section.numberSetting('showlength').name('How many minutes is the show?');

        });


        page.section('Food', section => {
            section.booleanSetting('food').name('Are you eating delicious food?');
            section.numberSetting('eattime').name('How many minutes does it take to eat?');

        });


        page.section(''Setup'', section => {

        });


        page.section('Lights', section => {
            section.deviceSetting('light_tv_room').capability(['switchLevel']).name('TV Room Lights');
            section.deviceSetting('light_off_at_start').capability(['switch']).name('Turn these off when the show starts');
            section.deviceSetting('light_on_at_end').capability(['switch']).name('Turn these on when the show is over');
            section.deviceSetting('light_dim_at_end').capability(['switchLevel']).name('Dim these when the show is over');
            section.numberSetting('dim_level').name('Set dimmers to this level (1-99)');

        });


        page.section('Entertainment System', section => {
            section.booleanSetting('tvbool').name('Can I turn on your entertainment center?');
            section.deviceSetting('tvswitch').capability(['switch']).name('Entertainment Equipment');
            section.booleanSetting('tvoff').name('Do you want me to turn the TV off a few minutes after the show ends?');

        });


        page.section('Alexa Support', section => {
            section.deviceSetting('alexa_switch').capability(['switch']).name('Choose a switch that starts TV Times with the current settings when turned on. Can be useed to have Alexa start TV Times.');

        });


        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.alexa_switch, 'switch', 'switch.on', 'evt_alexa')

        context.api.schedules.schedule('do_prepare', delay);

    })

    .subscribedEventHandler('evt_alexa', (context, event) => {
        
        console.log('alexa called')
        
        context.api.devices.sendCommands(context.config.light_tv_room, 'switchLevel', setLevel)
    
        this.runIn(10, do_start_show)
        

	})

    .scheduledEventHandler('do_prepare', (context, event) => {
        
        console.log('prepare called')
        if (onoff) {
        console.log('tv time will run')
        
        context.api.devices.sendCommands(context.config.light_tv_room, 'switchLevel', setLevel)
    
        this.runIn(600, do_start_show)
        if (tvbool) {
        
        context.api.devices.sendCommands(context.config.tvswitch, 'switch', on)
    
        }
        } else {
        console.log('tv time nothing will happen')
        }
        

	})
