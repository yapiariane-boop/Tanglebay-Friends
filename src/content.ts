export const homepage: {
  banner?: {src: string; alt: string};
  journeySteps: {title: string; artwork?: {src: string; alt: string}}[];
} = {banner: {src: './artwork/characters-banner-transparent.webp', alt: 'A lineup of Tanglebay characters in their distinctive outfits, with a bird flying overhead.'}, journeySteps: [
  {title: 'Find your episode', artwork: {src: './artwork/step-episode-transparent.webp', alt: 'A monkey looking through binoculars.'}}, {title: 'Choose an activity', artwork: {src: './artwork/step-activity-transparent.webp', alt: 'A smiling badger in a police cap pointing to the side.'}},
  {title: 'Prepare to play', artwork: {src: './artwork/step-prepare-transparent.webp', alt: 'A deer in a brown hat and checked jacket with arms raised.'}}, {title: 'Print your pack', artwork: {src: './artwork/step-print-transparent.webp', alt: 'An octopus juggling sheets of paper and a folder.'}},
]};
export const logoArtwork = { src: './artwork/logo-crab.webp' };
export const homeArtwork = { src: './artwork/scientist-home-transparent.webp', alt: 'A smiling Tanglebay scientist character in a white lab coat, raising a claw.' };
export type Mode = 'home' | 'group';
export type GuidanceVisual = 'teams' | 'scene' | 'discuss' | 'refine' | 'flip';
export interface Step { visual?: GuidanceVisual; id: string; title: string; body: string; items?: string[] }
export interface PackFile { id: string; title: string; href: string; copies: string; optional?: boolean; placeholder?: boolean }
export interface DuplexGuide { previews: {src:string; alt:string; label:string}[]; flipEdge: string; orientation:string; cards:number }
export interface Variant { duplexGuide?: DuplexGuide; guidanceLabel?: string; players: string; duration: string; steps: Step[]; printing: string; files: PackFile[] }
export interface Activity { id: string; title: string; catchphrase: string; description: string; episodeIds: string[]; color: string; artwork: {src?: string; alt: string}; gallery?: {src: string; alt: string}[]; variants: Record<Mode, Variant> }
export interface Episode {id: string; title: string; description: string; artwork?: {src: string; alt: string}; comingSoon?: boolean}
export const episodes: Episode[] = [
  {id:'episode-1', title:'The Orange Ghost Troubler', description:'Choose an activity to return to this episode’s world.', artwork:{src:'./artwork/episode-1-background.webp', alt:'Tanglebay friends on a beach with an orange ghost at sunset.'}},
  {id:'episode-2', title:'Retrieve Lyly', description:'A new adventure is on its way.', artwork:{src:'./artwork/episode-2-background.webp', alt:'Tanglebay friends snorkeling underwater alongside an octopus.'}, comingSoon:true},
];
const definitions = [
  ['discussion-cards','Discussion Cards','Story-based discussion and reflection cards.','coral'],
  ['five-minutes','5 Seconds for a Stand','A playful Agree / Disagree / It Depends debate and persuasion activity.','gold'],
  ['wild-path','The Wild Path','A biology-inspired board game with Character Cards, challenges, teamwork and creative problem-solving.','green'],
  ['dimitris-lab',"Inside Dimitri’s Lab",'Explore animal adaptations and connections to human inventions.','blue'],
  ['officers-investigation',"Officer’s Investigation Notebook",'Craft, interview witnesses, analyse evidence and reach a final case conclusion.','purple'],
];
const discussionHomeSteps: Step[] = [
  {
    "id": "discussion-partner",
    "title": "Find Your Discussion Partner",
    "body": "Play with a friend, sibling or adult. We recommend playing with an adult for richer conversations. There are no points, winners or wrong opinions."
  },
  {
    "id": "revisit-story",
    "title": "Pick a Card & Revisit the Story",
    "body": "Choose a card and use its page reference to reread the scene together. Pay attention to what the characters actually said and did. Read the scene before reading the question, so the question doesn’t influence how you interpret it."
  },
  {
    "id": "think-and-share",
    "title": "Think First, Then Share",
    "body": "Read the first question. Take a moment to form your own opinion before sharing it. Listen to each other’s reasoning, and let each person finish speaking before you respond."
  },
  {
    "id": "continue-conversation",
    "title": "Keep the Conversation Going",
    "body": "Agree, disagree or ask a question. Use details from the story to explain your thinking. Explore interesting differences, but don’t feel you have to reach a shared conclusion."
  },
  {
    "id": "flip-and-explore",
    "title": "Flip the Card & Explore Again",
    "body": "Turn the card over and repeat the conversation with the next question. When you’re ready, choose another card. Take your time and enjoy the exchange."
  }
];

