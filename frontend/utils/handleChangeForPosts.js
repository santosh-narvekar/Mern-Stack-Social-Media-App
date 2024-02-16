import { toast } from "react-toastify";
import { fileUpload } from "./FileUpload";

export const handleChangeForPosts = (e,data,setData)=>{
    e.preventDefault();

    if(e.target.name==='resource'){
      if(e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png' 
      ||e.target.files[0].type === 'video/mp4')
      {
        fileUpload(e,setData,data);
      }else{
        toast.error('only jpg or png or mp4 files allowed');
      }
    }
    setData({...data,[e.target.name]:e.target.value});
}