import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../env'

// como dentro do arquivo schema.ts tem varias importações
// desse jeito vai pegar todas essas importações e colcar dentro
// da variavel schema
import * as schema from './schema'

export const client = postgres(env.DATABASE_URL)

export const db = drizzle(client, { schema, logger: true })
