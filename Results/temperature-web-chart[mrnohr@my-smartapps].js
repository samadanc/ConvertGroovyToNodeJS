
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pick the temperature monitors', section => {
            section.deviceSetting('monitor1').capability(['temperatureMeasurement']).name('Temperature Monitor');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('saveDailyInformation', delay);

        context.api.schedules.runEvery15Minutes('recordTemperatureSchedule', delay);

    })

    .scheduledEventHandler('saveDailyInformation', (context, event) => {
        
        let df = new java.text.SimpleDateFormat('yyyy-MM-dd HH:mm')
        df.setTimeZone(location.timeZone)
        let formattedTime = df.format(new Date())
        let dailyInformation = ['average': this.getAverageTemp(), 'high': this.getHighTemp(), 'low': this.getLowTemp(), 'date': formattedTime ]
        state.daily << dailyInformation
        java.lang.Integer maxReadings = 20
        if (state.daily.size() > maxReadings ) {
        state.daily = state.daily.drop(state.daily.size() - maxReadings )
        }
        

	})

    .scheduledEventHandler('recordTemperatureSchedule', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.monitor1, 'temperatureMeasurement', currentState)
    
        if (currentTemperature instanceof List) {
        currentTemperature = currentTemperature[0]
        }
        let df = new java.text.SimpleDateFormat('yyyy-MM-dd HH:mm')
        df.setTimeZone(location.timeZone)
        let formattedTime = df.format(new Date())
        state.temperatures << ['time': formattedTime , 'temperature': currentTemperature ]
        state.currentTemperature = currentTemperature
        java.lang.Integer maxReadings = 24 * 4
        if (state.temperatures.size() > maxReadings ) {
        state.temperatures = state.temperatures.drop(state.temperatures.size() - maxReadings )
        }
        

	})
