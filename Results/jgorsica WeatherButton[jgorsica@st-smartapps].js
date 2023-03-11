
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Speak weather, when this button is pressed:', section => {
            section.deviceSetting('button').capability(['button']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.button, 'button', 'button', 'pushHandler')

    })

    .subscribedEventHandler('pushHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        state.forecastDay = ''
        state.forecast = ''
        if (event.value == 'pushed') {
        let successWeatherCall = { let response ->
        console.log("Response was successful, $response")
        state.forecastDay = response.data[0].children[3].children[0].children[1].children[0].children[3].children[0]
        state.forecast = response.data[0].children[3].children[0].children[1].children[0].children[4].children[0]
        }
        let paramsWeather = ['uri': 'http://api.wunderground.com/api/da900696864aa51f/forecast/q/IL/Round_Lake.xml', 'contentType': 'text/xml', 'success': successWeatherCall ]
        this.httpGet(paramsWeather)
        }
        state.pun = ''
        if (event.value == 'pushed') {
        let successPunCall = { let response ->
        console.log("Response was successful, $response")
        state.pun = response.data[0].children[0].children[9].children[2].text().split('&')[0]
        }
        let paramsPun = ['uri': 'http://feeds.feedburner.com/PunOfTheDay', 'contentType': 'text/xml', 'success': successPunCall ]
        this.httpGet(paramsPun)
        console.log(state.pun)
        }
        

	})
