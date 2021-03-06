type domainConfigValue = string | number | boolean;

export class Domain {
    private static _abbreviations: Record<string, string> = {
        aux_cmd_t:           "aux_command_topic",
        aux_stat_tpl:        "aux_state_template",
        aux_stat_t:          "aux_state_topic",
        avty_t:              "availability_topic",
        away_mode_cmd_t:     "away_mode_command_topic",
        away_mode_stat_tpl:  "away_mode_state_template",
        away_mode_stat_t:    "away_mode_state_topic",
        bri_cmd_t:           "brightness_command_topic",
        bri_scl:             "brightness_scale",
        bri_stat_t:          "brightness_state_topic",
        bri_val_tpl:         "brightness_value_template",
        bat_lev_t:           "battery_level_topic",
        bat_lev_tpl:         "battery_level_template",
        chrg_t:              "charging_topic",
        chrg_tpl:            "charging_template",
        clr_temp_cmd_t:      "color_temp_command_topic",
        clr_temp_stat_t:     "color_temp_state_topic",
        clr_temp_val_tpl:    "color_temp_value_template",
        cln_t:               "cleaning_topic",
        cln_tpl:             "cleaning_template",
        cmd_t:               "command_topic",
        curr_temp_t:         "current_temperature_topic",
        dev:                 "device",
        dev_cla:             "device_class",
        dock_t:              "docked_topic",
        dock_tpl:            "docked_template",
        err_t:               "error_topic",
        err_tpl:             "error_template",
        fanspd_t:            "fan_speed_topic",
        fanspd_tpl:          "fan_speed_template",
        fanspd_lst:          "fan_speed_list",
        fx_cmd_t:            "effect_command_topic",
        fx_list:             "effect_list",
        fx_stat_t:           "effect_state_topic",
        fx_val_tpl:          "effect_value_template",
        exp_aft:             "expire_after",
        fan_mode_cmd_t:      "fan_mode_command_topic",
        fan_mode_stat_tpl:   "fan_mode_state_template",
        fan_mode_stat_t:     "fan_mode_state_topic",
        frc_upd:             "force_update",
        hold_cmd_t:          "hold_command_topic",
        hold_stat_tpl:       "hold_state_template",
        hold_stat_t:         "hold_state_topic",
        ic:                  "icon",
        init:                "initial",
        json_attr:           "json_attributes",
        json_attr_t:         "json_attributes_topic",
        max_temp:            "max_temp",
        min_temp:            "min_temp",
        mode_cmd_t:          "mode_command_topic",
        mode_stat_tpl:       "mode_state_template",
        mode_stat_t:         "mode_state_topic",
        on_cmd_type:         "on_command_type",
        opt:                 "optimistic",
        osc_cmd_t:           "oscillation_command_topic",
        osc_stat_t:          "oscillation_state_topic",
        osc_val_tpl:         "oscillation_value_template",
        pl_arm_away:         "payload_arm_away",
        pl_arm_home:         "payload_arm_home",
        pl_avail:            "payload_available",
        pl_cls:              "payload_close",
        pl_disarm:           "payload_disarm",
        pl_hi_spd:           "payload_high_speed",
        pl_lock:             "payload_lock",
        pl_lo_spd:           "payload_low_speed",
        pl_med_spd:          "payload_medium_speed",
        pl_not_avail:        "payload_not_available",
        pl_off:              "payload_off",
        pl_on:               "payload_on",
        pl_open:             "payload_open",
        pl_osc_off:          "payload_oscillation_off",
        pl_osc_on:           "payload_oscillation_on",
        pl_stop:             "payload_stop",
        pl_unlk:             "payload_unlock",
        pow_cmd_t:           "power_command_topic",
        ret:                 "retain",
        rgb_cmd_tpl:         "rgb_command_template",
        rgb_cmd_t:           "rgb_command_topic",
        rgb_stat_t:          "rgb_state_topic",
        rgb_val_tpl:         "rgb_value_template",
        send_cmd_t:          "send_command_topic",
        send_if_off:         "send_if_off",
        set_pos_tpl:         "set_position_template",
        set_pos_t:           "set_position_topic",
        spd_cmd_t:           "speed_command_topic",
        spd_stat_t:          "speed_state_topic",
        spd_val_tpl:         "speed_value_template",
        spds:                "speeds",
        stat_clsd:           "state_closed",
        stat_off:            "state_off",
        stat_on:             "state_on",
        stat_open:           "state_open",
        stat_t:              "state_topic",
        stat_val_tpl:        "state_value_template",
        sup_feat:            "supported_features",
        swing_mode_cmd_t:    "swing_mode_command_topic",
        swing_mode_stat_tpl: "swing_mode_state_template",
        swing_mode_stat_t:   "swing_mode_state_topic",
        temp_cmd_t:          "temperature_command_topic",
        temp_stat_tpl:       "temperature_state_template",
        temp_stat_t:         "temperature_state_topic",
        tilt_clsd_val:       "tilt_closed_value",
        tilt_cmd_t:          "tilt_command_topic",
        tilt_inv_stat:       "tilt_invert_state",
        tilt_max:            "tilt_max",
        tilt_min:            "tilt_min",
        tilt_opnd_val:       "tilt_opened_value",
        tilt_status_opt:     "tilt_status_optimistic",
        tilt_status_t:       "tilt_status_topic",
        t:                   "topic",
        uniq_id:             "unique_id",
        unit_of_meas:        "unit_of_measurement",
        val_tpl:             "value_template",
        whit_val_cmd_t:      "white_value_command_topic",
        whit_val_scl:        "white_value_scale",
        whit_val_stat_t:     "white_value_state_topic",
        whit_val_tpl:        "white_value_template",
        xy_cmd_t:            "xy_command_topic",
        xy_stat_t:           "xy_state_topic",
        xy_val_tpl:          "xy_value_template",

        cns:                 "connections",
        ids:                 "identifiers",
        mf:                  "manufacturer",
        mdl:                 "model",
        sw:                  "sw_version",
    };

