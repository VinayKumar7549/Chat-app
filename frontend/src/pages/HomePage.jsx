import React from 'react'
import { useChatStore } from '../store/useChatStore'

import Sidebar from '../components/SideBar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';


// const HomePage = () => {

//   const { selectedUser } = useChatStore();

//   return (
//     <div className='h-screen bg-base-200'>
//       <div className='flex items-center justify-center pt-20 px-4'>
//         <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8em)]'>
//           <Sidebar />

//           {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default HomePage
const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8em)] flex">
          {/* Sidebar should take its space and not break the layout */}
          <Sidebar />

          {/* Ensure chat content takes the remaining space */}
          <div className="flex-1">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage