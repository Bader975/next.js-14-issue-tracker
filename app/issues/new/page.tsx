'use client';
import { TextField, Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
export default function newIssue() {
    return (
        <div className="max-w-[80%] space-y-2">

            <TextField.Root>
                <TextField.Input placeholder="Title" />
            </TextField.Root>
            <SimpleMDE placeholder="Description ..." />
            <Button>Submit</Button>
        </div>
    )
}