    protected _iobStates: Record<string, any> = {};

    protected _config: Record<string, domainConfigValue>;

    protected _mqttPayloadCatch: Record<string, (string|{w: string, r: string})> = {};

    public name: string = "";

    /**
     * Get key value in config. Only if value is string.
     * @param key config key
     */
    protected getConfigString(key: string) {
        if (typeof this._config[key] === "string") {
            return this._config[key].toString();
        }
        return "";
    }

    private get baseTopic() {
        return this.getConfigString("~");
    }

    private handleBaseTopic() {
        if (this.baseTopic !== "") {
            for (const k in this._config) {
                if (this._config.hasOwnProperty(k)) {
                    const v = this._config[k];
                    if (typeof v === "string") {
                        if (v.indexOf("~") >= 0) {
                            v.replace("~", this.baseTopic);
                            this._config[k] = v;
                        }
                    }
                }
            }
        }
    }

    private handleAbbreviations() {
        for (const k in this._config) {
            if (this._config.hasOwnProperty(k)) {
                const v = this._config[k];
                if (Domain._abbreviations[k]) {
                    this._config[Domain._abbreviations[k]] = v;
                    delete this._config[k];
                }
            }
        }
    }

    protected getStateReadTopic(sKay: string): string {
        const st = this._iobStates[sKay];
        if (st.common.read && st.native && st.native.customTopic) {
            if (typeof st.native.customTopic === "object") {
                return st.native.customTopic.r;
            } else {
                return st.native.customTopic;
            }
        }
        return "";
    }

    protected getStateWriteTopic(sKay: string): string {
        const st = this._iobStates[sKay];
        if (st.common.write && st.native && st.native.customTopic) {
            if (typeof st.native.customTopic === "object") {
                return st.native.customTopic.w;
            } else {
                return st.native.customTopic;
            }
        }
        return "";
    }

    constructor(config: string) {
        this._config = JSON.parse(config);
        this.handleBaseTopic();
        this.handleAbbreviations();
    }

    public get iobStates(): any {
        return this._iobStates;
    }

    /**
     * get ioBroker states from mqtt id.
     * If ioBroker state contains different read and write topic.
     * compare read topic.
     * @param id mqttID
     */
    public idToReadableStates(id: string): string[] {
        const states = [];
        for (const s in this._iobStates) {
            if (this._iobStates.hasOwnProperty(s)) {
                if (this.getStateReadTopic(s).replace(/\//g, ".") === id) states.push(s);
            }
        }
        return states;
    }

    /**
     * Get readable state mqtt payload catch.
     * @param state readable state ID
     */
    public getReadableStateMqttPayload(state: string): string {
        const payload = this._mqttPayloadCatch[state];
        if (payload) {
            if (typeof payload === "string") {
                return payload;
            } else {
                return payload.r;
            }
        }
        return "";
    }

    /**
     * Update readable state mqtt payload catch.
     * callback will update ioBroker readable state value.
     * @param stateID readable state ID
     * @param mqttPayload new mqtt payload got from mqtt broker
     * @param callback return new ioBroker state value
     */
    public mqttStateChange(stateID: string, mqttPayload: string, callback: (iobVal: any) => void) {
        return;
    }

    /**
     * Writeable state to MQTT topic. This is only called when writeable state changed
     * in ioBroker system.
     * @param state Writeable state
     */
    public writeableStateToTopic(wState: string): string {
        return this.getStateWriteTopic(wState);
    }

    /**
     * Get writeable state mqtt payload catch.
     * @param state readable state ID
     */
    public getWriteableStateMqttPayload(state: string): string {
        const payload = this._mqttPayloadCatch[state];
        if (payload) {
            if (typeof payload === "string") {
                return payload;
            } else {
                return payload.w;
            }
        }
        return "";
    }

    /**
     * ioBroker writeable state change, need send mqtt message to broker
     * @param stateID ioBroker state name
     * @param val new state value
     * @param callback return new mqtt payload, need send to broker
     */
    public iobStateChange(stateID: string, val: any, callback: (mqttPayload: string) => void) {
        return;
    }
/**
 * device
(map)(Optional)Information about the device this switch is a part of to tie it into the device registry. Only works through MQTT discovery and when unique_id is set.

identifiers
(list | string)(Optional)A list of IDs that uniquely identify the device. For example a serial number.

connections
(list)(Optional)A list of connections of the device to the outside world as a list of tuples [connection_type, connection_identifier]. For example the MAC address of a network interface: "connections: [["mac", "02:5b:26:a8:dc:12"]].

manufacturer
(string)(Optional)The manufacturer of the device.

model
(string)(Optional)The model of the device.

name
(string)(Optional)The name of the device.

sw_version
(string)(Optional)The firmware version of the device.
 */
}