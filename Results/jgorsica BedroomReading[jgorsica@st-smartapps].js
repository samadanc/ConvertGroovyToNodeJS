
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Bedside Buttons that will...', section => {
            section.deviceSetting('buttonLeft').capability(['button']).name('Left?');
            section.deviceSetting('buttonRight').capability(['button']).name('Right?');

        });


        page.section('...turn on this switch...', section => {
            section.deviceSetting('lightSwitch').capability(['switch']).name('');

        });


        page.section('...and control these lights:', section => {
            section.deviceSetting('huesLeft').capability(['colorControl']).name('Left?');
            section.deviceSetting('huesRight').capability(['colorControl']).name('Right?');

        });


        page.section('Optionally say good night when lights turned off via buttons?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.buttonLeft, 'button', 'button', 'leftPushHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.buttonRight, 'button', 'button', 'rightPushHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lightSwitch, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (event.value == 'on') {
        let newValue = ['hue': 21, 'saturation': 32, 'level': 99]
        console.log("new value = $newValue")
        huesLeft*.on()
        huesRight*.on()
        huesLeft.each({
        it.setColor(newValue)
        })
        huesRight.each({
        it.setColor(newValue)
        })
        huesRight.each({
        it.setColor(newValue)
        })
        state.setting = 'on'
        } else {
        huesLeft.each({
        it.off()
        })
        huesRight.each({
        it.off()
        })
        state.setting = 'off'
        }
        

	})

    .subscribedEventHandler('rightPushHandler', (context, event) => {
        
        console.log("Right: ${event.name}: ${event.value}")
        if (event.value == 'pushed') {
        console.log("Previous State: ${state.setting}")
        if (this.doubleTapR()) {
        huesLeft.each({
        it.off()
        })
        huesRight.each({
        it.off()
        })
        state.setting = 'off'
        this.goodNight()
        } else {
        if (lightSwitch) {
        if (lightSwitch.currentSwitch == 'off') {
        console.log("turning on light switch: $lightSwitch")
        
        context.api.devices.sendCommands(context.config.lightSwitch, 'switch', on)
    
        } else {
        if (state.setting == 'on') {
        let newValue = ['hue': 22, 'saturation': 19, 'level': 64]
        console.log("new value = $newValue")
        huesLeft*.setColor(newValue)
        huesRight*.setColor(newValue)
        state.setting = 'readBoth'
        } else {
        if (state.setting == 'readBoth') {
        huesRight*.off()
        state.setting = 'readLeft'
        } else {
        if (state.setting == 'readLeft') {
        huesRight*.on()
        state.setting = 'readBoth'
        } else {
        if (state.setting == 'readRight') {
        huesRight*.off()
        state.setting = 'off'
        this.goodNight()
        } else {
        if (state.setting == 'off') {
        huesRight*.on()
        state.setting = 'readRight'
        }
        }
        }
        }
        }
        }
        }
        }
        console.log("New State: ${state.setting}")
        }
        

	})

    .subscribedEventHandler('leftPushHandler', (context, event) => {
        
        console.log("Left: ${event.name}: ${event.value}")
        if (event.value == 'pushed') {
        console.log("Previous State: ${state.setting}")
        if (this.doubleTapL()) {
        huesLeft.each({
        it.off()
        })
        huesRight.each({
        it.off()
        })
        state.setting = 'off'
        this.goodNight()
        } else {
        if (lightSwitch) {
        if (lightSwitch.currentSwitch == 'off') {
        console.log("turning on light switch: $lightSwitch")
        
        context.api.devices.sendCommands(context.config.lightSwitch, 'switch', on)
    
        } else {
        if (state.setting == 'on') {
        let newValue = ['hue': 22, 'saturation': 19, 'level': 64]
        console.log("new value = $newValue")
        huesLeft*.setColor(newValue)
        huesRight*.setColor(newValue)
        state.setting = 'readBoth'
        } else {
        if (state.setting == 'readBoth') {
        huesLeft*.off()
        state.setting = 'readRight'
        } else {
        if (state.setting == 'readRight') {
        huesLeft*.on()
        state.setting = 'readBoth'
        } else {
        if (state.setting == 'readLeft') {
        huesLeft*.off()
        state.setting = 'off'
        this.goodNight()
        } else {
        if (state.setting == 'off') {
        huesLeft*.on()
        state.setting = 'readLeft'
        }
        }
        }
        }
        }
        }
        }
        }
        console.log("New State: ${state.setting}")
        }
        

	})
