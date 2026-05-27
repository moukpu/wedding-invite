import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Check if it's a message containing text
    if (body.message && body.message.text) {
      const text = body.message.text.trim();
      const chatId = body.message.chat.id;
      
      // Handle /list command
      if (text === '/list') {
        const { rows } = await sql`SELECT * FROM guests ORDER BY created_at DESC`;
        
        let reply = '📋 **Список гостей:**\n\n';
        let yesCount = 0;
        let noCount = 0;

        if (rows.length === 0) {
          reply += 'Пока никто не заполнил анкету.';
        } else {
          rows.forEach((guest, index) => {
            const icon = guest.attendance === 'yes' ? '✅' : '❌';
            if (guest.attendance === 'yes') yesCount++;
            else noCount++;
            
            reply += `${index + 1}. ${guest.name} ${icon}\n`;
          });
          
          reply += `\n📊 Итого:\n✅ Придут: ${yesCount}\n❌ Не смогут: ${noCount}`;
        }

        const token = process.env.TELEGRAM_BOT_TOKEN;
        if (token) {
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: reply,
              parse_mode: 'Markdown',
            }),
          }).catch(e => console.error("Telegram error:", e));
        }
      }
    }

    // Always return 200 OK to Telegram so it doesn't retry
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ ok: true }, { status: 200 }); // Still return 200 to telegram
  }
}
