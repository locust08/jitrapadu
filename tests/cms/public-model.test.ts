import test from 'node:test'
import assert from 'node:assert/strict'
import {safeWebUrl,contactHref,toPublicImage,usePublishedList,settingsWithFallback,towerProducts} from '../../src/cms/public-model.ts'
import {emptyPublishedContent} from '../../src/cms/content-types.ts'
import type {Media} from '../../src/payload-types.ts'

test('public links reject unsafe schemes and contact query injection',()=>{
  for(const value of ['javascript:alert(1)','data:text/html,hi','//evil.test','https://x.test/\n']) assert.equal(safeWebUrl(value),undefined)
  assert.equal(safeWebUrl('https://jitrapadu.com/'),'https://jitrapadu.com/')
  assert.equal(contactHref('email','hello@example.com'),'mailto:hello@example.com')
  for(const value of ['x@example.com?bcc=x@y.com','x#@example.com','x@example.com\nBcc:y','']) assert.equal(contactHref('email',value),undefined)
  assert.equal(contactHref('phone','+603 3343 5663'),'tel:+60333435663')
  assert.equal(contactHref('phone','03-3343 5663'),'tel:+60333435663')
  assert.equal(contactHref('phone','017-7982984'),'tel:+60177982984')
})
test('media projection requires approved image and safe file URL',()=>{
  const media={reviewStatus:'approved',mimeType:'image/png',url:'/api/media/file/a.png',label:'Reviewed logo'} as Media
  assert.equal(toPublicImage(media)?.alt,'Reviewed logo')
  assert.equal(toPublicImage({...media,url:'http://localhost:3001/api/media/file/a.png'})?.url,'/api/media/file/a.png')
  assert.equal(toPublicImage({...media,reviewStatus:'pending'}),undefined)
  assert.equal(toPublicImage({...media,mimeType:'video/mp4'}),undefined)
  assert.equal(toPublicImage({...media,url:'javascript:alert(1)'}),undefined)
  assert.equal(toPublicImage({...media,url:'/api/media/file/../../secret'}),undefined)
})
test('published lists replace fallback and settings fallback is per valid field',()=>{
  assert.deepEqual(usePublishedList(['CMS'],['STATIC']),['CMS'])
  assert.deepEqual(usePublishedList([],['STATIC']),['STATIC'])
  const fallback={email:'old@example.com',phone:'123',address:'Existing',socialLinks:[],directionsLinks:[]}
  assert.equal(settingsWithFallback(null,fallback).email,'old@example.com')
  const merged=settingsWithFallback({email:'bad?bcc=1',phone:'+60123',address:' ',socialLinks:[],directionsLinks:[]},fallback)
  assert.equal(merged.email,'old@example.com');assert.equal(merged.phone,'+60123');assert.equal(merged.address,'Existing')
  assert.deepEqual(towerProducts(emptyPublishedContent()),[])
})
