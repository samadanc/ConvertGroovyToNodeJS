
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('cumulativeHandler', (context, event) => {
        
                let f = 1.0
                let gpm = meter.latestValue('gpm')
                let cumulative = new BigDecimal(event.value)
                console.log("Cumulative Handler: [gpm: $gpm, cumulative: $cumulative]")
                let rules = state.rules
                rules.each({ let it ->
                    let r = it.rules
                    let childAppID = it.id
                    if (state["Start$childAppID"] == null) {
                        state["Start$childAppID"] = cumulative 
                    }
                    let newCumulative = this.waterConversionPreference(cumulative, r.measurementType)
                    let goalStartCumulative = this.waterConversionPreference(state["Start$childAppID"], r.measurementType)
                    let DailyGallonGoal = r.waterGoal
                    state.DailyGallonGoal = DailyGallonGoal 
                    let currentCumulation = newCumulative - goalStartCumulative 
                    state["currentCumulation$childAppID"] = currentCumulation 
                    console.log("Threshold:$DailyGallonGoal, Value:${(currentCumulation * f).round(2)}")
                    if (currentCumulation >= 0.5 * DailyGallonGoal && currentCumulation < 0.75 * DailyGallonGoal && state["fifty$childAppID"] == false) {
                        this.notify("You have reached 50% of your ${r.type} use limit. (${(currentCumulation * f).round(2)} of $DailyGallonGoal ${r.measurementType})")
                        console.log("You have reached 50% of your ${r.type} use limit. (${(currentCumulation * f).round(2)} of $DailyGallonGoal ${r.measurementType})")
                        state["fifty$childAppID"] = true
                    }
                    if (currentCumulation >= 0.75 * DailyGallonGoal && currentCumulation < 0.9 * DailyGallonGoal && state["seventyFive$childAppID"] == false) {
                        this.notify("You have reached 75% of your ${r.type} use limit. (${(currentCumulation * f).round(2)} of $DailyGallonGoal ${r.measurementType})")
                        console.log("You have reached 75% of your ${r.type} use limit. (${(currentCumulation * f).round(2)} of $DailyGallonGoal ${r.measurementType})")
                        state["seventyFive$childAppID"] = true
                    }
                    if (currentCumulation >= 0.9 * DailyGallonGoal && currentCumulation < DailyGallonGoal && state["ninety$childAppID"] == false) {
                        this.notify("You have reached 90% of your ${r.type} use limit. (${(currentCumulation * f).round(2)} of $DailyGallonGoal ${r.measurementType})")
                        console.log("You have reached 90% of your ${r.type} use limit. (${(currentCumulation * f).round(2)} of $DailyGallonGoal ${r.measurementType})")
                        state["ninety$childAppID"] = true
                    }
                    if (currentCumulation >= DailyGallonGoal && state["oneHundred$childAppID"] == false) {
                        this.notify("You have reached 100% of your ${r.type} use limit. (${(currentCumulation * f).round(2)} of $DailyGallonGoal ${r.measurementType})")
                        console.log("You have reached 100% of your ${r.type} use limit. (${(currentCumulation * f).round(2)} of $DailyGallonGoal ${r.measurementType})")
                        state["oneHundred$childAppID"] = true
                    }
                    if (state["endOfGoalPeriod$childAppID"] == true) {
                        state["Start$childAppID"] = cumulative 
                        state["endOfGoalPeriod$childAppID"] = false
                    }
                })
            

	})
