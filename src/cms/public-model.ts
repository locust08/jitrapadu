import type { Media } from '../payload-types'
import type { PublicImage, PublicSiteSettings, PublishedContent } from './content-types'

export function safeWebUrl(value:string):string|undefined {
  if(!value || /[\s\\\u0000-\u001f\u007f]/.test(value))return
  try {const url=new URL(value);if((url.protocol==='https:'||url.protocol==='http:')&&!url.username&&!url.password)return url.href}catch{}
}
export function contactHref(kind:'email'|'phone',value:string):string|undefined {
  if(/[\u0000-\u001f\u007f]/.test(value))return
  const text=value.trim()
  if(kind==='email')return /^[A-Za-z0-9.!$&'*+/=_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(text)?`mailto:${text}`:undefined
  if(!/^\+?[0-9 ()-]+$/.test(text)||!/[0-9]/.test(text))return
  const number=text.replace(/[ ()-]/g,'')
  return `tel:${number.startsWith('0')&&!number.startsWith('00')?'+60'+number.slice(1):number}`
}
export function toPublicImage(media:Media|null):PublicImage|undefined {
  if(!media||media.reviewStatus!=='approved'||!media.mimeType?.startsWith('image/')||!media.url)return
  let url=media.url
  if(!url.startsWith('/')){const safe=safeWebUrl(url);if(!safe)return;const parsed=new URL(safe);url=parsed.pathname.startsWith('/api/media/file/')?parsed.pathname:safe}
  if(url.startsWith('/')){
    try {const decoded=decodeURIComponent(url);if(!decoded.startsWith('/api/media/file/')||decoded.includes('..')||/[\\\s?#]/.test(decoded))return}catch{return}
  }
  return {url,alt:media.alt?.trim()||media.label,...(media.width?{width:media.width}:{}),...(media.height?{height:media.height}:{})}
}
export function usePublishedList<T>(published:T[],fallback:T[]):T[]{return published.length?published:fallback}
export function towerProducts(content:PublishedContent){return content.products.filter(p=>p.group==='telecom-tower-monopole')}
export function settingsWithFallback(published:PublicSiteSettings|null,fallback:PublicSiteSettings):PublicSiteSettings {
  if(!published)return fallback
  const out={...fallback}
  for(const key of ['companyName','email','phone','mobile','fax','address'] as const){
    const value=published[key]?.trim()
    if(value&&(!(key==='email')||contactHref('email',value))&&(!['phone','mobile','fax'].includes(key)||contactHref('phone',value)))out[key]=value
  }
  for(const key of ['socialLinks','directionsLinks'] as const){const links=published[key].map(safeWebUrl).filter((v):v is string=>!!v);if(links.length)out[key]=links}
  return out
}
