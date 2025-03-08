import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './LoadingSkeleton/MessageSkeleton';

const ChatContainer = () => {

  const{ messages, getMessages, isMessagesLoading, selectedUser} = useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);  //we are using id bcz getMessages is expecting a userId
  }, [selectedUser._id, getMessages]); //we are passing selectedUser._id as dependency so that whenever selectedUser changes we will get the messages of the new selected user as the getMessages is called again

  if(isMessagesLoading) {
    return(
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  )}

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />

      <p>messagews</p>

      <MessageInput/>

    </div>
  )
}

export default ChatContainer