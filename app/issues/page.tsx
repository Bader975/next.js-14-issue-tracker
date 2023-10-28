import React from 'react'
import { Flex, Text, Button } from '@radix-ui/themes';
import Link from 'next/link';
export default function IssuesPage() {
    return (
        <div className='text-center'>
            <Button><Link href='/issues/new'>New Issue</Link></Button>
        </div>
    )
}
