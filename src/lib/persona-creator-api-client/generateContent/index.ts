import { z } from 'zod'
import {
  ApiResponse,
  personaCreatorApiBaseClient,
} from '@/lib/persona-creator-api-client/personaCreatorApiBaseClient.ts'

export const generatePersona = async (
  body: GeneratePersonaRequestBody,
): Promise<ApiResponse<GeneratePersonaResponse>> => {
  return await personaCreatorApiBaseClient.post(
    `/persona/generateContent`,
    body,
    undefined,
    (responseData) => {
      const result = generatePersonaResponseSchema.safeParse(responseData)
      if (result.success) {
        return { isValid: true, data: result.data }
      }
      return { isValid: false, error: result.error }
    },
  )
}

export const generatePersonaStream = async (
  body: GeneratePersonaRequestBody,
): Promise<ApiResponse<ReadableStream<string>>> => {
  const rawReadableStream = await personaCreatorApiBaseClient.post(
    `/persona/streamGenerateContent`,
    body,
    undefined,
    (responseData) => {
      if (responseData instanceof ReadableStream) {
        return { isValid: true, data: responseData as ReadableStream<Uint8Array> }
      }
      return { isValid: false, error: 'Response data is not a ReadableStream' }
    },
  )

  if (rawReadableStream.error !== undefined) {
    return rawReadableStream
  }

  const reader = rawReadableStream.data.pipeThrough(new TextDecoderStream()).getReader()

  const stream = new ReadableStream<string>({
    start: (controller) => {
      let messageBuffer = ''
      const push = async () => {
        try {
          const { done, value } = await reader.read()
          if (done) {
            controller.close()
            return
          }
          messageBuffer += value

          const lines = messageBuffer.split('\n\n')
          if (lines.length > 1) {
            messageBuffer = lines.pop()!
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const dataValue = line.slice(6)
                if (dataValue) {
                  controller.enqueue(dataValue)
                }
              }
            }
          }
          await push()
        } catch (error) {
          console.error(error)
          controller.close()
          return
        }
      }
      void push()
    },
  })

  return {
    data: stream,
    error: undefined,
  }
}

const generatePersonaRequestBodySchema = z.object({
  age: z.string(),
  gender: z.string(),
  otherFeatures: z.string(),
})
type GeneratePersonaRequestBody = z.infer<typeof generatePersonaRequestBodySchema>

const generatePersonaResponseSchema = z.object({
  name: z.string(),
  age: z.string(),
  gender: z.string(),
  location: z.string(),
  occupation: z.string(),
  hobbies: z.string(),
  personality: z.string(),
})
type GeneratePersonaResponse = z.infer<typeof generatePersonaResponseSchema>
