import { useState } from "react";

const startConversation = () => {

  const [selected,setSelected]=useState(false);
  const handleConversation=(e)=>{
    setSelected(!selected)
  }
  return {selected,handleConversation}
}

export default startConversation
