import { client, db } from '.'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
      { title: 'Me exercitar', desiredWeeklyFrequency: 3 },
      { title: 'Meditar', desiredWeeklyFrequency: 1 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startOfWeek.toDate() }, // completei no primeiro dia dessa da semana (domingo)
    { goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() }, // completei na segunda
  ])
}
// .then() é para fechar conexão com banco de dados (Só no caso ter dado certo)

// .finally() é para fecha as conexão com banco de dados (tando deu certo ao como errado)
seed().finally(() => {
  client.end()
})
