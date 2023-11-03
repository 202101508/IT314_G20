function addRecords(Record){
    Record.insertMany([
        {
            Id: 101,
            Status: "Accepted",
            Date: "2003-12-21",
        },
        {
            Id: 102,
            Status: "Accepted",
            Date: "2003-10-25",
        },
        {
            Id: 103,
            Status: "Declined",
            Date: "2004-12-20",
        },
        {
            Id: 104,
            Status: "Accepted",
            Date: "2004-11-01",
        },
        {
            Id: 105,
            Status: "Declined",
            Date: "2005-5-15",
        },
    ]).then(() => {
        console.log("Records added successfully!");
    });
}

function addInbox(Inbox){
    Inbox.insertMany([
        {
            studName: "Bhavesh Baraiya",
            studId: "202101241",
            reasonForVisit: "Campus tour",
        },
        {
            studName: "Smeet Agrawal",
            studId: "202101237",
            reasonForVisit: "Hostel and cafeteria inspection",
        },
        {
            studName: "priyesh Tandel",
            studId: "202101222",
            reasonForVisit: "Parent meating",
        },
    ]).then(() => {
        console.log("Inbox entries added.");
    });
}

module.exports = {
    addInbox,
    addRecords
}

