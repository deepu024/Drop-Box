import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
  return (
    <div>
      <div className='flex lg:flex-row flex-col bg-[#2B2929]'>
        <div className='flex flex-col flex-1 p-10 gap-4 md:justify-between'>
          <h1 className='text-5xl font-bold text-[#4C8FFF]'>Wellcome to Dropbox</h1>
          <p className='text-white text-3xl tracking-wider font-semibold'>Everything you and your business need to work efficiently, all in one place</p>
          <p className='text-white text-lg font-light'>Collaborate seamlessly and deliver work faster from anywhere with Dropbox. Securely store your content, edit PDFs, share videos, sign documents and track file engagement - without leaving Dropbox.</p>
          <Link href={"/dashboard"} className='flex bg-[#3983FF] transition-all hover:bg-[#3982ffc3] w-fit p-5 gap-3 font-semibold'>
            Try it for Free <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>

          </Link>
        </div>
        <div className='flex-1 bg-[#1E1919] flex justify-center items-center'>
          <video loop autoPlay muted className=' p-10'>
            <source src="/drop-box-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className='flex flex-col items-center p-5 gap-5'>
        <h1 className='text-3xl'>Details</h1>
        <p className='text-center'>Hello My name is Deepanshu Sharma I am a Full Stack Developer. Crafting Innovative Solutions with a Passion for Clean Code & Exceptional User Experiences 😎✨ #TechInnovator #ProblemSolver</p>
      </div>
    </div>
  )
}
