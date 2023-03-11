
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('thebulb').capability(['colorControl']).name('Select RGB bulb:');

        });


        page.section(''Scheduling:'', section => {

        });


        page.section('Weekday Schedule (Mon-Fri):', section => {
            section.timeSetting('greenstartTimeWeekday').name('Green Start Time (Weekdays)');
            section.timeSetting('redstartTimeWeekday').name('Red Start Time (Weekdays)');

        });


        page.section('Weekend Schedule (Sat-Sun):', section => {
            section.timeSetting('greenstartTimeWeekend').name('Green Start Time (Weekends)');
            section.timeSetting('redstartTimeWeekend').name('Red Start Time (Weekends)');

        });


        page.section('Attributes of green:', section => {
            section.numberSetting('greenLevel').name('Green Brightness Level (1-100)');
            section.numberSetting('greenHue').name('Green Hue (0-100)');
            section.numberSetting('greenSaturation').name('Green Saturation (0-100)');

        });


        page.section('Attributes of red:', section => {
            section.numberSetting('redLevel').name('Red Brightness Level (1-100)');
            section.numberSetting('redHue').name('Red Hue (0-100)');
            section.numberSetting('redSaturation').name('Red Saturation (0-100)');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('redWeekendCallback', delay);

        context.api.schedules.schedule('redWeekdayCallback', delay);

        context.api.schedules.schedule('greenWeekdayCallback', delay);

        context.api.schedules.schedule('greenWeekendCallback', delay);

    })

    .scheduledEventHandler('greenWeekendCallback', (context, event) => {
        
        this.green()
        

	})

    .scheduledEventHandler('redWeekdayCallback', (context, event) => {
        
        this.red()
        

	})

    .scheduledEventHandler('greenWeekdayCallback', (context, event) => {
        
        this.green()
        

	})

    .scheduledEventHandler('redWeekendCallback', (context, event) => {
        
        this.red()
        

	})
