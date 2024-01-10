"use client";
import { db, storage } from '@/firebase';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import toast from 'react-hot-toast';

const DragZone = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const { user, isSignedIn, isLoaded } = useUser();

    // 20 mb max size
    const maxFileSize = 20971520;

    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach(async (file: File) => {
            const reader = new FileReader();
            reader.onabort = () => console.log("File reading was abort!")
            reader.onerror = () => console.log("File reading has failed!")
            reader.onload = async () => {
                await uploadImage(file);
            }
            reader.readAsArrayBuffer(file);
        })
    }

    const uploadImage = async (image: File) => {
        if (loading) return;
        if (!user) return;
        setLoading(true);
        toast.loading("File Uploading...")
        const collectionRef = collection(db, "users", user.id, "files");
        const docRef = await addDoc(collectionRef, {
            "fileName": image.name,
            "addedDate": serverTimestamp(),
            "fileSize": image.size,
            "userId": user!.id,
            "fullName": user!.fullName,
            "fileType": image.type,
            "profileImage": user!.imageUrl
        });
        const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`)
        await uploadBytes(imageRef, image).then(async (snapshot) => {
            const downloadUrl = await getDownloadURL(imageRef);
            await updateDoc(docRef, {
                downloadUrl: downloadUrl
            }).then(() => {
                toast.dismiss()
                toast.success("File uploaded Successfully")
            }).catch(() => {
                toast.dismiss()
                toast.error("Something went wrong!")
            })
        })
        setLoading(false);
    }

    return (
        <Dropzone minSize={0} maxSize={maxFileSize} onDrop={acceptedFiles => onDrop(acceptedFiles)}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject, fileRejections }) => {
                const isFileToLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxFileSize;
                return (
                    <section className='m-5'>
                        <div {...getRootProps()} className={cn(
                            "w-full h-52 flex justify-center items-center p-5 border-dashed border rounded-lg text-center",
                            isDragActive ? "bg-[#035FFE] text-white animate-pulse" : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
                        )}>
                            <input {...getInputProps()} />
                            {!isDragActive && "Click here or drag a file to upload!"}
                            {isDragActive && !isDragReject && "Drop to upload this file!"}
                            {isDragReject && "File type not accepted, sorry!"}
                            {
                                isFileToLarge && (
                                    <div className='text-red-500 mt-2'>
                                        File is too large.
                                    </div>
                                )
                            }
                        </div>
                    </section>
                )
            }}
        </Dropzone>
    )
}

export default DragZone

function async(): ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null {
    throw new Error('Function not implemented.');
}
