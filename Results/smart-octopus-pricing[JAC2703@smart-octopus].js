
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Smart Octopus Pricing'', section => {

        });


        page.section('Electricity region code:', section => {
            section.enumSetting('elecRegion').name('Select region');

        });


        page.section('Plunge Pricing', section => {
            section.deviceSetting('plungeSwitches').capability(['switch']).name('Turn these devices on');
            section.enumSetting('notifyPlunge').name('Yes/ No?');

        });


        page.section('Low Pricing', section => {
            section.numberSetting('cheapValue').name('When price is less than (x.xxp)');
            section.deviceSetting('cheapSwitches').capability(['switch']).name('Turn these devices on');

        });


        page.section('Medium Pricing', section => {
            section.numberSetting('regularValue').name('When price is less than (x.xxp)');
            section.deviceSetting('regularSwitches').capability(['switch']).name('Turn these devices on');

        });


        page.section('High Pricing', section => {
            section.numberSetting('highValue').name('When price is less than (x.xxp)');
            section.deviceSetting('highSwitches').capability(['switch']).name('Turn these devices on');

        });


        page.section('Variable Pricing', section => {
            section.numberSetting('variablePeriods').name('Periods in calculation');
            section.deviceSetting('variableSwitches').capability(['switch']).name('Turn these devices on');

        });


        page.section('Add virtual devices for each pricing level?', section => {
            section.enumSetting('addVirtualDevices').name('Yes/ No?');

        });


        page.section(''Notes'', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('getPricesSchedule', delay);

        context.api.schedules.schedule('checkPricesSchedule', delay);

    })

    .scheduledEventHandler('checkPricesSchedule', (context, event) => {
        
        console.log('Checking prices')
        if (state.switches.size() > 0) {
        this.checkPrices()
        }
        

	})

    .scheduledEventHandler('getPricesSchedule', (context, event) => {
        
        console.log('Getting price data from API')
        let maxDate = new Date()
        state.agilePrices.each({ let price ->
        let fromDate = Date.parse('yyyy-MM-dd\'T\'HH:mm:ssz', price.valid_from.replaceAll('Z', '+0000'))
        if (fromDate > maxDate ) {
        maxDate = fromDate
        }
        })
        if (new Date().clearTime() > maxDate.clearTime() || new Date().clearTime() == maxDate.clearTime() && new Date().getAt(Calendar.HOUR_OF_DAY) >= this.getAgilePricingPublishedHour()) {
        this.processGetPrices()
        } else {
        console.log("${state.agilePrices.size()} price data items are already in cache and it's not time to fetch new pricing data")
        }
        

	})
