import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

function formatAttendance(attendance: string) {
  if (attendance === 'yes') {
    return 'ОБЯЗАТЕЛЬНО ПРИДУ';
  }

  if (attendance === 'no') {
    return 'НЕ СМОГУ ПРИСУТСТВОВАТЬ';
  }

  return attendance;
}

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
    const chatIdEnv = process.env.TELEGRAM_CHAT_ID;

    if (token && chatIdEnv) {
      const answer = formatAttendance(attendance);
      const icon = answer === 'НЕ СМОГУ ПРИСУТСТВОВАТЬ' ? '❌' : '✅';
      const text = `${icon} Новая анкета!\n\nИмя: ${name}\nОтвет: ${answer}`;

      const chatIds = chatIdEnv.split(',').map(id => id.trim());
      for (const chatId of chatIds) {
        if (!chatId) continue;
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
          }),
        }).catch(e => console.error(`Telegram error for chat ${chatId}:`, e));
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('RSVP Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

