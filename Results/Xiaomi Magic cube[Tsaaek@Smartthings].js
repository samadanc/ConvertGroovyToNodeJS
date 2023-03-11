
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Magic cube', section => {
            section.deviceSetting('cube').capability(['button']).name('Cube');

        });


        page.section('Face 0', section => {
            section.deviceSetting('slave1').capability(['switch']).name('Device 1');
            section.enumSetting('knock1').name('Knock');
            section.enumSetting('left1').name('Rotate left');
            section.enumSetting('right1').name('Rotate right');
            section.enumSetting('shake1').name('Shake');
            section.enumSetting('slide1').name('Slide');
            section.numberSetting('dimstep1').name('Stepsize if dimmer-function choosed');
            section.deviceSetting('colorSwitch1').capability(['switch']).name('Device to toggle Hue colorpicker with');

        });


        page.section('Face 1', section => {
            section.deviceSetting('slave2').capability(['switch']).name('Device 2');
            section.enumSetting('knock2').name('Knock');
            section.enumSetting('left2').name('Rotate left');
            section.enumSetting('right2').name('Rotate right');
            section.enumSetting('shake2').name('Shake');
            section.enumSetting('slide2').name('Slide');
            section.numberSetting('dimstep2').name('Stepsize if dimmer-function choosed');
            section.deviceSetting('colorSwitch2').capability(['switch']).name('Device to toggle Hue colorpicker with');

        });


        page.section('Face 2', section => {
            section.deviceSetting('slave3').capability(['switch']).name('Device 3');
            section.enumSetting('knock3').name('Knock');
            section.enumSetting('left3').name('Rotate left');
            section.enumSetting('right3').name('Rotate right');
            section.enumSetting('shake3').name('Shake');
            section.enumSetting('slide3').name('Slide');
            section.numberSetting('dimstep3').name('Stepsize if dimmer-function choosed');
            section.deviceSetting('colorSwitch3').capability(['switch']).name('Device to toggle Hue colorpicker with');

        });


        page.section('Face 3', section => {
            section.deviceSetting('slave4').capability(['switch']).name('Device 4');
            section.enumSetting('knock4').name('Knock');
            section.enumSetting('left4').name('Rotate left');
            section.enumSetting('right4').name('Rotate right');
            section.enumSetting('shake4').name('Shake');
            section.enumSetting('slide4').name('Slide');
            section.numberSetting('dimstep4').name('Stepsize if dimmer-function choosed');
            section.deviceSetting('colorSwitch4').capability(['switch']).name('Device to toggle Hue colorpicker with');

        });


        page.section('Face 4', section => {
            section.deviceSetting('slave5').capability(['switch']).name('Device 5');
            section.enumSetting('knock5').name('Knock');
            section.enumSetting('left5').name('Rotate left');
            section.enumSetting('right5').name('Rotate right');
            section.enumSetting('shake5').name('Shake');
            section.enumSetting('slide5').name('Slide');
            section.numberSetting('dimstep5').name('Stepsize if dimmer-function choosed');
            section.deviceSetting('colorSwitch5').capability(['switch']).name('Device to toggle Hue colorpicker with');

        });


        page.section('Face 5', section => {
            section.deviceSetting('slave6').capability(['switch']).name('Device 6');
            section.enumSetting('knock6').name('Knock');
            section.enumSetting('left6').name('Rotate left');
            section.enumSetting('right6').name('Rotate right');
            section.enumSetting('shake6').name('Shake');
            section.enumSetting('slide6').name('Slide');
            section.numberSetting('dimstep6').name('Stepsize if dimmer-function choosed');
            section.deviceSetting('colorSwitch6').capability(['switch']).name('Device to toggle Hue colorpicker with');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.slave2, 'switch', 'switch.on', 'colorReset2')

        await context.api.subscriptions.subscribeToDevices(context.config.cube, 'button', 'button', 'buttonHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.slave1, 'switch', 'switch.on', 'colorReset1')

        await context.api.subscriptions.subscribeToDevices(context.config.slave4, 'switch', 'switch.on', 'colorReset4')

        await context.api.subscriptions.subscribeToDevices(context.config.slave5, 'switch', 'switch.on', 'colorReset5')

        await context.api.subscriptions.subscribeToDevices(context.config.slave6, 'switch', 'switch.on', 'colorReset6')

        await context.api.subscriptions.subscribeToDevices(context.config.slave3, 'switch', 'switch.on', 'colorReset3')

    })
