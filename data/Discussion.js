const mongoCollections = require('../config/mongoCollections');
const DiscussionTopic = mongoCollections.DiscussionTopic;
const DiscussionComment = mongoCollections.DiscussionComment;
const { ObjectId } = require('mongodb');

async function addDiscussionTopic(title)
{
   if(!title)
    throw "Discussion Topic is required";
    const DiscussionTopicCollection = await DiscussionTopic();
    let newDT = {
        title: title,
        comments: []    
    };  
    const insertInfo = await DiscussionTopicCollection.insertOne(newDT);
    if (insertInfo.insertedCount === 0) 
        throw 'Could not add Discussion Topic';
    const newId = insertInfo.insertedId;
    let dt = await this.getDiscussionTopic(newId);        
	return dt;
}
async function getDiscussionTopic(id)
{
    if(!id)
    throw "Discussion Topic Id is required";
    const DiscussionTopicCollection = await DiscussionTopic();
    let objId=id;
    if (typeof id == "string")
    objId = ObjectId.createFromHexString(id);
    const dt = await DiscussionTopicCollection.findOne({ _id: objId });
    if (dt === null) throw 'No Discussion topic with matching id';
    const comment_detail =await getDiscussionComment_topicid(id);
    dt.comments=comment_detail;
    return dt;
}
async function addDiscussionComment(Comments,Dt_Id)
{
   
    if(!Comments)
    throw "Discussion Comments is required";
    if(!Dt_Id)
    throw "Discussion Topic Id is required";
    const DiscussionCommentCollection = await DiscussionComment();
    let newDT = {
        Comments: Comments,
        Dt_Id: Dt_Id
       
    };
    
    const insertInfo = await DiscussionCommentCollection.insertOne(newDT);
    if (insertInfo.insertedCount === 0) 
        throw 'Could not add Discussion Comment';
    const newId = insertInfo.insertedId;
    let dt = await this.getDiscussionComment(newId);        
	return dt;

}
async function getDiscussionComment(id)
{
    if(!id)
    throw "Discussion comment Id is required";
    const DiscussionCommentCollection = await DiscussionComment();
    let objId=id;
    if (typeof id == "string")
    objId = ObjectId.createFromHexString(id);
    const dt = await DiscussionCommentCollection.findOne({ _id: objId });
    if (dt === null) throw 'No Discussion comment  with matching topic id';
    return dt;
}
async function getDiscussionComment_topicid(id)
{

    if(!id)
    throw "Discussion Topic Id is required";
    const DiscussionCommentCollection = await DiscussionComment();
    let objId=id;
    const dt = await DiscussionCommentCollection.find({Dt_Id: objId }).toArray();
    if (dt === null || dt.length<1) throw 'No Discussion comment  with matching topic id';
    return dt;
}
async function getAllTopics()
{
    const DiscussionTopicCollection = await DiscussionTopic();

    const DtList = await DiscussionTopicCollection.find({}).toArray();
    for (var i=0;i<DtList.length;i++)
    {
        const comment_detail = await getDiscussionComment_topicid(DtList[i]._id.toString());
        DtList[i].comments=comment_detail;
    }
    if (DtList === null || DtList.length<1) throw 'No Discussion Topic with matching values';
    return DtList;
}
async function getAllComments()
{
    const DiscussionCommentCollection = await DiscussionComment();

    const DcList = await DiscussionCommentCollection.find({}).toArray();
    if (DcList === null || DcList.length<1) throw 'No Discussion comments with matching values';
    return DcList;
}

module.exports = {getAllComments,getAllTopics,getDiscussionComment_topicid,getDiscussionComment,addDiscussionComment,getDiscussionTopic,addDiscussionTopic};