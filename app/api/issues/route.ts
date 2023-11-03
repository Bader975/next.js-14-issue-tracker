import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'
import { issuesZodSchema } from "../../../zodSchemas/zodSchema";


// validate the body request by **ZOD**

export async function POST(request: NextRequest, response: Response) {
    const body = await request.json();
    const validtion = issuesZodSchema.safeParse(body);

    if (!validtion.success) {
        // res.json(validtion.error.errors, { status: 400 });
        return NextResponse.json(validtion.error.format(), { status: 400 });
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


export async function GET( response: Response) {

const allIssues= await prisma.issue.findMany({});

return NextResponse.json(allIssues)

}