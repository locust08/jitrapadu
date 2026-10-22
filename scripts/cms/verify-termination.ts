import assert from 'node:assert/strict'
import {spawn} from 'node:child_process'
import {mkdtemp,readFile,rm,access} from 'node:fs/promises'
import {tmpdir} from 'node:os'
import path from 'node:path'
const root=await mkdtemp(path.join(tmpdir(),'cms-signal-check-')),statusFile=path.join(root,'status.json')
const child=spawn(process.execPath,['--import','tsx',process.argv.includes('--backend')?'scripts/cms/verify-backend.ts':'scripts/cms/verify-frontend.ts','--interactive',`--status-file=${statusFile}`],{stdio:'ignore'})
let info:{root:string;pid:number;origin:string}|undefined
try{
  const deadline=Date.now()+180000
  while(!info){try{info=JSON.parse(await readFile(statusFile,'utf8'))}catch{}if(child.exitCode!==null||Date.now()>deadline)throw new Error('Verifier did not become interactive');await new Promise(r=>setTimeout(r,200))}
  const exited=new Promise(resolve=>child.once('exit',(code,signal)=>resolve({code,signal})))
  child.kill('SIGTERM')
  await Promise.race([exited,new Promise((_,reject)=>setTimeout(()=>reject(new Error('Verifier did not exit on SIGTERM')),15000).unref())])
  await assert.rejects(access(info.root),'SIGTERM must remove the allocated fixture root')
  await assert.rejects(fetch(info.origin,{signal:AbortSignal.timeout(2000)}),'SIGTERM must stop the owned server')
  console.log('PASS: SIGTERM closes the owned server and removes its fixture database/uploads')
}finally{
  child.kill('SIGKILL')
  if(info){try{process.kill(info.pid,'SIGTERM')}catch{}await rm(info.root,{recursive:true,force:true})}
  await rm(root,{recursive:true,force:true})
}
