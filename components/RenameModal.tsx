"use client"
import { useAppStore } from '@/store/store';
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/page';
import toast from 'react-hot-toast';

const RenameModal = () => {
    const [input, setInput] = useState<string>("");
    const { user } = useUser();

    const [isRenameModalOpen, setIsRenameModalOpen, fileId, setFileName, fileName] = useAppStore(state => [
        state.isRenameModalOpen,
        state.setIsRenameModalOpen,
        state.fileId,
        state.setFileName,
        state.fileName,
    ]);

    async function renameFile(){
        if(!user || !fileId) return;

        if(input.length > 0){
            await updateDoc(doc(db, "users", user.id, "files", fileId), {
                fileName: input
            }).then(() => {
                toast.success("File Name Changed")
            })
        }else {
            toast.error("File name cannot be Empty!")
        }
        setIsRenameModalOpen(false)
    }

    return (
        <Dialog
            open={isRenameModalOpen}
            onOpenChange={(isOpen) => [
                setIsRenameModalOpen(isOpen)
            ]}
        >
            <DialogContent>
                <DialogTitle className='pb-2'>Rename the file</DialogTitle>
                <Input 
                    id={"link"}
                    defaultValue={fileName}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDownCapture={(e) => {
                        if(e.key === 'Enter'){
                            renameFile(); 
                        }
                    }}
                />
                <div className="flex space-x-2 py-3">
                    <Button
                        size={"sm"}
                        className="px-3 flex-1"
                        variant={"ghost"}
                        onClick={() => setIsRenameModalOpen(false)}
                    >
                        <span className="sr-only">Cancel</span>
                        <span>Cancel</span>
                    </Button>
                    <Button
                        size={"sm"}
                        className="px-3 flex-1"
                        type="submit"
                        onClick={() => renameFile()}
                    >
                        <span className="sr-only">Rename</span>
                        <span>Rename</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RenameModal