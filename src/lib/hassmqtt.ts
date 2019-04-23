import {Domain} from "./domain/domain";
import {HaSwitch} from "./domain/switch";

const supportedDomain: Record<string, any> = {
//    "alarm_control_panel",
//    "binary_sensor": null,
//    "camera",
//    "cover": null,
//    "fan",
//    "climate",
//    "light",
//    "lock": null,
//    "sensor": null,
    switch: HaSwitch,
//    "vacuum",
};

export type hassState = string | boolean | number;

export type hassAttr = string | boolean | number;

export class HassDevice {
    public domain: string;
    public entityID: string;
    public friendlyName: string;
    public nodeID?: string;
    public state?: hassState;
    public attrs?: Record<string, hassAttr>;
    private _instant?: Domain;

    constructor(id: string, val: string) {
        this.domain = "";
        this.entityID = "";
        this.friendlyName = "";

        const match = id.split(".");

        if (!match || match.length > 5) {
            return;
        }
        if (match.length === 5) {
            this.domain = match[1];
            this.nodeID = match[2];
            this.entityID = match[3];
            this.friendlyName = match[3];
        } else if (match.length === 4) {
            this.domain = match[1];
            this.entityID = match[2];
            this.friendlyName = match[2];
        }

        if (!supportedDomain[this.domain]) {
            // This domain not supported.
            return;
        }
        this._instant = new supportedDomain[this.domain](val);
        if (typeof this._instant === "undefined") {
            return;
        }

        if (this._instant.name) {
            this.friendlyName = this._instant.name;
        }
    }

    public get iobStates() {
        if (typeof this._instant === "undefined") {
            return undefined;
        }
        return this._instant.getIobStates();
    }

    public get ready() {
        return (typeof this._instant !== "undefined");
    }

    /**
     * 
     * @param id MQTT Topic
     * @param val MQTT Topic Value
     * @param callback update object value
     */
    public mqttStateChange(id: string, val: any, callback: (err: string | null, state?: string, iobVal?: any) => void) {
        if (typeof this._instant === "undefined") {
            callback("Uninitialized device");
            return;
        }
        const state = this._instant.idToState(id);
        if (typeof state === "undefined") {
            callback(`Can not find state matched this ID ${id}`);
            return;
        }
        this._instant.mqttStateChange(state, val);
        callback(null, state, this._instant.iobStateVal(state));
    }

    public iobStateChange(id: string, val: any, callback: (err: string | null, mqttID?: string, mqttVal?: any) => void) {
        if (typeof this._instant === "undefined") {
            callback("Uninitialized device");
            return;
        }
        const match = id.split(".");
        if (!match || match.length !== 4) {
            callback(`Invalid ioBroker state ID: ${id}`);
            return;
        }
        const state = match[3];
        const mqttID = this._instant.stateToId(state);
        if (typeof mqttID === "undefined") {
            callback(`No need to publish state: ${state}`);
            return;
        }

        this._instant.iobStateChange(state, val);
        callback(null, mqttID, this._instant.mqttPayload(state));
    }
}