const discussionGroupSteps: Step[] = [
  {
    "id": "discussion-teams",
    "title": "Form Your Discussion Teams",
    "body": "Divide participants into small teams. Each team will discuss the same card and choose a spokesperson to share its ideas. Rotate spokespersons so everyone has a chance to contribute.",
    "visual": "teams"
  },
  {
    "id": "replay-scene",
    "title": "Pick a Card & Replay the Scene",
    "body": "Choose a card and revisit the scene using its page reference. Participants can reread it individually, read it aloud together or perform a short role-play. Keep the question hidden until everyone has finished revisiting the scene.",
    "visual": "scene"
  },
  {
    "id": "discuss-and-decide",
    "title": "Read, Discuss & Decide",
    "body": "The facilitator reads the first question aloud and starts a discussion timer. Teams exchange opinions, refer to the story and agree on the key points they want to share. Different interpretations are welcome.",
    "visual": "discuss"
  },
  {
    "id": "share-and-refine",
    "title": "Share, Challenge & Refine",
    "body": "When time is up, each team presents its response. The facilitator selects interesting answers to explore further, asking questions that encourage clearer explanations, stronger evidence and alternative perspectives. Teams may refine their views.",
    "visual": "refine"
  },
  {
    "id": "flip-and-repeat",
    "title": "Flip the Card & Go Again",
    "body": "Reveal the question on the back and repeat the discussion and sharing process. This time, prioritise teams whose answers were not explored earlier. Encourage new reasoning, then move to another card when ready.",
    "visual": "flip"
  }
];

// Other activity guidance and Group printable logistics remain prototype examples.
function variant(id: string, title: string, mode: Mode): Variant {
  const group = mode === 'group';
  const files: PackFile[] = [{id:'activity',title: group ? 'Shared team activity kit' : 'Home activity workbook',href:`./packs/${id}-${mode}-activity.pdf`,copies:group?'Example: one kit per team':'Example: one workbook per player'}];
  if (group) files.push({id:'guide',title:'Facilitation Guide',href:`./packs/${id}-group-guide.pdf`,copies:'Example: one copy for the facilitator'});
  if (id === 'officers-investigation') files.push({id:'evidence',title:'Evidence materials',href:`./packs/${id}-${mode}-evidence.pdf`,copies:group?'Example: one set per team':'Example: one set per household',optional:true});
  if (id === 'discussion-cards' && mode === 'home') return {
    guidanceLabel:'DISCUSSION GUIDANCE', players:'Play with a friend, sibling or adult', duration:'',
    steps:discussionHomeSteps,
    files:[{id:'activity',title:'Discussion Cards — Home pack',href:'./packs/discussion-cards-home-pack.pdf',copies:'2 PDF pages → 1 double-sided sheet → 8 cards',placeholder:false}],
    printing:'Print both PDF pages on opposite sides of ONE sheet, then cut along the dotted lines. Do not cut until both sides are printed.',
    duplexGuide:{orientation:'Landscape',flipEdge:'Short edge',cards:8,previews:[
      {src:'./artwork/discussion-pack-preview-1.webp',alt:'Fronts of the eight discussion cards, with story scenes and questions.',label:'Page 1 · Front'},
      {src:'./artwork/discussion-pack-preview-2.webp',alt:'Matching backs of the eight discussion cards, with follow-up questions.',label:'Page 2 · Back'},
    ]},
  };
  if (id === 'discussion-cards' && mode === 'group') return {
    guidanceLabel:'DISCUSSION GUIDANCE', players:'Small teams with a facilitator', duration:'',
    steps:discussionGroupSteps, files, printing:'Final Group printable materials and copy counts are still to be provided.',
  };
  return {players:group?'Example: 4–12 players in small teams':'Example: 1–3 players with an adult',duration:'Example: 20–30 minutes',printing:group?'Keep the facilitator resources separate. Confirm team numbers before printing.':'Keep each player’s workbook together. Confirm how many players need a copy.',files,steps:[
    {id:'welcome',title:`Prepare ${title}`,body:group?'This example uses shared team materials and an adult facilitator.':'This example uses a complete workbook and an adult helper.',items:[group?'Share one kit within each team.':'Give each player their own workbook.','All instructions here are placeholders awaiting author review.']},
    {id:'materials',title:'Gather your materials',body:'Example preparation checklist — final materials will vary by activity.',items:['Printed materials from the final step','Pencils and scrap paper',id==='officers-investigation'?'Craft supplies chosen by an adult':'A clear space to play']},
    {id:'roles',title:group?'Set up teams and roles':'Choose how to play together',body:group?'Example: let each team choose a reader and a recorder. The facilitator keeps the guide and any reveal materials.':'Example: the child explores the workbook while an adult helps read instructions when needed.'},
    ...(id==='officers-investigation'?[{id:'reveal',title:'Plan the evidence reveal',body:group?'Example: the facilitator holds back witness and evidence sheets until each stage begins.':'Example: an adult keeps later evidence pages aside until the player reaches that stage.'}]:[]),
    {id:'play',title:'Make room for exploration',body:'Example: read the first prompt together, give everyone time to respond, and pause for questions. Final rules and story connections will be added later.'},
    {id:'printing',title:'Check before you print',body:group?'Example: count teams, print shared kits, and keep the facilitator guide separate.':'Example: count players and print complete workbooks.',items:['These PDFs are labelled demonstration files.','They do not contain finished activity materials.','Final page counts and printing settings are still to be supplied.']},
  ]};
}
const catchphrases: Record<string, string> = {
  "dimitris-lab": "Join Dimitri's research team and turn nature's strangest tricks into brilliant ideas.",
  "officers-investigation": "Join Honey's investigation team, follow the evidence and crack the case.",
  "five-minutes": "Join Leon, take a stand and see if your argument can change some minds.",
  "wild-path": "Gather your team, choose your Tanglebay heroes and find your way through the wild.",
  "discussion-cards": "Step back into the story, challenge Tanglebay friends and discuss what they would have done differently."
};

