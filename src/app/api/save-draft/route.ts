import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Save to database
    const draft = await prisma.formDraft.create({
      data: {
        userId: 'user-id', // TODO: Get from auth session
        formData: formData,
        progress: formData.progress,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true, draft })
  } catch (error) {
    console.error('Error saving draft:', error)
    return NextResponse.json(
      { error: 'Failed to save draft' },
      { status: 500 }
    )
  }
} 