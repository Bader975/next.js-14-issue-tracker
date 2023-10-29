import { z } from 'zod';

// validate the body request by **ZOD**
export const issuesZodSchema = z.object({
    title: z.string().min(5, 'Title is required and It msut be at lest 5 Letters.').max(255),
    description: z.string().min(10, 'Description is required and It msut be at lest 10 Letters')
});
