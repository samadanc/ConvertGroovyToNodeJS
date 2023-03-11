
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which switches should be in this light group', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Which dimmers should be in this light group', section => {
            section.deviceSetting('dimmers').capability(['switchLevel']).name('');

        });


        page.section('Which bulbs with color control should be in this light group', section => {
            section.deviceSetting('colorControls').capability(['colorControl']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('saturationHandler', (context, event) => {
        
        console.log("Saturation: ${event.value}")
        console.log(colorControls)
        colorControls?.setSaturation(event.numericValue)
        

	})

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log(event.value)
        console.log(switches)
        switches?.on()
        

	})

    .subscribedEventHandler('dimHandler', (context, event) => {
        
        console.log("Dim level: ${event.value}")
        console.log(dimmers)
        dimmers?.setLevel(event.numericValue)
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log(event.value)
        console.log(switches)
        switches?.off()
        

	})

    .subscribedEventHandler('hueHandler', (context, event) => {
        
        console.log("Hue: ${event.value}")
        console.log(colorControls)
        colorControls?.setHue(event.numericValue)
        

	})

    .subscribedEventHandler('colorHandler', (context, event) => {
        
        console.log("Color: ${event.value}")
        console.log(colorControls)
        colorControls?.setColor(event.value)
        

	})
