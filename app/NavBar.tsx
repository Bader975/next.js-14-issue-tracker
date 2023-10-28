"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaBug } from 'react-icons/fa';
import classNames from 'classNames';


interface navLinksProps {
    lable: string;
    href: string;
};

export default function NavBar() {

    const activePath = usePathname();

    const navLinks: navLinksProps[] = [{
        lable: 'Dashboard',
        href: '/'
    },
    {
        lable: 'Issues',
        href: '/issues'
    }
    ];

    return (
        <nav className='flex gap-5 border-b mb-6 px-5 h-16 items-center'>
            <Link href='/'><FaBug size={24} /></Link>

            <ul className='flex space-x-8'>

                {navLinks.map((link, index) =>

                    <Link key={index} className={classNames({
                        'text-zinc-900': link.href == activePath,
                        'text-zinc-500': link.href !== activePath,
                        'hover:text-zinc-800 transition-colors': true
                    })} href={link.href}>{link.lable}</Link>
                )}
            </ul>

        </nav>
    )
}
