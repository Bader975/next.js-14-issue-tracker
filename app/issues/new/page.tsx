'use client';
import axios from 'axios';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TextField, Button, Text, Callout } from '@radix-ui/themes';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { issuesZodSchema } from '../../../zodSchemas/zodSchema'
import { z } from 'zod';

type IssueFrimInputs = z.infer<typeof issuesZodSchema>;

// interface IssueFrimInputs {
//     title: string;
//     description: string;
// }
export default function newIssue() {
    const [error, setError] = useState('');
    // router
    const router = useRouter()
    // React From Hook
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFrimInputs>({
        resolver: zodResolver(issuesZodSchema)
    });
console.log(errors);

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
                {/* errors check */}
                {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
                {/* errors check */}
                <Controller name='description' control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description ..." {...field} />}
                />
                {/* errors check */}
                {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
                {/* errors check */}
                <Button >Submit</Button>
            </form>
            
        </div>
    )
}
