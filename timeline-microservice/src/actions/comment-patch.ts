import Comment from '../model-comment';
import {isValidContent, isValidPhoto, isValidTime, isValidUser} from '../utils';


export default async (msg, reply) => {
  const { commentId, content, photoId, timestamp, userId } = msg;
  let res;
  try{
    res = await Comment.retrieveById(commentId);
  } catch(e){
    reply(e,null);
    return;
  }

  try{
    await isValidContent(content);
    res.content = content;
  }catch(e){
    reply(e, null);
  }

  try{
    await isValidPhoto(content);
    res.photoId = photoId;
  } catch(e){
    reply(e, null);
  }

  try{
    await isValidUser(userId);
    res.userId = userId;
  } catch(e){}

  try{
    await isValidTime(timestamp);
    res.timestamp = timestamp;
  } catch(e){}

  try{
    res.patch();
    reply(null, { id: commentId });
  } catch(e) {
    reply(e, null);
  }
    
};