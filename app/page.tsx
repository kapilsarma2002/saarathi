'use client'
import { useDeityStore } from '@/store/deityStore'
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const setDeity = useDeityStore((state) => state.setDeity)
  
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Image
        src="/ramakrishna.jpeg"
        alt="Ramakrishna"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-full"
      />
      
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Link href="/chat" onClick={() => setDeity('krishna')}>
          <button className="text-black text-xl bg-white/40 hover:bg-white px-6 py-3 rounded-r-lg shadow-lg transition-all">
            Krishna
          </button>
        </Link>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <Link href="/chat" onClick={() => setDeity('rama')}>
          <button className="text-black text-xl bg-white/40 hover:bg-white px-6 py-3 rounded-l-lg shadow-lg transition-all">
            Rama
          </button>
        </Link>
      </div>
    </div>
  )
}