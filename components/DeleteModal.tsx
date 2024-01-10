"use client";
import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useAppStore } from "@/store/store";
import { FileType } from "@/typings";
import { useUser } from "@clerk/nextjs";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "@/lib/firebase/page";
import toast from "react-hot-toast";
import { deleteDoc, doc } from "firebase/firestore";

export function DeleteModal() {
    const { user } = useUser();
    const [setIsDeleteModalOpen, isDeleteModalOpen, fileId] = useAppStore(state => [state.setIsDeleteModalOpen, state.isDeleteModalOpen, state.fileId]);

    async function deleteFile() {
        if(!user || !fileId) return ;

        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

        deleteObject(fileRef).then(async () => {
            await deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
                toast.success("File Deleted")
            });
        }).catch(() => {
            toast.error("Someting went wrong")
        })
        setIsDeleteModalOpen(false)
    }

    return (
        <Dialog
            open={isDeleteModalOpen}
            onOpenChange={(isOpen) => {
                setIsDeleteModalOpen(isOpen)
            }}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your file!
                    </DialogDescription>
                </DialogHeader>
                <div className="flex space-x-2 py-3">
                    <Button
                        size={"sm"}
                        className="px-3 flex-1"
                        variant={"ghost"}
                        onClick={() => setIsDeleteModalOpen(false)}
                    >
                        <span className="sr-only">Cancel</span>
                        <span>Cancel</span>
                    </Button>
                    <Button
                        size={"sm"}
                        className="px-3 flex-1"
                        type="submit"
                        onClick={() => deleteFile()}
                    >
                        <span className="sr-only">Delete</span>
                        <span>Delete</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
