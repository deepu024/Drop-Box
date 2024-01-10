import DragZone from '@/components/DragZone'
import TableWrapper from '@/components/table/TableWrapper';
import { db } from '@/lib/firebase/page';
import { FileType } from '@/typings';
import { auth } from '@clerk/nextjs'
import { collection, getDocs } from 'firebase/firestore';
import React from 'react'

const DashBoard = async () => {
  const { userId } = auth();
  const docResults = await getDocs(collection(db, 'users', userId!, 'files'))
  const skeletonFiles: FileType[] = docResults.docs.map(doc => ({
    userId: doc.data().userId,
    id: doc.id,
    downloadUrl: doc.data().downloadUrl,
    addedDate: new Date(doc.data().addedDate?.seconds * 1000) || undefined,
    fileName: doc.data().fileName,
    fileSize: doc.data().fileSize,
    fileType: doc.data().fileType,
    fullName: doc.data().fullName,
    profileImage: doc.data().profileImage
  }))

  return (
    <div>
      <DragZone />
      <section className='container space-y-5'>
        <h1>All Files</h1>
        <div>
            <TableWrapper skeletonFiles={skeletonFiles} />
        </div> 
      </section>
    </div>
  )
}

export default DashBoard