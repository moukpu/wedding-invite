import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

type GuestRow = {
  name: string;
  attendance: string;
};

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
    const body = await request.json();
    
    // Check if it's a message containing text
    if (body.message && body.message.text) {
      const text = body.message.text.trim();
      const chatId = body.message.chat.id;
      const adminChatId = process.env.TELEGRAM_CHAT_ID;

      if (adminChatId && String(chatId) !== adminChatId) {
        return NextResponse.json({ ok: true }, { status: 200 });
      }
      
      const token = process.env.TELEGRAM_BOT_TOKEN;

      // Handle /start command
      if (text === '/start') {
        const reply = '👋 Привет! Я бот для сбора ответов гостей на свадьбу.\n\nКоманды:\n📋 /list — Показать список ответов гостей\n🗑 /clear — Удалить абсолютно ВСЕ ответы из базы\n❌ /delete <имя> — Удалить ответ гостя по его имени';
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
      
      // Handle /list command
      else if (text === '/list') {
        const { rows } = await pool.query<GuestRow>('SELECT name, attendance FROM guests ORDER BY created_at DESC');
        
        let reply = '📋 *Список гостей:*\n\n';
        let yesCount = 0;
        let noCount = 0;

        if (rows.length === 0) {
          reply += 'Пока никто не заполнил анкету.';
        } else {
          rows.forEach((guest, index) => {
            const answer = formatAttendance(guest.attendance);
            const isAttending = answer !== 'НЕ СМОГУ ПРИСУТСТВОВАТЬ';
            const icon = isAttending ? '✅' : '❌';
            if (isAttending) yesCount++;
            else noCount++;
            
            reply += `${index + 1}. *${guest.name}* — ${answer} ${icon}\n`;
          });
          
          reply += `\n📊 *Итого:*\n✅ Придут: ${yesCount}\n❌ Не смогут: ${noCount}`;
        }

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

      // Handle /clear command
      else if (text === '/clear') {
        try {
          await pool.query('DELETE FROM guests');
          const reply = '🗑 Все ответы гостей были успешно удалены из базы данных.';
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
        } catch (dbError) {
          console.error('Error clearing database:', dbError);
          const reply = '❌ Произошла ошибка при очистке базы данных.';
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

      // Handle /delete <name> command
      else if (text.startsWith('/delete ')) {
        const nameToDelete = text.substring(8).trim();
        if (nameToDelete) {
          try {
            const res = await pool.query('DELETE FROM guests WHERE name ILIKE $1', [nameToDelete]);
            const deletedCount = res.rowCount ?? 0;
            let reply = '';
            if (deletedCount > 0) {
              reply = `🗑 Ответ(ы) от *${nameToDelete}* (${deletedCount} шт.) успешно удален(ы) из базы данных.`;
            } else {
              reply = `🔍 Гость с именем *${nameToDelete}* не найден в базе данных.`;
            }
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
          } catch (dbError) {
            console.error('Error deleting guest:', dbError);
            const reply = '❌ Произошла ошибка при удалении гостя.';
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
      }
    }

    // Always return 200 OK to Telegram so it doesn't retry
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ ok: true }, { status: 200 }); // Still return 200 to telegram
  }
}

