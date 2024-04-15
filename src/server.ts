import fastify from "fastify";
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
})


//API REST 

const  app = fastify();

// Routes

app.post('/events', async (request, reply) => {

  const createEventeSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximunAttendees: z.number().int().positive().nullable(),


  })

  const data = createEventeSchema.parse(request.body)

  const event = await prisma.evento.create({
    data: {

      title: data.title,
      details: data.details,
      maximunAttendees: data.maximunAttendees,
      slug: new Date().toISOString(),

    }

    })


  return reply.code(201).send( {eventId: event.id })

})



app.listen({ port:3333 }).then( () => {

  console.log('Http server running at http://localhost:3333')
 
})

