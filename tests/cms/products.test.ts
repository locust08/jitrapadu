import test from 'node:test'
import assert from 'node:assert/strict'
import { withTestPayload } from './fixtures.ts'
import { seedProducts } from '../../scripts/cms/seed-products.ts'

test('product seeding stays private, skips edits and retries failed creates',()=>withTestPayload(async payload=>{
  assert.deepEqual(await seedProducts(payload),{created:20,skipped:0,failed:0,failures:[]})
  const all=await payload.find({collection:'products',draft:true,limit:100})
  assert.equal(all.totalDocs,20)
  assert.ok(all.docs.every(d=>d._status==='draft'))
  assert.deepEqual(['telecom-tower-monopole','rapid-deployment-system','smart-pole-lamp-pole'].map(g=>all.docs.filter(d=>d.solutionGroup===g).length),[7,6,7])
  await payload.update({collection:'products',id:all.docs[0].id,data:{title:'Editor revision'},draft:true})
  assert.deepEqual(await seedProducts(payload),{created:0,skipped:20,failed:0,failures:[]})
  assert.equal((await payload.findByID({collection:'products',id:all.docs[0].id,draft:true})).title,'Editor revision')
  assert.equal((await payload.find({collection:'products',overrideAccess:false})).totalDocs,0)
  const target=all.docs[1]; await payload.delete({collection:'products',id:target.id})
  const original=payload.create.bind(payload)
  payload.create=async()=>{throw new Error('Injected storage failure')}
  try { assert.equal((await seedProducts(payload)).failed,1) } finally {payload.create=original}
  assert.equal((await seedProducts(payload)).created,1)
}))
