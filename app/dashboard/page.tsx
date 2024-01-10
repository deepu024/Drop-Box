import DragZone from '@/components/DragZone'
import { db } from '@/firebase';
import { FileType } from '@/typings';
import { auth } from '@clerk/nextjs'
import { collection, getDocs } from 'firebase/firestore';
import React from 'react'

const DashBoard = async () => {
  const { userId } = auth();
  const docResults = await getDocs(collection(db, 'users', userId!, 'files'))
  const data: FileType[] = docResults.docs.map(doc => ({
    userId: doc.data().userId,
    id: doc.id,
    downloadUrl: doc.data().downloadUrl,
    addedDate: doc.data().addedDate,
    fileName: doc.data().fileName,
    fileSize: doc.data().fileName,
    fileType: doc.data().fileType,
    fullName: doc.data().fullName,
    profileImage: doc.data().profileImage
  }))

  return (
    <div>
      <DragZone />
      
    </div>
  )
}

export default DashBoard