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
import ErrorrMessage from '../../components/ErrorMessage'
import Spinner from '../../components/Spinner'

type IssueFrimInputs = z.infer<typeof issuesZodSchema>;

// interface IssueFrimInputs {
//     title: string;
//     description: string;
// }
export default function newIssue() {
    const [error, setError] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    // router
    const router = useRouter()

    // React From Hook
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFrimInputs>({
        resolver: zodResolver(issuesZodSchema)
    });


    // submit form handler
    const handleNewIssue = async (data: any) => {
        const { title, description } = data;
        try {
            // show Spinner
            setIsSubmitted(true);

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
            setIsSubmitted(false);
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
                <ErrorrMessage>{errors.title?.message}</ErrorrMessage>
                {/* errors check */}
                <Controller name='description' control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description ..." {...field} />}
                />
                {/* errors check */}
                <ErrorrMessage>{errors.description?.message}</ErrorrMessage>
                {/* errors check */}

                <Button disabled={isSubmitted}>Submit {isSubmitted && <Spinner />}</Button>
            </form>

        </div>
    )
}
