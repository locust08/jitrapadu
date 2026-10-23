import { notFound } from "next/navigation";
import { EditorialArticle } from "@/components/sites/figma-jitrapadu/editorial";
import { editorialPosts } from "@/components/sites/figma-jitrapadu/editorial-data";
import { DesignFrame } from "@/components/sites/figma-jitrapadu/shared/DesignFrame";
export function generateStaticParams(){return editorialPosts.csr.map(post=>({slug:post.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const post=editorialPosts.csr.find(post=>post.slug===slug);return {title:post?`${post.title} | Jitrapadu Engineering`:"Post not found"};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const post=editorialPosts.csr.find(post=>post.slug===slug);if(!post)notFound();return <DesignFrame page="csr-post" height={0}><EditorialArticle kind="csr" post={post}/></DesignFrame>;}
