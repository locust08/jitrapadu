import assert from 'node:assert/strict'
import {spawn} from 'node:child_process'
import {randomBytes} from 'node:crypto'
import {createServer} from 'node:net'
import {writeFile,mkdir} from 'node:fs/promises'
import sharp from 'sharp'
import {withTestPayload} from '../../tests/cms/fixtures'

async function freePort(){const s=createServer();await new Promise<void>(resolve=>s.listen(0,'localhost',resolve));const a=s.address();assert.ok(a&&typeof a==='object');const port=a.port;await new Promise<void>((resolve,reject)=>s.close(e=>e?reject(e):resolve()));return port}

const interruption=new AbortController()
let interruptedExit=0
const onInterrupt=()=>{interruptedExit=130;interruption.abort(new Error('Verification interrupted'))}
const onTerminate=()=>{interruptedExit=143;interruption.abort(new Error('Verification terminated'))}
process.once('SIGINT',onInterrupt);process.once('SIGTERM',onTerminate)
try {
await withTestPayload(async(payload,paths)=>{
  const port=await freePort(),origin=`http://localhost:${port}`
  const password=randomBytes(32).toString('hex'),email='frontend-check@example.invalid'
  await payload.create({collection:'users',data:{email,password,role:'admin'}})
  const data=await sharp({create:{width:320,height:120,channels:4,background:'#007cf8'}}).composite([{input:Buffer.from('<svg width="320" height="120"><text x="30" y="68" fill="white" font-size="24">CMS partner preview</text></svg>')}]).png().toBuffer()
  const image=await payload.create({collection:'media',data:{label:'Fixture logo',reviewStatus:'pending'},file:{data,name:'fixture-logo.png',mimetype:'image/png',size:data.length}})
  const logs:string[]=[]
  const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','localhost','--port',String(port)],{cwd:process.cwd(),env:{...process.env,NODE_ENV:'production',DATABASE_URI:`file:${paths.database}`,PAYLOAD_UPLOAD_DIR:paths.uploads,PAYLOAD_SECRET:randomBytes(48).toString('hex'),NEXT_PUBLIC_SERVER_URL:origin,PORT:String(port)},stdio:['ignore','pipe','pipe']})
  server.stdout.on('data',d=>logs.push(String(d)));server.stderr.on('data',d=>logs.push(String(d)))
  let token='',checks=0
  async function api(route:string,method='GET',body?:unknown,auth=false){
    const r=await fetch(origin+route,{method,signal:interruption.signal,headers:{...(body?{'Content-Type':'application/json'}:{}),...(auth?{Authorization:`JWT ${token}`}:{})},body:body?JSON.stringify(body):undefined})
    assert.ok(r.ok,`${method} ${route} returned ${r.status}`);return r.json()
  }
  async function html(route:string,reviewer=false){const r=await fetch(origin+route,{signal:interruption.signal,headers:reviewer?{Cookie:`payload-token=${token}`}:{}});assert.equal(r.status,200);const text=await r.text();for(const hidden of ['PRIVATE_SENTINEL','DRAFT_SENTINEL'])assert.equal(text.includes(hidden),false,`private text leaked: ${route}`);checks++;return text}
  const tower='/solutions/telecom-tower-monopole'
  try{
    const deadline=Date.now()+120000
    while(true){interruption.signal.throwIfAborted();try{const r=await fetch(origin+'/api/faqs',{signal:interruption.signal});if(r.ok)break}catch{}if(server.exitCode!==null||Date.now()>deadline)throw new Error('Disposable server did not become ready');await new Promise(r=>setTimeout(r,500))}
    const before=await html(tower);assert.ok(before.includes('Angular Tower'))
    for(const route of ['/','/about-us','/our-factory'])await html(route)
    token=(await api('/api/users/login','POST',{email,password})).token
    assert.ok(token)
    const solution=(await api('/api/solutions','POST',{title:'PUBLIC_SOLUTION_A',slug:'telecom-tower-monopole',body:'PUBLIC_BODY_A',summary:'PUBLIC_SUMMARY_A',reviewNotes:'PRIVATE_SENTINEL',_status:'published'},true)).doc
    const product=(await api('/api/products','POST',{title:'PUBLIC_PRODUCT_A',slug:'fixture-product',description:'PUBLIC_DESCRIPTION_A',solutionGroup:'telecom-tower-monopole',entryType:'product',displayOrder:0,image:image.id,reviewNotes:'PRIVATE_SENTINEL',_status:'published'},true)).doc
    const faq=(await api('/api/faqs','POST',{question:'PUBLIC_QUESTION_A',answer:'PUBLIC_ANSWER_A',solutionGroup:'telecom-tower-monopole',_status:'published'},true)).doc
    await api('/api/faqs','POST',{question:'WRONG_TARGET_SENTINEL',answer:'No',solutionGroup:'rapid-deployment-system',_status:'published'},true)
    await api('/api/solutions','POST',{title:'UNSUPPORTED_SENTINEL',slug:'sea-freight-delivery',body:'No',_status:'published'},true)
    const partner=(await api('/api/partners','POST',{name:'PUBLIC_PARTNER_A',logo:image.id,nameVerified:true,_status:'published'},true)).doc
    await api('/api/globals/site-settings','POST',{companyName:'PUBLIC_COMPANY_A',email:'public@example.com',address:'PUBLIC_ADDRESS_A',reviewNotes:'PRIVATE_SENTINEL',_status:'published'},true)
    for(const reviewer of [false,true]){
      const page=await html(tower,reviewer)
      for(const text of ['PUBLIC_SOLUTION_A','PUBLIC_PRODUCT_A','PUBLIC_QUESTION_A','PUBLIC_ADDRESS_A'])assert.ok(page.includes(text),text)
      assert.equal(page.includes('WRONG_TARGET_SENTINEL'),false)
      assert.equal(page.includes('<h3>Angular Tower</h3>'),false,'CMS list must replace static cards')
      assert.equal(page.includes(image.filename!),false,'pending image must not enter page props')
      const home=await html('/',reviewer);assert.ok(home.includes('PUBLIC_SUMMARY_A'));assert.equal(home.includes('UNSUPPORTED_SENTINEL'),false);assert.equal(home.includes('PUBLIC_PARTNER_A'),false)
    }
    for(const route of ['/about-us','/our-factory'])assert.ok((await html(route)).includes('mailto:public@example.com'))
    for(const collection of ['solutions','products','faqs','partners']){
      const docs=(await api(`/api/${collection}?draft=true`)).docs
      assert.equal(JSON.stringify(docs).includes('PRIVATE_SENTINEL'),false)
    }
    for(const route of ['/api/globals/site-settings','/api/source-pages','/api/products/versions'])assert.ok([401,403,404].includes((await fetch(origin+route)).status),route)
    assert.ok([401,403].includes((await fetch(origin+'/api/products',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})).status))
    assert.ok([401,403,404].includes((await fetch(origin+`/api/media/file/${image.filename}`)).status))
    await api(`/api/media/${image.id}`,'PATCH',{reviewStatus:'approved'},true)
    const approvedHTML=await html(tower)
    const imageUrl=[...approvedHTML.matchAll(/<img[^>]+src="([^"]+)"/g)].map(match=>match[1]).find(url=>url.includes(image.filename!))
    assert.ok(imageUrl,'approved image must render')
    assert.equal(new URL(imageUrl,origin).origin,origin,'local uploads must use the website origin')
    const imageResponse=await fetch(new URL(imageUrl,origin));assert.equal(imageResponse.status,200);assert.ok((await imageResponse.arrayBuffer()).byteLength>0)
    assert.ok((await html('/')).includes('PUBLIC_PARTNER_A'))
    await api(`/api/partners/${partner.id}`,'PATCH',{nameVerified:false},true)
    assert.equal((await html('/')).includes('PUBLIC_PARTNER_A'),false)
    await api(`/api/media/${image.id}`,'PATCH',{reviewStatus:'rejected'},true)
    assert.equal((await html(tower)).includes(image.filename!),false)
    assert.ok([401,403,404].includes((await fetch(origin+`/api/media/file/${image.filename}`)).status))
    for(const [collection,id,field] of [['solutions',solution.id,'title'],['products',product.id,'title'],['faqs',faq.id,'question']] as const){await api(`/api/${collection}/${id}?draft=true`,'PATCH',{[field]:'DRAFT_SENTINEL',_status:'draft'},true)}
    await api('/api/globals/site-settings?draft=true','POST',{companyName:'DRAFT_SENTINEL',email:'draft@example.com',_status:'draft'},true)
    for(const reviewer of [false,true]){const page=await html(tower,reviewer);assert.ok(page.includes('PUBLIC_PRODUCT_A'));assert.ok(page.includes('PUBLIC_COMPANY_A'))}
    assert.equal((await api(`/api/products/${product.id}?draft=true`,'GET',undefined,true)).title,'DRAFT_SENTINEL')
    for(const [collection,id,field,text] of [['solutions',solution.id,'title','PUBLIC_SOLUTION_B'],['products',product.id,'title','PUBLIC_PRODUCT_B'],['faqs',faq.id,'question','PUBLIC_QUESTION_B']] as const){await api(`/api/${collection}/${id}`,'PATCH',{[field]:text,_status:'published'},true)}
    await api('/api/globals/site-settings','POST',{companyName:'PUBLIC_COMPANY_B',_status:'published'},true)
    let page=await html(tower);for(const text of ['PUBLIC_SOLUTION_B','PUBLIC_PRODUCT_B','PUBLIC_QUESTION_B','PUBLIC_COMPANY_B'])assert.ok(page.includes(text),text)
    for(const [collection,id] of [['solutions',solution.id],['products',product.id],['faqs',faq.id]] as const){await api(`/api/${collection}/${id}`,'PATCH',{_status:'draft'},true)}
    await api('/api/globals/site-settings','POST',{_status:'draft'},true)
    page=await html(tower);assert.ok(page.includes('<h3>Angular Tower</h3>'));for(const text of ['PUBLIC_SOLUTION_B','PUBLIC_PRODUCT_B','PUBLIC_QUESTION_B','PUBLIC_COMPANY_B'])assert.equal(page.includes(text),false,text)
    assert.equal((await api('/api/products?draft=true')).totalDocs,0)
    assert.ok([200,307,308].includes((await fetch(origin+'/admin',{redirect:'manual'})).status))
    console.log(JSON.stringify({verified:true,htmlChecks:checks,publishedRevisions:'visible without rebuilding',drafts:'private including reviewer cookies',media:'approval enforced',fallback:'verified',isolated:true},null,2))
    if(process.argv.includes('--interactive')){
      await api(`/api/products/${product.id}`,'PATCH',{title:'CMS product preview',_status:'published'},true)
      await api(`/api/solutions/${solution.id}`,'PATCH',{title:'CMS tower solution preview',body:'Published introduction from Payload CMS.',summary:'Published homepage summary from Payload CMS.',_status:'published'},true)
      await api(`/api/faqs/${faq.id}`,'PATCH',{question:'How does published content appear?',answer:'Reviewed content appears after publishing and refreshing.',_status:'published'},true)
      await api('/api/globals/site-settings','POST',{companyName:'Jitrapadu Engineering — CMS preview',email:'cms-review@example.invalid',address:'Published contact address preview',_status:'published'},true)
      await api(`/api/media/${image.id}`,'PATCH',{reviewStatus:'approved'},true)
      await api(`/api/partners/${partner.id}`,'PATCH',{nameVerified:true,_status:'published'},true)
      const statusPath=process.argv.find(arg=>arg.startsWith('--status-file='))?.slice('--status-file='.length)
      if(statusPath)await writeFile(statusPath,JSON.stringify({root:paths.root,pid:server.pid,origin}),{flag:'wx',mode:0o600})
      console.log(`Visual verification server: ${origin}. Press Enter to close.`)
      process.stdin.resume();await new Promise<void>((resolve,reject)=>{
        const finish=()=>{interruption.signal.removeEventListener('abort',abort);resolve()}
        const abort=()=>{process.stdin.removeListener('data',finish);reject(interruption.signal.reason)}
        process.stdin.once('data',finish);interruption.signal.addEventListener('abort',abort,{once:true});if(interruption.signal.aborted)abort()
      });process.stdin.pause()
    }
  }catch(error){if(!interruptedExit){await mkdir('temp',{recursive:true});await writeFile('temp/cms-frontend-verification.log',logs.join(''));console.error('Verification failed; see temp/cms-frontend-verification.log')}throw error}
  finally{server.kill('SIGTERM');await new Promise<void>(resolve=>{if(server.exitCode!==null)return resolve();server.once('exit',()=>resolve());setTimeout(()=>{server.kill('SIGKILL');resolve()},5000).unref()})}
})

} catch(error){if(interruptedExit)process.exitCode=interruptedExit;else throw error}
finally {process.removeListener('SIGINT',onInterrupt);process.removeListener('SIGTERM',onTerminate)}
process.exit(process.exitCode||0) // All isolated resources are awaited and closed before exiting the CLI.
