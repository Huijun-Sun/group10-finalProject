const mongoCollections = require('../config/mongoCollections');
const discussionTopic = mongoCollections.discussionTopic;
const discussionComment = mongoCollections.discussionComment;
const { ObjectId } = require('mongodb');

async function addDiscussionTopic(title,username)
{
   if(!title)
    throw "Discussion Topic is required";
    if(!username)
    throw "username is required";
    const discussionTopicCollection = await discussionTopic();
    let newDt = {
        title: title,
        comments: [],
        username: username 
           
    };  
    const insertInfo = await discussionTopicCollection.insertOne(newDt);
    if (insertInfo.insertedCount === 0) 
        throw 'Could not add Discussion Topic';
    const newId = insertInfo.insertedId;
    let dt = await this.getDiscussionTopic(newId);        
	return dt;
}
async function getDiscussionTopic(Id)
{
    if(!Id)
    throw "Discussion Topic Id is required";
    const discussionTopicCollection = await discussionTopic();
    let objId=Id;
    if (typeof Id == "string")
    objId = ObjectId.createFromHexString(Id);
    const dt = await discussionTopicCollection.findOne({ _id: objId });
    if (dt === null) throw 'No Discussion topic with matching id';
    if (dt.Comments!=null)
    {
    const commentDetail =await getDiscussionCommentTopicId(Id);
    dt.comments=commentDetail;}
    return dt;
}
async function addDiscussionComment(Comments,dtId,username)
{
   
    if(!Comments)
    throw "Discussion Comments is required";
    if(!dtId)
    throw "Discussion Topic Id is required";
    if(!username)
    throw "username is required";
    const discussionCommentCollection = await discussionComment();
    let newDt = {
        Comments: Comments,
        dtId: dtId,
        username: username
       
    };
    const insertInfo = await discussionCommentCollection.insertOne(newDt);
    if (insertInfo.insertedCount === 0) 
        throw 'Could not add Discussion Comment';
    const newId = insertInfo.insertedId;
    let dt = await this.getDiscussionComment(newId);        
	return dt;

}
async function getDiscussionComment(Id)
{
   
    if(!Id)
    throw "Discussion comment Id is required";
    const discussionCommentCollection = await discussionComment();
    let objId=Id;
    if (typeof Id == "string")
    objId = ObjectId.createFromHexString(Id);
    const dt = await discussionCommentCollection.findOne({ _id: objId });
    if (dt === null) throw 'No Discussion comment  with matching topic id';
    return dt;
}
async function getDiscussionCommentTopicId(Id)
{

    if(!Id)
    throw "Discussion Topic Id is required";
    const discussionCommentCollection = await discussionComment();
    let objId=Id;
    const dt = await discussionCommentCollection.find({dtId: objId }).toArray();
    if (dt === null || dt.length<1) throw 'No Discussion comment  with matching topic id';
    return dt;
}
async function getAllTopics()
{
    
    const discussionTopicCollection = await discussionTopic();
    const dtList = await discussionTopicCollection.find({}).toArray();
    for (var i=0;i<dtList.length;i++)
    {
        const commentDetail = await getDiscussionCommentTopicId(dtList[i]._id.toString());
        dtList[i].comments=commentDetail;
        
    }
    if (dtList === null || dtList.length<1) throw 'No Discussion Topic with matching values';
    return dtList;
}
async function getAllComments()
{
    const discussionCommentCollection = await discussionComment();
    const dcList = await discussionCommentCollection.find({}).toArray();
    if (dcList === null || dcList.length<1) throw 'No Discussion comments with matching values';
    return dcList;
}

module.exports = {getAllComments,getAllTopics,getDiscussionCommentTopicId,getDiscussionComment,addDiscussionComment,getDiscussionTopic,addDiscussionTopic};