// 'use client';
import { TextArea,Button } from '@radix-ui/themes'
import React from 'react'

export default function newIssue() {
    return (
        <div className="max-w-[80%] space-y-2">

            <TextArea placeholder=" Title" size="1" />
            <TextArea placeholder="Description ..." size="3" />
            <Button>Submit</Button>
        </div>
    )
}
