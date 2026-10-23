export const solutionGroups = ['telecom-tower-monopole', 'rapid-deployment-system', 'smart-pole-lamp-pole'] as const
export type SolutionGroup = typeof solutionGroups[number]
export type PublicImage = {url:string;alt:string;width?:number;height?:number}
export type PublicSolution = {slug:SolutionGroup;title:string;body:string;summary?:string;image?:PublicImage}
export type PublicProduct = {id:number;slug:string;title:string;description:string;group:SolutionGroup;entryType:'product'|'configuration'|'service';image?:PublicImage}
export type PublicFAQ = {id:number;question:string;answer:string}
export type PublicPartner = {id:number;name:string;logo:PublicImage}
export type PublicSiteSettings = {companyName?:string;email?:string;phone?:string;mobile?:string;fax?:string;address?:string;socialLinks:string[];directionsLinks:string[]}
export type PublishedContent = {solutions:Partial<Record<SolutionGroup,PublicSolution>>;products:PublicProduct[];faqs:PublicFAQ[];partners:PublicPartner[];siteSettings:PublicSiteSettings|null}
export const emptyPublishedContent = ():PublishedContent => ({solutions:{},products:[],faqs:[],partners:[],siteSettings:null})
