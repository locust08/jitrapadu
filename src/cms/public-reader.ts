import type { Payload, CollectionSlug, DataFromCollectionSlug, Where } from 'payload'
import {emptyPublishedContent, solutionGroups, type SolutionGroup, type PublishedContent} from './content-types'
import {safeWebUrl,toPublicImage} from './public-model'

const isGroup=(value:string):value is SolutionGroup => (solutionGroups as readonly string[]).includes(value)
export async function readPublishedContent(payload:Payload):Promise<PublishedContent>{
  const result=emptyPublishedContent()
  async function all<K extends CollectionSlug>(collection:K,where:Where={},sort:string[]=['id']):Promise<DataFromCollectionSlug<K>[]>{
    const docs:DataFromCollectionSlug<K>[]=[]
    let page=1,more=true
    while(more){const found=await payload.find({collection,where,sort,page,limit:100,depth:0,draft:false,overrideAccess:false,user:null});docs.push(...found.docs);more=found.hasNextPage;page++}
    return docs
  }
  async function section<T>(name:string,read:()=>Promise<T>,fallback:T):Promise<T>{
    try{return await read()}catch{console.error(`[cms-public] ${name} read failed; using static fallback`);return fallback}
  }
  const [solutions,products,faqs,partners,media,settings]=await Promise.all([
    section('solutions',()=>all('solutions',{and:[{_status:{equals:'published'}},{slug:{in:[...solutionGroups]}}]}),[]),
    section('products',()=>all('products',{_status:{equals:'published'}},['displayOrder','id']),[]),
    section('faqs',()=>all('faqs',{and:[{_status:{equals:'published'}},{solutionGroup:{equals:'telecom-tower-monopole'}}]},['displayOrder','id']),[]),
    section('partners',()=>all('partners',{and:[{_status:{equals:'published'}},{nameVerified:{equals:true}}]},['displayOrder','id']),[]),
    section('media',()=>all('media',{reviewStatus:{equals:'approved'}}),[]),
    // The raw global endpoint remains private. Only this explicit published projection is public.
    section('settings',()=>payload.findGlobal({slug:'site-settings',draft:false,overrideAccess:true,depth:0}),null),
  ])
  const images=new Map(media.map(m=>[m.id,toPublicImage(m)]))
  const image=(value:unknown)=> typeof value==='number'?images.get(value):undefined
  for(const doc of solutions){if(isGroup(doc.slug))result.solutions[doc.slug]={slug:doc.slug,title:doc.title,body:doc.body,summary:doc.summary?.trim()||undefined,image:image(doc.cardImage)}}
  result.products=products.filter(p=>isGroup(p.solutionGroup)).map(p=>({id:p.id,slug:p.slug,title:p.title,description:p.description,group:p.solutionGroup,entryType:p.entryType,image:image(p.image)}))
  result.faqs=faqs.map(f=>({id:f.id,question:f.question,answer:f.answer}))
  result.partners=partners.flatMap(p=>{const logo=image(p.logo);return logo?[{id:p.id,name:p.name,logo}]:[]})
  if(settings?._status==='published'){
    result.siteSettings={socialLinks:(settings.socialLinks||[]).flatMap(l=>safeWebUrl(l.url)||[]),directionsLinks:(settings.directionsLinks||[]).flatMap(l=>safeWebUrl(l.url)||[])}
    for(const key of ['companyName','email','phone','mobile','fax','address'] as const){const value=settings[key]?.trim();if(value)result.siteSettings[key]=value}
  }
  return result
}
