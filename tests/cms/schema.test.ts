import test from 'node:test'
import assert from 'node:assert/strict'
import { withTestPayload } from './fixtures.ts'

test('public content omits provenance and archival pages stay private even if published',()=>withTestPayload(async payload=>{
  await payload.create({collection:'source-pages',data:{title:'Archive',slug:'archive',body:'PRIVATE_ARCHIVE',_status:'published'}})
  await assert.rejects(payload.find({collection:'source-pages',overrideAccess:false}))
  await payload.create({collection:'solutions',data:{title:'Public',slug:'telecom-tower-monopole',body:'Public body',reviewNotes:'PRIVATE_NOTE',importKey:'PRIVATE_KEY',_status:'published'}})
  const visible=await payload.find({collection:'solutions',overrideAccess:false})
  assert.equal(visible.totalDocs,1)
  assert.equal('reviewNotes' in visible.docs[0],false)
  assert.equal('importKey' in visible.docs[0],false)
  const trusted=await payload.find({collection:'solutions',overrideAccess:true})
  assert.equal(trusted.docs[0].reviewNotes,'PRIVATE_NOTE')
}))

test('editors review product drafts but anonymous readers cannot',()=>withTestPayload(async payload=>{
  await payload.create({collection:'products',draft:true,data:{title:'Private',slug:'private',description:'Review',solutionGroup:'telecom-tower-monopole',entryType:'product'}})
  const reviewer={id:999,collection:'users',role:'editor'}
  assert.equal((await payload.find({collection:'products',draft:true,overrideAccess:false,user:reviewer})).totalDocs,1)
  assert.equal((await payload.find({collection:'products',draft:true,overrideAccess:false})).totalDocs,0)
}))
