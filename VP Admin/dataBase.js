import mongoose from "mongoose";
export let records;
const {Schema} = mongoose;

mongoose.connect("mongodb://127.0.0.1:27017/admin_records");

const recordSchema = new Schema({
    Id: Number,
    Status: String,
    Date: Date
});

const Record = mongoose.model("Record", recordSchema);

// Record.insertMany([
//     {
//         Id: 101,
//         Status: "Accepted",
//         Date: '2003-12-21'
//     },
//     {
//         Id: 102,
//         Status: "Accepted",
//         Date: '2003-10-25'
//     },
//     {
//         Id: 103,
//         Status: "Declined",
//         Date: '2004-12-20'
//     },
//     {
//         Id: 104,
//         Status: "Accepted",
//         Date: '2004-11-01'
//     },
//     {
//         Id: 105,
//         Status: "Declined",
//         Date: '2005-5-15'
//     }
// ]).then(()=>{
//     console.log("Added successfully.");
// });

// Record.find().then((records)=>{
//     console.log(records);
//     export {records as records};
// });

records = await Record.find();

console.log(records);