
export const getPostTime=(createdAt)=>{
  let convertedCurData = new Date(Math.floor(Date.now()/1000)) 
  let postCreatedDate = new Date(createdAt);
  let postCreatedInfo = Math.floor(postCreatedDate.getTime()/1000);
  let result = Math.abs(postCreatedInfo - convertedCurData);
  let divisionResult = Math.floor(result/3600);
  return divisionResult
}