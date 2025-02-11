import React,{useEffect} from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils'
import { useRef } from 'react'

// isMesagesLoading

const ChatContainer = () => {
    const {messages,getMessages,isMessagesLoading,selectedUser,subscribeToMessages,unsubscribeFromMessages} = useChatStore()
    const {authUser} = useAuthStore()
    const messageEndRef = useRef(null)
    
    


    useEffect(() => {
    getMessages(selectedUser._id)

    subscribeToMessages()

    return () => {
        unsubscribeFromMessages();
    }

    
    }, [selectedUser._id,getMessages,subscribeToMessages,unsubscribeFromMessages])

   
    useEffect(() => {
        if(messageEndRef.current && messages){
        messageEndRef.current.scrollIntoView({behavior:"smooth"})
        }
    }, [messages])
    
    if(isMessagesLoading) {
        console.log("message",messages);
        
        return <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader/>
        <MessageSkeleton/>
        <MessageInput/>
    </div>
    }
    
  return (
    <div className="flex-1 flex flex-col overfolw-auto">
        <ChatHeader/>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

            {
                messages.map((msg)=>(
                    <div key={msg._id}
                    className={`flex flex-col  ${msg.senderId === authUser._id ? "items-end": "items-start"} `}
                    ref ={messageEndRef}
                    >
                    <div className="chat-image avatar">
                        <div className="size-10 rounded-full border">
                            <img src={msg.senderId === authUser.id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"} />
                        </div>
                        </div>   
                         <div className="chat-header mb-1">
                            <time className='text-xs opacity-50 ml-1'>
                                {formatMessageTime(msg.createdAt)}
                            </time>
                         </div>
                         <div className="bg-black inline-block p-3 rounded-2xl">
                            {
                                msg.image && (
                                   
                           <>
                            <img src={`${msg.image}` } alt='Attachment' width={200} height={200} className='sm:max-w-[200px] rounded-md mb-2'/>

                            </>

                                )
                            }

                            {msg.text && <p>{msg.text}</p>}
                         </div>
                     </div>
                ))
            }

        </div>

        <MessageInput/>
    </div>
  )
}

export default ChatContainer