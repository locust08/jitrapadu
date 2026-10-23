import { EditorialArchive } from "@/components/sites/figma-jitrapadu/editorial";
import { DesignFrame } from "@/components/sites/figma-jitrapadu/shared/DesignFrame";
export const metadata = { title: "Blog | Jitrapadu Engineering" };
export default function Page() { return <DesignFrame page="blog" height={0}><EditorialArchive kind="news-events" blog /></DesignFrame>; }
