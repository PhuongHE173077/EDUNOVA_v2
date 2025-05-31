'use client'

import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';
import { selectedCurrentUser } from '@/lib/redux/user/user.slide';
import { Tooltip } from '@mui/material';
import { UserCircleIcon, UserPlusIcon } from 'lucide-react';

export default function ChatDialog({ open, setOpen }: any) {
    const currentUser = useSelector(selectedCurrentUser);

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
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex gap-3 items-start p-4 hover:bg-gray-100 cursor-pointer">
                                    <Avatar>
                                        <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 5}`} />
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Tên liên hệ {i + 1}</p>
                                        <p className="text-xs text-gray-500 mt-1">Tin nhắn gần đây...</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Chat Window */}
                    <div className="md:w-2/3 w-full flex flex-col">
                        <div className="flex items-center p-3 border-b bg-gray-100">
                            <Avatar>
                                <AvatarImage src="https://i.pravatar.cc/150?img=10" />
                            </Avatar>
                            <div className="ml-3">
                                <p className="text-sm font-semibold">New Movie! Expendables 4</p>
                                <p className="text-xs text-gray-500">Andrés, Tom, Harrison...</p>
                            </div>
                        </div>
                        <div className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50">
                            <div className="bg-white p-3 rounded shadow text-sm">
                                <p className="font-semibold text-teal-600">Sylvester Stallone</p>
                                <p className="mt-1">Hi everyone! Glad you could join!</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded shadow text-sm self-end">
                                <p className="mt-1">Hi guys.</p>
                            </div>
                        </div>
                        <div className="p-3 border-t bg-white flex items-center gap-3">
                            <input className="flex-1 border rounded px-3 py-2 text-sm" placeholder="Nhập tin nhắn..." />
                            <Button size="sm">Gửi</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
