/*
* This code imports the Mongoose library and
* defines a list of Organisational Units and Divisions data objects.
* It then creates two maps, one for Organisational Units and one for Divisions,
* and populates them with the data from the data objects.
* Finally, it exports the maps and the data objects.
*/
import mongoose from 'mongoose';

// Organisational Units and Divisions data objects.
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


// Create a map for Organisational Units.
const ouMap = new Map();

// Create a map for Divisions.
const divMap = new Map();


// Create a pool of Organisational Unit names.
let ouPool = [];

// Create a pool of Division names.
let divPool = [];

for (let i = 0; i < ouDiv.length; i ++) {

  
  // Check if the Organisational Unit name is already in the pool.
  if (!ouPool.includes(ouDiv[i].ou)) {
    
    // If not, add it to the pool and the map.
    ouMap.set(ouDiv[i].ou, new mongoose.Types.ObjectId() );
  }

  for (let j = 0; j < ouDiv[i].div.length; j ++) {

    // Check if the Division name is already in the pool.
    if (!divPool.includes(ouDiv[i].div[j])) {
      divMap.set(ouDiv[i].div[j], new mongoose.Types.ObjectId() );
    }

  }
}

export {ouMap, divMap, ouDiv};
