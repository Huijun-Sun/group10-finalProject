const mongoCollections = require('../config/mongoCollections');
const universities = mongoCollections.universities;
const { ObjectId } = require('mongodb');

async function addUniversity(title, courses, category, programs, location, deadline, tuitionfees, rating, rank, livingexp, averagescore, websitelink,workexp,GPA)
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
        websitelink: websitelink,
        workexp: workexp,
        GPA: GPA,
        intake: intake
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
async function getDeadline(title,course,intake)
{
   

    const universityCollection = await universities();
        if (title != null && course != null && intake !=null)
        {
		const album = await universityCollection.find({ courses: course,intake: intake,title: title });
        return album;
        }
        if (title != null && course != null )
        {
		const album = await universityCollection.find({ courses: course,title: title });
        return album;
        }
        if (title != null  && intake !=null)
        {
		const album = await universityCollection.find({ intake: intake,title: title });
        return album;
        }
        if (course != null && intake !=null)
        {
		const album = await universityCollection.find({ courses: course,intake: intake });
        return album;
        }
        if (course != null )
        {
		const album = await universityCollection.find({ courses: course });
        return album;
        }
        if (intake !=null)
        {
		const album = await universityCollection.find({intake: intake});
        return album;
        }
        if (title != null)
        {
		const album = await universityCollection.find({ title: title });
        return album;
        }
}
async function getUniversity_finder(course,score,exp,gpa,papers)
{


    const universityCollection = await universities();
        
        
		const album = await universityCollection.find({courses: course,averagescore:score,workexp: {$lte:exp},GPA:{$lte:gpa}}).toArray();
	
		return album;
}

module.exports = {addUniversity,getAllUniversity,getUniversity,getUniversity_finder,getDeadline};