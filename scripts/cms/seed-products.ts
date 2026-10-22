import type { Payload, RequiredDataFromCollectionSlug } from 'payload'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { importDraftRecord } from './import-data'

export async function seedProducts(payload:Payload) {
  const entries=JSON.parse(await readFile(new URL('./product-seed.json',import.meta.url),'utf8')) as (RequiredDataFromCollectionSlug<'products'> & {importKey:string})[]
  const report={created:0,skipped:0,failed:0,failures:[] as {key:string;error:string}[]}
  for(const entry of entries){
    try {
      const result=await importDraftRecord({
        async findExisting(_collection,key){return (await payload.find({collection:'products',draft:true,overrideAccess:true,depth:0,limit:1,where:{importKey:{equals:key}}})).docs[0]},
        async createDraft(_collection,data){return payload.create({collection:'products',overrideAccess:true,draft:true,data:data as RequiredDataFromCollectionSlug<'products'>})},
      },'products',{...entry,extractedAt:new Date().toISOString()})
      report[result.status]++
    }catch(error){report.failed++;report.failures.push({key:entry.importKey,error:error instanceof Error?error.message:'Import failed'})}
  }
  return report
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const {getPayload}=await import('payload')
  const {default:config}=await import('../../src/payload.config')
  const payload=await getPayload({config})
  try {const result=await seedProducts(payload);console.log(JSON.stringify(result,null,2));if(result.failed)process.exitCode=1}
  finally {const client=payload.db.drizzle.$client;await payload.destroy();client.close()}
  process.exit(process.exitCode||0)
}
