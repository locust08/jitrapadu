'use client'
import {createContext,useContext,type ReactNode} from 'react'
import {emptyPublishedContent,type PublishedContent} from '@/cms/content-types'
import {settingsWithFallback} from '@/cms/public-model'
const ContentContext=createContext<PublishedContent>(emptyPublishedContent())
export function PublishedContentProvider({value,children}:{value:PublishedContent;children:ReactNode}){return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>}
export function usePublishedContent(){return useContext(ContentContext)}
export function usePublicSettings(){return settingsWithFallback(usePublishedContent().siteSettings,{
  companyName:'Jitrapadu Engineering Sdn. Bhd.',email:'jitrapadu@gmail.com',phone:'03-3343 5663',mobile:'017-7982984',fax:'03-3343 5663',
  address:'Lot 810 & 811,\nBatu 3 ½ Jalan Kapar,\n42100 Klang, Selangor,\nMalaysia',socialLinks:[],directionsLinks:[],
})}
