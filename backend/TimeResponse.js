class TimeResponse {
    // properties;
    // required;
    // type;
    epoch;

    constructor(){
        // this.properties = new Properties(description, epochType);
        // this.required = required;
        // this.type = type;
        const now = Date.now();
        this.epoch = now;
    }

}

// class Properties {
//     epoch

//     constructor(description, type) {
//         this.epoch = new Epoch(description, type);
//     }
// }

// class Epoch {
//     description;
//     type;

//     constructor(description, type) {
//         this.description = description;
//         this.type = type;
//     }
// }

module.exports = TimeResponse
