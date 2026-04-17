import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, nationality, budget, purpose, location, timeline } = body

  const system = `You are an elite investment advisor for Ohana Development,
a leading UAE luxury real estate developer with AED 15 billion in active projects.
Your role: match investors to the perfect Ohana project.
Tone: warm, confident, premium — like a private banker.
Format: 2-3 flowing sentences only. No bullet points. No headers.
Always name the specific project and one compelling reason to act now.`

  const user = `
Investor profile:
- Name: ${name}
- Nationality: ${nationality || 'Not specified'}
- Budget: ${budget}
- Goal: ${purpose}
- Preferred location: ${location}
- Timeline: ${timeline || 'Flexible'}

Available projects:
1. Manchester City Yas Residences — from AED 1.7M, Yas Canal Abu Dhabi.
   Best for: families, Golden Visa seekers, sports lifestyle, off-plan growth.
   Delivery Q4 2029. AED 6B sold in first 72 hours.

2. Jacob & Co. Beachfront Living — from AED 10.8M, Al Jurf Abu Dhabi.
   Best for: ultra-luxury buyers, capital preservation, beachfront lifestyle.
   Delivery Q2 2028. Jacob & Co. branded interiors.

3. Elie Saab Waterfront — price on request, Abu Dhabi waterfront.
   Best for: fashion brand aficionados, bespoke luxury, unique design.
   Delivery 2027.

Recommend the single best project for this investor.`

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 180,
      system,
      messages: [{ role: 'user', content: user }],
    })
    const recommendation = response.content[0].type === 'text'
      ? response.content[0].text
      : 'Our team will prepare a personalised recommendation within 24 hours.'
    return NextResponse.json({ recommendation })
  } catch {
    return NextResponse.json({
      recommendation: 'Our investment team will reach out within 24 hours with a personalised recommendation tailored to your profile.'
    })
  }
}
