import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

type GuestRow = {
  id: number;
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

async function getDeleteListMessage(page: number) {
  const limit = 5;
  const offset = page * limit;

  // Получаем общее количество ответов
  const countRes = await pool.query('SELECT COUNT(*) FROM guests');
  const totalCount = parseInt(countRes.rows[0].count || '0', 10);

  if (totalCount === 0) {
    return {
      text: '📋 *Список ответов пуст.* Удалять нечего.',
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Закрыть ❌', callback_data: 'del_cls' }]
        ]
      }
    };
  }

  // Получаем гостей для текущей страницы
  const { rows } = await pool.query<GuestRow>(
    'SELECT id, name, attendance FROM guests ORDER BY created_at DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  );

  // Если вдруг страница пустая (например, все удалили), возвращаем на предыдущую
  if (rows.length === 0 && totalCount > 0) {
    const lastPage = Math.floor((totalCount - 1) / limit);
    return getDeleteListMessage(lastPage);
  }

  let text = `🗑 *Выберите ответ гостя для удаления (Страница ${page + 1} из ${Math.ceil(totalCount / limit)}):*\n\n`;
  
  const inline_keyboard: any[][] = [];

  rows.forEach((guest) => {
    const answer = formatAttendance(guest.attendance);
    inline_keyboard.push([
      {
        text: `${guest.name} — ${answer}`,
        callback_data: `del_a:${guest.id}:${page}`
      }
    ]);
  });

  // Навигация по страницам
  const navRow: any[] = [];
  if (page > 0) {
    navRow.push({ text: '◀️ Назад', callback_data: `del_p:${page - 1}` });
  }
  if (offset + limit < totalCount) {
    navRow.push({ text: 'Вперед ▶️', callback_data: `del_p:${page + 1}` });
  }
  
  if (navRow.length > 0) {
    inline_keyboard.push(navRow);
  }

  // Кнопка закрытия
  inline_keyboard.push([
    { text: 'Закрыть ❌', callback_data: 'del_cls' }
  ]);

  return {
    text,
    reply_markup: {
      inline_keyboard
    }
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const adminChatId = process.env.TELEGRAM_CHAT_ID;

    if (!token) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // 1. Обработка нажатий на инлайн-кнопки (Callback Query)
    if (body.callback_query) {
      const callbackQuery = body.callback_query;
      const callbackData = callbackQuery.data;
      const chatId = callbackQuery.message.chat.id;
      const messageId = callbackQuery.message.message_id;

      // Проверка прав
      const allowedChatIds = adminChatId ? adminChatId.split(',').map(id => id.trim()) : [];
      const hasAccess = allowedChatIds.length === 0 || allowedChatIds.includes(String(chatId));

      if (adminChatId && !hasAccess) {
        await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ callback_query_id: callbackQuery.id, text: 'Нет доступа' }),
        }).catch(e => console.error(e));
        return NextResponse.json({ ok: true }, { status: 200 });
      }

      // Закрытие/удаление сообщения
      if (callbackData === 'del_cls') {
        await fetch(`https://api.telegram.org/bot${token}/deleteMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, message_id: messageId }),
        }).catch(e => console.error(e));

        await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ callback_query_id: callbackQuery.id }),
        }).catch(e => console.error(e));

        return NextResponse.json({ ok: true }, { status: 200 });
      }

      // Переключение страниц списка: del_p:<page>
      if (callbackData.startsWith('del_p:')) {
        const page = parseInt(callbackData.split(':')[1], 10);
        const msg = await getDeleteListMessage(page);

        await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: msg.text,
            parse_mode: 'Markdown',
            reply_markup: msg.reply_markup,
          }),
        }).catch(e => console.error(e));

        await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ callback_query_id: callbackQuery.id }),
        }).catch(e => console.error(e));

        return NextResponse.json({ ok: true }, { status: 200 });
      }

      // Выбор гостя для удаления (подтверждение): del_a:<guest_id>:<page>
      if (callbackData.startsWith('del_a:')) {
        const parts = callbackData.split(':');
        const guestId = parseInt(parts[1], 10);
        const page = parseInt(parts[2], 10);

        const guestRes = await pool.query<GuestRow>('SELECT name, attendance FROM guests WHERE id = $1', [guestId]);
        
        let text = '';
        let reply_markup = {};

        if (guestRes.rows.length === 0) {
          text = '❌ Гость не найден в базе данных (возможно, уже удален).';
          reply_markup = {
            inline_keyboard: [
              [{ text: '◀️ Вернуться к списку', callback_data: `del_p:${page}` }]
            ]
          };
        } else {
          const guest = guestRes.rows[0];
          const answer = formatAttendance(guest.attendance);
          text = `❓ Вы уверены, что хотите удалить ответ от *${guest.name}* (${answer})?`;
          reply_markup = {
            inline_keyboard: [
              [
                { text: '🗑 Подтвердить удаление', callback_data: `del_c:${guestId}:${page}` },
                { text: '❌ Отмена', callback_data: `del_p:${page}` }
              ]
            ]
          };
        }

        await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: text,
            parse_mode: 'Markdown',
            reply_markup: reply_markup,
          }),
        }).catch(e => console.error(e));

        await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ callback_query_id: callbackQuery.id }),
        }).catch(e => console.error(e));

        return NextResponse.json({ ok: true }, { status: 200 });
      }

      // Подтверждение удаления: del_c:<guest_id>:<page>
      if (callbackData.startsWith('del_c:')) {
        const parts = callbackData.split(':');
        const guestId = parseInt(parts[1], 10);
        const page = parseInt(parts[2], 10);

        // Удаляем гостя из БД
        await pool.query('DELETE FROM guests WHERE id = $1', [guestId]);

        // Отправляем короткое всплывающее уведомление
        await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            callback_query_id: callbackQuery.id,
            text: 'Ответ гостя успешно удален!',
            show_alert: false
          }),
        }).catch(e => console.error(e));

        // Возвращаемся к обновленному списку
        const msg = await getDeleteListMessage(page);
        await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: msg.text,
            parse_mode: 'Markdown',
            reply_markup: msg.reply_markup,
          }),
        }).catch(e => console.error(e));

        return NextResponse.json({ ok: true }, { status: 200 });
      }
    }

    // 2. Обработка обычных текстовых сообщений
    if (body.message && body.message.text) {
      const text = body.message.text.trim();
      const chatId = body.message.chat.id;

      const allowedChatIds = adminChatId ? adminChatId.split(',').map(id => id.trim()) : [];
      const hasAccess = allowedChatIds.length === 0 || allowedChatIds.includes(String(chatId));

      if (adminChatId && !hasAccess) {
        return NextResponse.json({ ok: true }, { status: 200 });
      }

      // Команда /start
      if (text === '/start') {
        const reply = '👋 Привет! Я бот для сбора ответов гостей на свадьбу.\n\nКоманды:\n📋 /list — Показать список ответов гостей\n🗑 /delete — Удалить конкретный ответ через интерактивный список\n🧹 /clear — Удалить абсолютно ВСЕ ответы из базы';
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: reply,
            parse_mode: 'Markdown',
          }),
        }).catch(e => console.error("Telegram error:", e));
      }
      
      // Команда /list
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

        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: reply,
            parse_mode: 'Markdown',
          }),
        }).catch(e => console.error("Telegram error:", e));
      }

      // Команда /delete (показывает список с пагинацией)
      else if (text === '/delete') {
        const msg = await getDeleteListMessage(0);

        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: msg.text,
            parse_mode: 'Markdown',
            reply_markup: msg.reply_markup,
          }),
        }).catch(e => console.error("Telegram error:", e));
      }

      // Команда /clear
      else if (text === '/clear') {
        try {
          await pool.query('DELETE FROM guests');
          const reply = '🗑 Все ответы гостей были успешно удалены из базы данных.';
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: reply,
              parse_mode: 'Markdown',
            }),
          }).catch(e => console.error("Telegram error:", e));
        } catch (dbError) {
          console.error('Error clearing database:', dbError);
          const reply = '❌ Произошла ошибка при очистке базы данных.';
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: reply,
              parse_mode: 'Markdown',
            }),
          }).catch(e => console.error("Telegram error:", e));
        }
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}
