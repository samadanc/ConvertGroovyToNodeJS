
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Temp limits', section => {

        });


        page.section('Lists of temperatures', section => {
            section.textSetting('winter_c_temp').name('Winter set');
            section.textSetting('spring_c_temp').name('Spring set');
            section.textSetting('summer_c_temp').name('Summer set');

        });


        page.section('Switch check', section => {
            section.deviceSetting('tempSwitch').capability(['thermostat']).name('Check temp inside');

        });


        page.section('Check weather scheduler', section => {
            section.timeSetting('checktime01').name('First 3:00AM');
            section.timeSetting('checktime02').name('Second 10:00AM');
            section.timeSetting('checktime03').name('Dinner check 3:00PM');
            section.timeSetting('checktime04').name('Evening check 10:00PM');

        });


        page.section('Thermostats', section => {
            section.deviceSetting('tempLivingRoom').capability(['thermostat']).name('01 - Living Room');
            section.deviceSetting('tempGuestRoom').capability(['thermostat']).name('01 - Guest Room');
            section.deviceSetting('tempUF_LR').capability(['thermostat']).name('01 - UF Living room');
            section.deviceSetting('tempUF_K').capability(['thermostat']).name('01 - UF Kitchen');
            section.deviceSetting('tempUF_H').capability(['thermostat']).name('01 - UF Halfway');
            section.deviceSetting('tempUF_F').capability(['thermostat']).name('01 - UF Foyer');
            section.deviceSetting('tempUF_B01').capability(['thermostat']).name('01 - UF Bathrom');
            section.deviceSetting('tempBedRoom').capability(['thermostat']).name('02 - BedRoom');
            section.deviceSetting('tempChildren').capability(['thermostat']).name('02 - Children');
            section.deviceSetting('tempUF_B02').capability(['thermostat']).name('02 - UF Bathrom');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery1Hour('check_indoor_temp_hour', delay);

    })

    .scheduledEventHandler('check_indoor_temp_hour', (context, event) => {
        
        console.log("TEMP_hourly =  $tempSwitch")
        let temp_term_check = tempSwitch.temperatureState.numberValue
        console.log("tempSwitch hourly temp  $temp_term_check")
        switch ( temp_term_check ) {
        case {
        state.TemeratureSet == 'Winter' && it > winter_switch_temp + 0.1
        }:
        this.checkWeather(true)
        break
        case {
        state.TemeratureSet == 'Summer' && it < summer_switch_temp - 0.1
        }:
        this.checkWeather(true)
        break
        case {
        state.TemeratureSet == 'Spring' && it > summer_switch_temp + 0.1 || it < winter_switch_temp - 0.1
        }:
        this.checkWeather(true)
        break
        }
        

	})
