
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Generate Username and Password', section => {
            section.textSetting('sparkUsername').name('Your Spark.io Username');

        });


        page.section('Digital Pins', section => {
            section.enumSetting('sensorTypeD$i').name('Select sensor type for Pin D$i');

        });


        page.section('Analog Pins', section => {
            section.enumSetting('sensorTypeA$i').name('Select sensor type for Pin A$i');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchValueHandler', (context, event) => {
        
        console.log("switch dimmed to ${event.value}!")
        this.httpPost("https://api.spark.io/v1/devices/$sparkDevice/setValue?access_token=${state.sparkToken}", "command=switch1:${event.value}", { let response ->
        console.log(response.data)
        })
        

	})

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        console.log('switch turned off!')
        this.httpPost("https://api.spark.io/v1/devices/$sparkDevice/setOff?access_token=${state.sparkToken}", 'command=switch1', { let response ->
        console.log(response.data)
        })
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        console.log('switch turned on!')
        this.httpPost("https://api.spark.io/v1/devices/$sparkDevice/setOn?access_token=${state.sparkToken}", 'command=switch1', { let response ->
        console.log(response.data)
        })
        

	})
