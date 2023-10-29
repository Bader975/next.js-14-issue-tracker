import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from '@/prisma/client'


// validate the body request by **ZOD**
const issuesZodSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(5)
})

// validate the body request by **ZOD**

export async function POST(request: NextRequest, res: Response) {
    const body = await request.json();
    const validtion = issuesZodSchema.safeParse(body);

    if (!validtion.success) {
        // res.json(validtion.error.errors, { status: 400 });
        return NextResponse.json(validtion.error.errors, { status: 400 });
    }

    // const { title, description } = body;
    const newIssues = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(newIssues, { status: 201 });

}