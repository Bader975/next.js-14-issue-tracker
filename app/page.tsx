
import { Text } from '@radix-ui/themes';
import prisma from '@/prisma/client'

interface AllIssuesProps {
  id: number;
  title: string;
  description: string;
}
export const revalidate = 3000;
export default async function Page() {
  'use server';
  const allIssues = await prisma.issue.findMany();
  const data: AllIssuesProps[] = allIssues;



  return (
    <section className="h-screen ">
      <h1>dashboard</h1>
      <div>
        <h1 className='text-xl font-bold'>The Issues List </h1>

        {data.map((issue) =>
          <div key={issue.id} className='border-black bg-purple-50 m-1'>
            <Text className='text-lg font-bold'>{issue.title}</Text>
            <Text as='p'>{issue.description}</Text>

          </div>

        )}
      </div>
    </section>
  )
}
