import mongoose from 'mongoose';

const OrgUnitsSchema = new mongoose.Schema({

  name: { 
    type: String, 
    enum: [
      { "News management" : {
         division: {
           type: String,
           enum: [
             "Editorial",
             "Content Strategy",
             "Audience Development",
             "Social Media",
             "Marketing",
             "Advertising",
             "Finance",
             "IT",
             "Human Resource",
             "Legal"
           ],
           required: true 
         }
      },
    },
    { "Software reviews" : {
        division: {
          type: String,
          enum: [
            "Product Management",
            "Engineering",
            "QA",
            "Marketing",
            "Sales",
            "Finance",
            "IT",
            "Human Resource",
            "Legal",
            "Compliance"
          ],
          required: true
        }
      }
    },
      "Hardware reviews",
      "Opinion publishing"
      ], 
    required: true },
});

const OrgUnits = mongoose.model('OrgUnits', OrgUnitsSchema);

export default OrgUnits;

