'use client'

import React, { useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';
import { selectedCurrentUser } from '@/lib/redux/user/user.slide';
import { Tooltip } from '@mui/material';
import { MessageSquareIcon, UserCircleIcon, UserPlusIcon } from 'lucide-react';
import { useAppDispatch } from '@/lib/redux/store';
import { activeConversation, createMessage, fetchConversations, fetchMessages, updateConversations, updateMessages } from '@/lib/redux/chat/chat.slide';
import { formatDistanceToNow } from 'date-fns';
import { vi } from "date-fns/locale/vi"
import { socket } from '@/lib/socket';

export default function ChatDialog({ open, setOpen }: any) {
    const currentUser = useSelector(selectedCurrentUser);
    const { messages, conversations, selectedUser, isUsersLoading, isMessagesLoading } = useSelector((state: any) => state.chat)
    const [text, setText] = React.useState('');
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchConversations())
        socket.on("conversation", (data) => {
            if (conversations.find((conversation: any) => conversation?._id === data.conversationId)) {
                dispatch(fetchConversations())
            }
        })
        socket.on("message", (data) => {
            if (selectedUser?._id === data.conversationId) {
                dispatch(updateMessages(data.messages))
            }
        })

        return () => {
            socket.off("conversation")
            socket.off("message")
        }

    }, []);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const timeAgo = (time: any) => {
        return formatDistanceToNow(new Date(time), { addSuffix: true, locale: vi })
    }

    const handleChatClick = (conversation: any) => {
        dispatch(activeConversation(conversation))
        dispatch(fetchMessages(conversation?._id))
    }

    const handSubmit = () => {
        dispatch(createMessage({ cid: selectedUser?._id, data: { text } }))
        setText('')
    }
    if (!currentUser) return null

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-full max-w-[95vw] md:max-w-5xl p-0 overflow-hidden">
                <DialogTitle asChild>
                    <h2 className="text-2xl font-semibold px-4 pt-4">Chat</h2>
                </DialogTitle>
                <div className="flex flex-col md:flex-row h-[80vh] md:h-[600px] border rounded">
                    {/* Left Sidebar */}
                    <div className="md:w-1/3 w-full border-b md:border-b-0 md:border-r flex flex-col">
                        <div className="flex items-center justify-between p-3 bg-gray-100">
                            <div className='flex items-center'>
                                <Avatar>
                                    <AvatarImage src={currentUser?.avatar} />
                                    <AvatarFallback>{currentUser?.displayName?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="ml-3">
                                    <p className="text-sm font-semibold">{currentUser?.displayName}</p>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <p className="text-xs text-gray-500">Online</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Tooltip title='Thêm người liên hệ'>
                                    <Button variant='ghost'>
                                        <UserPlusIcon className='w-4 h-4' />
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="p-2 bg-gray-50">
                            <input type="text" placeholder="Search or start new chat" className="w-full px-3 py-2 border rounded text-sm" />
                        </div>
                        <div className="flex-1 overflow-auto divide-y">
                            {conversations.map((conversation: any, i: number) => (
                                <div key={i} className="flex justify-between hover:bg-gray-100 cursor-pointer " onClick={() => handleChatClick(conversation)}>
                                    <div className="flex gap-3 items-start p-4 ">
                                        {conversation.isGroup ? <Avatar>
                                            <AvatarImage src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-p6v3CNt8FVNFh0cbu1p2tRLrpIW_O4aj7A&s'} alt={conversation.name} />
                                            <AvatarFallback>{conversation.name}</AvatarFallback>
                                        </Avatar> :
                                            <Avatar>
                                                <AvatarImage src={conversation.members.find((member: any) => member?._id !== currentUser?._id).avatar} alt={conversation.members.find((member: any) => member._id !== currentUser._id).displayName} />
                                                <AvatarFallback>{conversation.members.find((member: any) => member?._id !== currentUser?._id).displayName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        }
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{conversation.isGroup ? conversation.name : conversation.members.find((member: any) => member?._id !== currentUser?._id).displayName}</p>
                                            <p className="text-xs text-gray-500 mt-1">{conversation.lastMessageId ? conversation.lastMessage.text : ''}</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className='text-xs text-gray-500 '>
                                            {timeAgo(conversation.updatedAt).replace(/^khoảng\s+/i, "")}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Chat Window */}
                    <div className="md:w-2/3 w-full flex flex-col">
                        {!selectedUser ?
                            <div className="flex justify-center items-center h-full bg-gray-50">
                                <div className="flex flex-col items-center space-y-3 p-6  rounded-xl ">
                                    <MessageSquareIcon className="w-10 h-10 text-blue-500" />
                                    <h3 className="text-xl font-semibold text-gray-800">Welcome to EduNova</h3>
                                    <p className="text-sm text-gray-500 text-center max-w-xs">
                                        Please select a chat on the left panel to start messaging your students or colleagues.
                                    </p>
                                </div>
                            </div>

                            :
                            <>
                                <div className="flex items-center p-3 border-b bg-gray-100">
                                    {selectedUser.isGroup ? <Avatar>
                                        <AvatarImage src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-p6v3CNt8FVNFh0cbu1p2tRLrpIW_O4aj7A&s'} alt={selectedUser.name} />
                                        <AvatarFallback>{selectedUser.name}</AvatarFallback>
                                    </Avatar> :
                                        <Avatar>
                                            <AvatarImage src={selectedUser.members.find((member: any) => member._id !== currentUser._id).avatar} alt={selectedUser.members.find((member: any) => member._id !== currentUser._id).displayName} />
                                            <AvatarFallback>{selectedUser.members.find((member: any) => member._id !== currentUser._id).displayName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    }
                                    <div className="ml-3">
                                        <p className="text-sm font-semibold">{selectedUser.isGroup ? selectedUser.name : selectedUser.members.find((member: any) => member._id !== currentUser._id).displayName}</p>
                                        <p className="text-xs text-gray-500">{selectedUser.isGroup ? `${selectedUser.members.length + selectedUser.owners.length} thành viên ` : 'truy cập 15 phút trước'}</p>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50">
                                    {messages?.map((message: any, i: number) => (
                                        <div className="bg-white p-3 rounded shadow text-sm" key={i}>
                                            <p className="font-semibold text-teal-600">{message?.sender?.displayName}</p>
                                            <p className="mt-1">{message?.text}</p>
                                        </div>
                                    ))}
                                    <div ref={bottomRef} />
                                </div>
                                <div className="p-3 border-t bg-white flex items-center gap-3">

                                    <input className="flex-1 border rounded px-3 py-2 text-sm" placeholder="Nhập tin nhắn..." value={text} onChange={(e) => setText(e.target.value)} />
                                    <Button size="sm" onClick={() => handSubmit()}>Gửi</Button>
                                </div>
                            </>}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
