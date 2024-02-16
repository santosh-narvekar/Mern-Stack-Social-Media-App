
export const fileUpload = (e,setData,data)=>{
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
            setData({...data,[e.target.name]:event.target.result})
            }
            
            fileReader.readAsDataURL(e.target.files[0]);
      }