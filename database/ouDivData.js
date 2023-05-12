import mongoose from 'mongoose';

const ouDiv = [
         {
           ou: "News management",
           div : [
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
           ]
         },
         {
           ou: "Software reviews",
           div: [
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
           ]
         },
         {
           ou: "Hardware reviews",
           div: [
             "Product Management",
             "Engineering",
             "QA",
             "Marketing",
             "Sales",
             "Finance",
             "IT",
             "Human Resources",
             "Legal",
             "Compliance"
           ]
        },

         {
           ou: "Opinion publishing",
           div: [
             "Editorial",
             "Content Strategy",
             "Audience Development",
             "Social Media",
             "Marketing",
             "Advertising",
             "Finance",
             "IT",
             "Human Resources",
             "Legal"
          ]
        }
      ];

const ouMap = new Map();
const divMap = new Map();

let ouPool = [];
let divPool = [];

for (let i = 0; i < ouDiv.length; i ++) {

  if (!ouPool.includes(ouDiv[i].ou)) {
    ouMap.set(ouDiv[i].ou, new mongoose.Types.ObjectId() );
  }

  for (let j = 0; j < ouDiv[i].div.length; j ++) {

    if (!divPool.includes(ouDiv[i].div[j])) {
      divMap.set(ouDiv[i].div[j], new mongoose.Types.ObjectId() );
    }

  }
}

export {ouMap, divMap, ouDiv};
