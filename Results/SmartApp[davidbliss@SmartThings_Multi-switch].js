
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which controller', section => {

        });


        page.section('Switch 1 turns on/off these...', section => {
            section.deviceSetting('s1lights').capability(['switch']).name('');

        });


        page.section('Switch 2 turns on/off these...', section => {
            section.deviceSetting('s2lights').capability(['switch']).name('');

        });


        page.section('Switch 3 pauses these...', section => {
            section.deviceSetting('s3soni').capability(['musicPlayer']).name('');

        });


        page.section('Button 1 skips on these...', section => {
            section.deviceSetting('b1soni').capability(['musicPlayer']).name('');

        });


        page.section('Button 2 set colors on these...', section => {
            section.deviceSetting('b2hues').capability(['colorControl']).name('');

        });


        page.section('Knob dims these...', section => {
            section.deviceSetting('klights').capability(['switchLevel']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.controller, 'device.BlissControl ', 'switch5', 'switch5Handler')

        await context.api.subscriptions.subscribeToDevices(context.config.controller, 'device.BlissControl ', 'switch2', 'switch2Handler')

        await context.api.subscriptions.subscribeToDevices(context.config.controller, 'device.BlissControl ', 'switch3', 'switch3Handler')

        await context.api.subscriptions.subscribeToDevices(context.config.controller, 'device.BlissControl ', 'level', 'knob1Handler')

        await context.api.subscriptions.subscribeToDevices(context.config.controller, 'device.BlissControl ', 'switch1', 'switch1Handler')

        await context.api.subscriptions.subscribeToDevices(context.config.controller, 'device.BlissControl ', 'switch4', 'switch4Handler')

    })

    .subscribedEventHandler('knob1Handler', (context, event) => {
        
        console.log("knob1Handler: ${event.value}")
        for (let i : klights ) {
        i.setLevel(event.value.toInteger())}
        

	})

    .subscribedEventHandler('switch4Handler', (context, event) => {
        
        console.log("switch4Handler: ${event.value}")
        if (event.value == 'on4') {
        for (let i : b1soni ) {
        i.nextTrack()}
        }
        

	})

    .subscribedEventHandler('switch2Handler', (context, event) => {
        
        console.log("switch2Handler: ${event.value}")
        if (event.value == 'on2') {
        for (let i : s2lights ) {
        i.on()}
        } else {
        if (event.value == 'off2') {
        for (let i : s2lights ) {
        i.off()}
        }
        }
        

	})

    .subscribedEventHandler('switch3Handler', (context, event) => {
        
        console.log("switch3Handler: ${event.value}")
        if (event.value == 'on3') {
        for (let i : s3soni ) {
        i.play()}
        } else {
        if (event.value == 'off3') {
        for (let i : s3soni ) {
        i.pause()}
        }
        }
        

	})

    .subscribedEventHandler('switch1Handler', (context, event) => {
        
        console.log("switch1Handler: ${event.value}")
        if (event.value == 'on1') {
        for (let i : s1lights ) {
        i.on()}
        } else {
        if (event.value == 'off1') {
        for (let i : s1lights ) {
        i.off()}
        }
        }
        

	})

    .subscribedEventHandler('switch5Handler', (context, event) => {
        
        console.log("switch5Handler: ${event.value}")
        if (event.value == 'on5') {
        Random random = new Random()
        for (let i : b2hues ) {
        i.setLevel(60 + random.nextInt(10))
        i.setSaturation(60 + random.nextInt(20))
        i.setHue(15 + random.nextInt(4))
        }
        }
        

	})