export const activities: Activity[] = definitions.map(([id,title,description,color],index)=>({id,title,catchphrase:catchphrases[id],description,color,episodeIds:index===0?['episode-1','episode-2']:(index<3?['episode-1']:['episode-1','episode-2']),artwork:id==='discussion-cards'?{src:'./artwork/discussion-cover.webp',alt:'Tanglebay Friends — The Discussion Cards cover, surrounded by illustrated characters.'}:id==='five-minutes'?{src:'./artwork/stand-image-2.webp',alt:'5 Seconds for a Stand board cover with Agree, Disagree and It Depends spaces.'}:id==='dimitris-lab'?{src:'./artwork/lab-image-1.webp',alt:'Inside Dimitri’s Lab cover featuring Dimitri welcoming future scientists.'}:id==='officers-investigation'?{src:'./artwork/investigation-image-3.webp',alt:'Officer’s Investigation Notebook cover — The Pearl’s Heaven Case.'}:id==='wild-path'?{src:'./artwork/wild-path-image-2.webp',alt:'The Wild Path board game cover featuring the board, character cards and dice.'}:{alt:`Artwork placeholder for ${title}`},gallery:id==='discussion-cards'?[
 {src:'./artwork/discussion-cover.webp',alt:'Discussion Cards cover'},
 {src:'./artwork/discussion-preview-1.webp',alt:'Discussion card from page 96 about hiding the truth to protect someone'},
 {src:'./artwork/discussion-preview-2.webp',alt:'Discussion card from page 43 about speaking truth with care'},
 {src:'./artwork/discussion-preview-3.webp',alt:'Discussion card from page 13 about respecting boundaries'},
]:id==='five-minutes'?[{src:'./artwork/stand-image-2.webp',alt:'5 Seconds for a Stand board cover'},{src:'./artwork/stand-image-1.webp',alt:'Disagree dice template'},{src:'./artwork/stand-image-3.webp',alt:'5 Seconds for a Stand question sheet'}]:id==='dimitris-lab'?[{src:'./artwork/lab-image-1.webp',alt:'Inside Dimitri’s Lab cover'},{src:'./artwork/lab-image-3.webp',alt:'Dimitri’s assistant welcome and contract sheet'},{src:'./artwork/lab-image-2.webp',alt:'Dimitri’s Lab Command Center progress sheet'}]:id==='officers-investigation'?[{src:'./artwork/investigation-image-3.webp',alt:'Investigation workbook cover — The Pearl’s Heaven Case'},{src:'./artwork/investigation-image-1.webp',alt:'Investigation preparation, materials and journey overview'},{src:'./artwork/investigation-image-2.webp',alt:'Case file one — A Red Paint Catastrophe'}]:id==='wild-path'?[{src:'./artwork/wild-path-image-2.webp',alt:'The Wild Path board game cover'},{src:'./artwork/wild-path-image-1.webp',alt:'Erica the mole character card'},{src:'./artwork/wild-path-image-3.webp',alt:'The Wild Path challenge sheet'}]:undefined,variants:{home:variant(id,title,'home'),group:variant(id,title,'group')}}));
