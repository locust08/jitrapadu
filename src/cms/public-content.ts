import 'server-only'
import {getPayload} from 'payload'
import config from '../payload.config'
import {readPublishedContent} from './public-reader'
import {emptyPublishedContent} from './content-types'
export async function getPublishedContent(){
  try{return await readPublishedContent(await getPayload({config}))}
  catch{console.error('[cms-public] initialization failed; using static fallback');return emptyPublishedContent()}
}
