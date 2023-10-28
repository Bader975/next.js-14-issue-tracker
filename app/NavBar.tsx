import Link from 'next/link'
import React from 'react'
import { FaBug } from 'react-icons/fa';
export default function NavBar() {

    const navLinks = [{
        lable: 'Dashboard',
        href: '/'
    },
    { lable: 'Issues', href: '/issues' }]

    return (
        <nav className='flex gap-5 border-b mb-6 px-5 h-16 items-center'>
            <Link href='/'><FaBug size={24} /></Link>

            <ul className='flex gap-5'>
                {navLinks.map((link, index) =>
                    <Link key={index} className='text-gray-500 hover:text-black transition-colors ' href={link.href}> {link.lable}</Link>
                )}

                {/* <li><Link className='' href='/issues'> Issues</Link></li> */}
            </ul>
        </nav>
    )
}
