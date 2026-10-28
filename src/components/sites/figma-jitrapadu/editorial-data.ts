export type EditorialKind = "news-events" | "csr";
export type EditorialPost = { slug:string; completedYear?:number; category:string; title:string; excerpt:string; image:string; body:{ heading:string; text:string }[] };
const asset = (name:string) => `/sites/figma-jitrapadu/shared/${name}.png`;
export const editorialPosts: Record<EditorialKind, EditorialPost[]> = {
  "news-events": [
    { slug:"planning-flexible-network-deployment",category:"Article",title:"Planning for Flexible Network Deployment",excerpt:"A closer look at the site, equipment and access considerations that help shape adaptable telecom infrastructure.",image:"/sites/figma-jitrapadu/editorial/site-team.png",body:[
      {heading:"Start with the site",text:"A successful deployment starts with a clear understanding of the location. Available space, access routes, surrounding infrastructure and ground conditions all influence the approach. Bringing these details into the conversation early helps project teams identify constraints before fabrication begins."},
      {heading:"Design around the requirement",text:"Coverage goals, equipment loading and operator requirements should guide the structure selection. A permanent tower, a monopole and a rapid deployment arrangement serve different needs. Reviewing the intended use and the potential for future changes helps establish a practical brief."},
      {heading:"Coordinate the whole delivery",text:"Engineering, fabrication, logistics and site teams need a shared plan. Confirming responsibilities and reviewing the sequence of works helps the project progress from design to installation with fewer avoidable changes. Speak with our team to discuss your site and deployment objectives."},
    ]},
    {slug:"inside-steel-fabrication",category:"Article",title:"Inside the Steel Fabrication Process",excerpt:"From material preparation to finishing: the stages behind a well-coordinated steel fabrication process.",image:"/sites/figma-jitrapadu/editorial/steel-fabrication.png",body:[
      {heading:"Preparation sets the standard",text:"Steel fabrication begins with the project drawings and material requirements. Teams review dimensions, component arrangements and the intended installation sequence before preparing the steel for cutting and forming."},
      {heading:"From components to structure",text:"Cutting, bending, drilling and welding turn the design into individual components and assemblies. Checks during production help confirm that components match the project requirements and can be assembled as intended."},
      {heading:"Ready for the next stage",text:"Finishing, inspection and identification prepare the components for delivery. The coating and inspection requirements depend on the structure and project specifications. This article describes a general process; the agreed project documentation remains the reference for any individual installation."},
    ]},
    {slug:"connectivity-industry-exchange",category:"Events",title:"Connectivity Industry Exchange",excerpt:"A proposed discussion on network infrastructure, deployment challenges and collaboration across the industry.",image:"/sites/figma-jitrapadu/editorial/site-team.png",body:[
      {heading:"A space for practical conversations",text:"This proposed session would bring together infrastructure professionals to discuss the challenges involved in planning, building and maintaining telecommunications networks. The format is intended to encourage practical knowledge sharing rather than product promotion."},
      {heading:"Topics for discussion",text:"Potential topics include site constraints, coordination between project partners and the changing needs of connected communities. The programme, speakers and venue have not been confirmed."},
      {heading:"Register your interest",text:"No event date or booking is currently available. Contact our team if you would like to express interest in this proposed topic. A confirmed announcement would be published once the details are approved."},
    ]},
    {slug:"tower-design-considerations",category:"Article",title:"Understanding Tower Design Considerations",excerpt:"How site conditions, loading and maintenance access inform a telecommunications structure.",image:asset("4a624"),body:[
      {heading:"Every location is different",text:"The surrounding environment, access and required height influence the early design discussion. A site assessment helps establish the constraints that the engineering proposal needs to address."},
      {heading:"Consider the equipment and future use",text:"Antenna arrangements and supporting equipment affect the loads on a structure. Project teams should provide the intended equipment information and sharing requirements so these can be considered within the engineering review."},
      {heading:"Plan for operation",text:"Inspection and maintenance access are part of a structure’s working life. The final arrangement should be reviewed against the applicable project requirements and structural standards by the responsible engineering team."},
    ]},
    {slug:"site-planning-workshop",category:"Events",title:"Site Acquisition and Planning Workshop",excerpt:"A proposed workshop exploring early site planning, coordination and practical deployment requirements.",image:asset("687ab"),body:[
      {heading:"From location to project brief",text:"This proposed workshop would explore the information needed to evaluate a potential infrastructure site, including access, available space, surrounding conditions and equipment needs."},
      {heading:"A collaborative approach",text:"The proposed format combines guided discussion with example planning scenarios. It is intended for project partners interested in improving coordination at the beginning of an infrastructure project."},
      {heading:"Details to follow",text:"The programme, date and venue remain subject to confirmation. This is draft event content and is not an invitation to a scheduled event. Please contact the team to discuss your interest."},
    ]},
    {slug:"coordinating-fabrication-delivery",category:"Article",title:"Connecting Fabrication with Site Delivery",excerpt:"Why early coordination between factory and site teams matters throughout an infrastructure project.",image:asset("21909"),body:[
      {heading:"One shared sequence",text:"Delivery planning begins before components leave the factory. Production milestones, transport arrangements and site readiness should be reviewed together so the installation team knows what to expect."},
      {heading:"Clear communication",text:"A shared component list and an agreed delivery sequence help teams prepare the right equipment and access. Changes to the site or programme should be communicated before transport is arranged."},
      {heading:"A practical handover",text:"Inspection records and project documentation support the handover process. The information required will depend on the scope and should be agreed with the responsible project team."},
    ]},
  ],
  csr:[
    {slug:"young-minds-engineering",completedYear:2026,category:"Education",title:"Introducing Young Minds to Engineering",excerpt:"A proposed initiative to introduce students to engineering through practical demonstrations and shared knowledge.",image:"/sites/figma-jitrapadu/editorial/engineering-education.png",body:[
      {heading:"Our intent",text:"This proposed initiative explores how practical demonstrations could help students discover the ideas behind engineering and telecommunications. A safe, supervised learning environment would allow young people to ask questions and connect classroom subjects with real-world applications."},
      {heading:"Learning through discovery",text:"Possible activities include working with small structure models, discussing how communications networks connect communities and learning about different engineering roles. Any programme would be planned with appropriate educators and safeguarding arrangements."},
      {heading:"A proposed direction",text:"This story describes a concept, not a completed company activity. The programme, partners and delivery arrangements have not been confirmed. We welcome conversations with education partners who would like to explore responsible ways of sharing engineering knowledge."},
    ]},
    {slug:"safer-workplaces-communities",completedYear:2025,category:"Community",title:"Safer Workplaces, Stronger Communities",excerpt:"Exploring opportunities to share practical safety awareness with communities and project partners.",image:"/sites/figma-jitrapadu/editorial/site-team.png",body:[
      {heading:"Safety as a shared conversation",text:"This proposed initiative considers how teams could share practical awareness of safe working practices beyond an individual project. Conversations would focus on recognising hazards, communicating clearly and understanding the responsibilities of everyone involved."},
      {heading:"Working with others",text:"Potential activities could include guided discussions with suitable community or industry partners. Any activity would need a defined scope and the involvement of appropriately qualified people."},
      {heading:"Next steps",text:"No programme has been launched or completed under this draft story. Specific activities, partners and dates would be announced only after confirmation."},
    ]},
    {slug:"responsible-material-use",completedYear:2024,category:"Environment",title:"Exploring Responsible Material Use",excerpt:"A proposed conversation about material stewardship, resource awareness and responsible fabrication practices.",image:"/sites/figma-jitrapadu/editorial/responsible-materials.png",body:[
      {heading:"Understanding the materials we use",text:"Steel infrastructure depends on careful material planning. This proposed CSR direction explores how knowledge sharing could help people understand the role of materials, finishing and responsible resource use."},
      {heading:"Small decisions, wider awareness",text:"Possible topics include material identification, thoughtful planning and the importance of using appropriate waste-management channels. Specific environmental outcomes would need to be measured before any claims could be made."},
      {heading:"An idea for collaboration",text:"This is a proposed educational story and does not report a completed planting programme or verified environmental impact. The image is an AI-generated illustration. Partnerships and activities remain to be confirmed."},
    ]},
    {slug:"connecting-shared-knowledge",completedYear:2025,category:"Community",title:"Connecting Through Shared Knowledge",excerpt:"Exploring collaboration between communities, educational institutions and infrastructure professionals.",image:"/sites/figma-jitrapadu/editorial/engineering-education.png",body:[
      {heading:"Create opportunities to learn",text:"Knowledge becomes more useful when people can share their experiences. This proposed initiative considers how engineering teams and local partners could exchange practical perspectives on infrastructure and connectivity."},
      {heading:"Listen before planning",text:"A useful programme begins by understanding the interests and needs of the people involved. Potential sessions would be developed with partners rather than assuming a single approach works for every community."},
      {heading:"Open to discussion",text:"This story outlines a possible direction, not a completed activity or formal partnership. Contact our team if your organisation would like to discuss a relevant opportunity."},
    ]},
  ],
};
