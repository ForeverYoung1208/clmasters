import { IncomingMessage } from 'http'

export interface IncomingMessageWithRawBody extends IncomingMessage{
  rawBody: any
}
