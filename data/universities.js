const mongoCollections = require('../config/mongoCollections');
const universities = mongoCollections.universities;
const { ObjectId } = require('mongodb');

async function addUniversity(title, courses, category, programs, location, deadline, tuitionfees, rating, rank, livingexp, averagescore, websitelink,workexp,GPA,intake,papers,description,coursedesc)
{
    if(!title)
    throw "Title is required";
    if(typeof title != 'string')
    throw "Title must be string";

    if(!courses)
    throw "courses is required";
    if(typeof courses != 'object' || courses.length<=0 )
    throw "course must be array";

    if(!category)
    throw "category is required";
    if(typeof category != 'string')
    throw "category must be string";

    if(!programs)
    throw "programs is required";
    if(typeof programs != 'object' || programs.length<=0 )
    throw "programs must be array";

    if(!location)
    throw "location is required";
    if(typeof location != 'string')
    throw "location must be string";

    if(!deadline)
    throw "deadline is required";
    if(typeof deadline != 'object')
    throw "deadline must be object";

    if(!tuitionfees)
    throw "tuitionfees is required";
    if(typeof tuitionfees != 'string')
    throw "tuitionfees must be string";

    if(!rating)
    throw "rating is required";
    if(typeof rating != 'float' && typeof rating !='number')
    throw "rating must be float";

    if(!rank)
    throw "rank is required";
    if(typeof rank != 'number')
    throw "rank must be number";

    if(!livingexp)
    throw "livingexp is required";
    if(typeof livingexp != 'string')
    throw "livingexp must be string";

    if(!averagescore)
    throw "averagescore is required";
    if((typeof averagescore != 'number') || (averagescore<280 || averagescore>320))
    throw "score must be number >280 and lessthan 320";

    if(!websitelink)
    throw "websitelink is required";
    if(typeof websitelink != 'string')
    throw "websitelink must be string";

    if(!workexp)
    throw "workexp is required";
    if(typeof workexp != 'number')
    throw "workexp must be number";

    if(!GPA)
    throw "GPA is required";
    if((typeof GPA != 'float' && typeof GPA !='number') || (GPA<0 || GPA>4))
    throw "GPA must be number >0 and less than 4";

    if(!intake)
    throw "intake is required";
    if(typeof intake != 'object' || intake.length<=0 )
    throw "intake must be array";

    if(!papers)
    throw "papers is required";
    if(typeof papers != 'number')
    throw "papers must be number";

    if(!description)
    throw "Description is required";
    if(typeof description != 'string')
    throw "description must be string";

    if(!coursedesc)
    throw "Course Description is required";
    if(typeof coursedesc != 'string')
    throw "coursedesc must be string";

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
        intake: intake,
        papers: papers,
        description: description,
        coursedesc: coursedesc
        
    };
    
    const insertInfo = await universityCollection.insertOne(newuv);
    if (insertInfo.insertedCount === 0) 
        throw 'Could not add university';
    const newId = insertInfo.insertedId;
    let univ = await this.getUniversity(newId);        
	return univ;

}
async function getAllUniversity()
{
    const universityCollection = await universities();

    const univList = await universityCollection.find({}).toArray();
    if (univList === null || univList.length<1) throw 'No university list found';
    return univList;
}
async function getUniversity(id)
{
    
    if(!id)
    throw 'Id is required';
    const universityCollection = await universities();
    let objId=id;
    if (typeof id == "string")
        objId = ObjectId.createFromHexString(id);
    const univ = await universityCollection.findOne({ _id: objId });
    if (univ === null) throw 'No univ with that id';
    return univ;
}
async function getDeadline(title,course,intake)
{
    
    const universityCollection = await universities();
    if(title == null && course ==null && intake== null)
    {
        throw "Any one argument must be given to get deadline";
    }
        if(title)
        {
       title=title.toLowerCase();
       if(typeof title != 'string')
        throw "Title must be string";
        }
       if (course)
       {
       course=course.toLowerCase();
       if(typeof course != 'string')
       throw "Course must be string";
       
       }
       if (intake)
       {
        if(typeof title != 'string')
        throw "Title must be string";
       intake=intake.toLowerCase();
       }
       
       if (title != null && course != null && intake !=null)
        {
         const univ = await universityCollection.find({ title: title,courses: course,intake: intake}).toArray();
        
        if (univ === null || univ.length<1) throw 'No univ with that id';
        
        return univ;
        }
        if (title != null && course != null )
        {
        const univ = await universityCollection.find({ courses: course,title: title }).toArray();
        if (univ === null || univ.length<1) throw 'No univ with that id';
        return univ;
        }
        if (title != null  && intake !=null)
        {
        const univ = await universityCollection.find({ intake: intake,title: title }).toArray();
        if (univ === null || univ.length<1) throw 'No univ with that id';
        return univ;
        }
        if (course != null && intake !=null)
        {
        const univ = await universityCollection.find({ courses: course,intake: intake }).toArray();
        if (univ === null || univ.length<1) throw 'No univ with that id';
        return univ;
        }
        if (course != null )
        {
        const univ = await universityCollection.find({ courses: course }).toArray();
        if (univ === null || univ.length<1) throw 'No univ with that id';
        return univ;
        }
        if (intake !=null)
        {
          
        const univ = await universityCollection.find({intake: intake}).toArray();
        if (univ === null || univ.length<1) throw 'No univ with that id';
        return univ;
        }
        if (title != null)
        {
        const univ = await universityCollection.find({ title: title }).toArray();
        if (univ === null || univ.length<1) throw 'No univ with that id';
        return univ;
        }
}
async function getUniversityFinder(course,score,exp,gpa,papers)
{
    
    if(!course)
    throw "courses is required";
    if(typeof course != 'string')
    throw "Course must be string";
    
    if(!score)
    throw "score is required";
   
    if((typeof score != 'number') || (score<280 || score>320))
    throw "score must be number >280 and lessthan 320";
    
    if(!exp)
    throw "exp is required";
    if(typeof exp != 'number')
    throw "exp must be number";
    
    if(!gpa)
    throw "gpa is required";
    if((typeof gpa != 'float' && typeof gpa !='number') || (gpa<0 || gpa>4))
    throw "GPA must be number >0 and less than 4";
    
   
    if(!papers)
    throw "papers is required";
    if(typeof papers != 'number')
    throw "papers must be number";
    
    course=course.toLowerCase();
    const universityCollection = await universities();  
    const univ = await universityCollection.find({courses: course,averagescore:{$lte:score},workexp: {$lte:exp},GPA:{$lte:gpa},papers:{$lte:papers}}).toArray();
    
    if (univ === null || univ.length<1) throw 'No univ with matching values';
	return univ;
}
async function getUniversityFrontpageFinder(course,name)
{
    if(!course)
    throw "courses is required";
    if(!name)
    throw "name is required";
    if(typeof course != 'string')
    throw "course must be string";
    if(typeof name != 'string')
    throw "Title must be string";
     name=name.toLowerCase();
    course=course.toLowerCase();
    const universityCollection = await universities();  
    const univ = await universityCollection.find({courses: course,title: name}).toArray();
    if (univ === null || univ.length<1) throw 'No univ with matching values';
	return univ;
}
async function getTopTrendingUniv()
{
    const universityCollection = await universities();  
    const univ = await universityCollection.find({rank: {$lte:4}}).toArray();
    return univ;
}

async function getChances(title,score)
{
    if(!title)
    throw "Title is required to get chances";
    if(!score)
    throw "Score is required to get chances";
    if(typeof title != 'string')
    throw "Title must be string";
    if((typeof score != 'number') || (score<280 || score>320))
    throw "score must be number >280 and lessthan 320";
    
    const universityCollection = await universities();  
    const univ = await universityCollection.findOne({title: title});
    if (univ.averagescore<=score)
    {
        return "Safe";
    }
    else if(univ.averagescore>score)
    {
        if((univ.averagescore-score)<=9)
        {
            return "Moderate";
        }
        else{
            return "Ambitious";
        }
    }
}


module.exports = {addUniversity,getAllUniversity,getUniversity,getUniversityFinder,getDeadline,getUniversityFrontpageFinder,getTopTrendingUniv,getChances};