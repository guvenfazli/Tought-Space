import { db } from "@/app/firebaseConfig"
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth } from "@/app/firebaseConfig"
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection } from "firebase/firestore";
import Link from "next/link";
import { useEffect } from "react";

function LastPostRef() {
  const [isUser, isLoading] = useAuthState(auth)

  let userRef = collection(db, "userList", isUser.uid, "lastPosts");
  const [snapshot, dataLoading] = useCollectionData(userRef, { snapshotListenOptions: { includeMetadataChanges: true } })
  



  return (
    <div className="max-h-60 min-h-40 overflow-scroll overflow-x-hidden ">
      {snapshot?.map((post) =>
        <Link href={`/${post.id}`} className="p-3 flex justify-between items-center duration-150 ease-in-out bg-blue-800 mb-3 hover:bg-blue-500 hover:cursor-pointer" key={post.id}>
          <p className="text-sm text-white font-semibold max-lg:text-xs max-lg:text-center">{post.title}</p>
        </Link>
      )}
    </div>
  )
}



export default function LastVisitedPosts() {
  const [isUser, isLoading] = useAuthState(auth)

  if (isUser) {
    return (
      <LastPostRef userId={isUser.uid} />
    )
  }
}
