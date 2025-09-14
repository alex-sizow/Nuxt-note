# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

## Работа с Prisma и запуск проекта (русский)

Ниже шаги, чтобы включить Prisma, сгенерировать клиент, применить миграции и запустить проект локально.

1) Создайте файл `.env` в корне проекта (если ещё нет) и добавьте переменные окружения. Пример:

```properties
DATABASE_URL="mysql://root:prospekt@127.0.0.1:3306/nuxt_note"
JWT_SECRET="<ваш_секрет>"
```

2) Установите зависимости (используется pnpm в этом проекте):

```bash
pnpm install
```

3) Сгенерируйте Prisma Client:

```bash
npx prisma generate
```

4) Примените миграции (в development режиме) — создаст/обновит таблицы:

```bash
npx prisma migrate dev --name init
```

Если у вас уже есть миграции и вы просто хотите применить их в production/CI, используйте:

```bash
npx prisma migrate deploy
```

5) Опционально: подтянуть схему из существующей базы (если вы работали напрямую в БД):

```bash
npx prisma db pull
```

6) Запустите проект в режиме разработки:

```bash
pnpm dev
```

Полезные команды:

- Сгенерировать или пересоздать клиент: `npx prisma generate`
- Создать миграцию: `npx prisma migrate dev --name <описание>`
- Применить миграции: `npx prisma migrate deploy`
- Подтянуть существующую схему из БД: `npx prisma db pull`

Внимание:
- Не храните реальные секреты в публичных репозиториях. Добавьте `.env` в `.gitignore`.
- Убедитесь, что MySQL запущен и доступен по `DATABASE_URL` перед запуском миграций.


