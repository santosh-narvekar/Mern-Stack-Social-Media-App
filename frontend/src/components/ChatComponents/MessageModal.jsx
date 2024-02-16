import { FaImage } from "react-icons/fa6"
import { useSelector } from "react-redux"

const MessageModal = ({id,message,setMessage,handleImgMessage,handleNewMessage}) => {
  const {buttonLoading}=useSelector(state=>state.loggedIn);
  return (
    <>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
  <div className="modal-box" >
    {
    message?.messageImg?.startsWith(`data:video/mp4`) || message?.messageImg?.includes('/video/upload')?
    <video autoPlay={true} className="w-full h-60 my-5 mb-5">
      <source src={message?.messageImg} type="video/mp4" />
    </video>
    :(message.messageImg?.startsWith('data:image/jpeg') || message?.messageImg?.startsWith('data:image/png')
     || message.messageImg
    )?
    <img src ={message?.messageImg}  className = 'w-full h-60 my-5 mb-5' />
    : <FaImage className='w-full h-40 my-2'/>
    }
    </div>
   <input type='file' name="msg-resource" 
    onChange={handleImgMessage} 
    id="post-resource-message" hidden />
 
    <label htmlFor='post-resource-message' className = "btn btn-neutral my-2">Choose File</label>
    <button  id="btn" className="btn hidden">Close</button>

     <label
        htmlFor="btn"
        className='btn btn-secondary mx-2'
        disabled={buttonLoading || !message?.messageImg}
        onClick={handleNewMessage}
    >SEND MESSAGE</label>

    </div>
  </dialog>
  </>
  )
}

export default MessageModal
