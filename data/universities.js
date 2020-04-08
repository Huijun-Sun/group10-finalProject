const mongoCollections = require('../config/mongoCollections');
const universities = mongoCollections.universities;
const { ObjectId } = require('mongodb');

async function addUniversity(title, courses, category, programs, location, deadline, tuitionfees, rating, rank, livingexp, averagescore, websitelink)
{
   
    const universityCollection = await universities();
    let newuv = {
        title: title,
        courses: courses,
        category: category,
        programs: programs,
        location: location,
        deadline: deadline,
        tuitionfees: tuitionfees,
        rating: rating,
        rank: rank,
        livingexp: livingexp,
        averagescore: averagescore,
        websitelink: websitelink
    };
    
    const insertInfo = await universityCollection.insertOne(newuv);
        if (insertInfo.insertedCount === 0) 
            throw 'Could not add university';
    const newId = insertInfo.insertedId;

        let album = await this.getUniversity(newId);
        
       
		return album;

}
async function getAllUniversity()
{
    const universityCollection = await universities();

    const albumList = await universityCollection.find({}).toArray();
    
    return albumList;
}
async function getUniversity(id)
{
   

    const universityCollection = await universities();
        let objId=id;
		const album = await universityCollection.findOne({ _id: objId });
	
		return album;
}

module.exports = {addUniversity,getAllUniversity,getUniversity};