import { Suspense } from "react";
import { EditorialArchive } from "@/components/sites/figma-jitrapadu/editorial";
import { DesignFrame } from "@/components/sites/figma-jitrapadu/shared/DesignFrame";
export const metadata={title:"CSR | Jitrapadu Engineering"};
export default function Page(){return <Suspense fallback={<p className="archive-loading" role="status">Loading stories…</p>}><DesignFrame page="csr" height={0}><EditorialArchive kind="csr"/></DesignFrame></Suspense>;}
