import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function POST(request: Request) {
  try {
    const { name, attendance } = await request.json();

    if (!name || !attendance) {
      return NextResponse.json({ error: 'Name and attendance are required' }, { status: 400 });
    }

    // Сохраняем в базу данных
    await pool.query(
      'INSERT INTO guests (name, attendance) VALUES ($1, $2)',
      [name, attendance]
    );

    // Отправляем уведомление в Telegram (если настроены переменные)
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (token && chatId) {
      const icon = attendance === 'yes' ? '✅' : '❌';
      const statusText = attendance === 'yes' ? 'Подтвердил(а) присутствие' : 'Не сможет прийти';
      const text = `${icon} Новая анкета!\n\nИмя: ${name}\nОтвет: ${statusText}`;

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      }).catch(e => console.error("Telegram error:", e));
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('RSVP Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

