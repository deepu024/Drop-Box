import { RedirectToSignIn, SignIn, SignInButton, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ThemeToggler } from './ThemeToggler'

const Header = () => {
    return (
        <header className='flex bg-white dark:bg-[#020817] z-10 items-center justify-between border-b-[1px] sticky top-0 w-full shadow-md'>
            <Link href={'/'}>
                <div className='flex items-center gap-3'>
                    <Image
                        src={"/drop-box-logo.png"}
                        alt='Drop Box'
                        width={50}
                        height={50}
                    />
                    <p className='text-xl font-bold'>DropBox</p>
                </div>
            </Link>

            <div className='px-5 flex items-center gap-2'>
                <ThemeToggler />
                <UserButton afterSignOutUrl='/' />
                <SignedOut>
                    <SignInButton afterSignInUrl='/dashboard' />
                </SignedOut>
            </div>
        </header>
    )
}

export default Header