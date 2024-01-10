"use client";
import { FileType } from '@/typings'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { DataTable } from './Table'
import { columns } from './columns'
import { useUser } from '@clerk/nextjs'
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, getFirestore, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase/page';
import { Skeleton } from "@/components/ui/skeleton"

const TableWrapper = ({ skeletonFiles }: { skeletonFiles: FileType[] }) => {

  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState<FileType[]>(skeletonFiles);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [value, loading, error] = useCollection(
    user &&
    query(collection(db, "users", user.id, "files"), orderBy("addedDate", sort))
  );

  useEffect(() => {
    if (!value) return;

    const files = value.docs.map((doc) => ({
      userId: doc.data().userId,
      id: doc.id,
      downloadUrl: doc.data().downloadUrl,
      addedDate: new Date(doc.data().addedDate?.seconds * 1000) || undefined,
      fileName: doc.data().fileName,
      fileSize: doc.data().fileSize,
      fileType: doc.data().fileType,
      fullName: doc.data().fullName,
      profileImage: doc.data().profileImage
    }));
    setInitialFiles(files);
  }, [value])

  if (value?.docs.length === undefined) return (
    <div className='flex flex-col'>
      <Button variant={'outline'} className='ml-auto w-36 h-10 mb-5'>
        <Skeleton className='h-full w-full' />
      </Button>
      <div className='border rounded-lg'>
        <div className='border-b h-12' />
        {
          skeletonFiles.map((file) => (
            <div className='flex items-center space-x-4 p-5 w-full' key={file.id}>
              <Skeleton className='w-12 h-12' />
              <Skeleton className='w-full h-12' />
            </div>
          ))
        }
        {
          skeletonFiles.length === 0 && (
            <div className='flex items-center space-x-4 p-5 w-full'>
              <Skeleton className='w-12 h-12' />
              <Skeleton className='w-full h-12' />
            </div>
          )
        }
      </div>
    </div>
  )

  return (
    <div className='flex flex-col space-y-5 pb-10'>
      <Button
        variant={"outline"}
        className='ml-auto w-fit'
        onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
      >Sort By {sort === 'desc' ? "Newest" : "Oldest"}</Button>
      <DataTable columns={columns} data={initialFiles} />
    </div>
  )
}

export default TableWrapper