'use client';
import axios from 'axios';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TextField, Button, Callout } from '@radix-ui/themes';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react'


interface IssueFrimInputs {
    title: string;
    description: string;
}
export default function newIssue() {
    const [error, setError] = useState('');
    // router
    const router = useRouter()
    // React From Hook
    const { register, control, handleSubmit } = useForm<IssueFrimInputs>();

    // submit form handler
    const handleNewIssue = async (data: any) => {
        const { title, description } = data;
        try {
            const newIssue = await axios.post('/api/issues', {
                title,
                description
            }
            )

            if (newIssue) {
                router.push('/issues');
            }
        }
        catch (err) {
            setError('An Unexpected error occurred');
        }


    }

    return (
        <div className='max-w-[80%] '>
            {error && <Callout.Root color="red" role="alert">
                <Callout.Icon>
                    <ExclamationTriangleIcon />
                </Callout.Icon>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>
            }
            <form className="space-y-2 mt-3" onSubmit={handleSubmit((data) => handleNewIssue(data))}>
                <TextField.Root>
                    <TextField.Input placeholder="Title" {...register('title')} />
                </TextField.Root>
                <Controller name='description' control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description ..." {...field} />}
                />
                <Button>Submit</Button>
            </form>
        </div>
    )
}
