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
export type GuidanceVisual = 'teams' | 'scene' | 'discuss' | 'refine' | 'flip' | 'opponent' | 'stand' | 'position' | 'case' | 'judges' | 'arena' | 'group-position' | 'group-judges' | 'questions';
export interface Step { lead?:string; closing?:string; visual?: GuidanceVisual; id: string; title: string; body: string; items?: string[] }
export interface GuidanceSection { placeholder?:boolean; id:string; title:string; description:string; steps:Step[] }
export interface PackFile { id: string; title: string; href: string; copies: string; optional?: boolean; placeholder?: boolean; pageCount?: number }
export interface DuplexGuide { previews: {src:string; alt:string; label:string}[]; flipEdge: string; orientation:string; cards:number }
export interface Variant { guidanceSections?: GuidanceSection[]; cubeAssembly?: {patternSrc:string;boardSrc:string}; comingSoonFiles?: string[]; duplexGuide?: DuplexGuide; guidanceLabel?: string; players: string; duration: string; steps: Step[]; printing: string; files: PackFile[] }
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

const standHomeSteps: Step[] = [
  {
    "id": "find-opponent",
    "title": "Find Your Opponent",
    "body": "Find someone ready to challenge you! This game works best with 2 or more players. With two players, you’ll debate each other. With more players, everyone else becomes a Judge for the round.",
    "visual": "opponent"
  },
  {
    "id": "build-stand",
    "title": "Build Your Stand",
    "body": "Print your board and get your three positions ready: AGREE, DISAGREE and IT DEPENDS.",
    "items": [
      "Feeling crafty? Cut out and build the 3D buttons.",
      "Want to get straight to the debate? Use the flat versions instead.",
      "Cut out the question cards, fold them, shuffle them and place them in a bowl or container."
    ],
    "visual": "stand"
  },
  {
    "id": "pick-question",
    "title": "Pick a Question",
    "body": "Draw a question and read it aloud. Each player has 5 seconds to take a stand: AGREE, DISAGREE or IT DEPENDS. No long strategic meeting with yourself. Five seconds means five seconds!",
    "items": [
      "Take turns drawing and reading the questions.",
      "Playing with Judges? They choose their own starting position before hearing either player’s argument. These starting choices do not score points.",
      "The 5-second limit is for choosing your position, not for explaining your argument."
    ],
    "visual": "position"
  },
  {
    "id": "make-case",
    "title": "Make Your Case",
    "body": "Explain your choice and defend your reasoning. Why did you choose that position? Listen to the other player’s argument, respond to their ideas and discuss where you agree or disagree. There isn’t always one right answer. A strong argument is one you can explain.",
    "items": [
      "Both players may choose the same position. If that happens, each explains their own reasoning; the Judges will compare the arguments, not just the positions."
    ],
    "visual": "case"
  },
  {
    "id": "judges-decide",
    "title": "Let the Judges Decide",
    "body": "Playing with more than two people? It’s persuasion time. After hearing both arguments, each Judge votes for the player whose argument convinced them most, whether or not they changed their starting position.",
    "items": [
      "Each final vote earns that player 1 point. Count the votes: the player with the most wins the round. Starting choices never count towards the score.",
      "If the two arguments are the same, it’s a draw. An equal final vote count is also a draw.",
      "Rotate Players and Judges, draw another question and go again. With only two players, skip the Judge vote and move to the next question."
    ],
    "visual": "judges"
  }
];

const standGroupSteps: Step[] = [
  {
    id:'set-rotation', title:'Choose Your Players & Judges', visual:'opponent',
    body:'The facilitator chooses two Players for the first round. Everyone else is a Judge. Before the game begins, set a clear rotation order so everyone knows when they will play and when they will judge.',
    items:['Announce the first pair and the order of the next pairs. Keep that order throughout the game.'],
  },
  {...standHomeSteps[1]},
  {
    id:'arrange-space', title:'Set Up Your Debate Space', visual:'arena',
    body:'This is a physical game! Put a table in the middle with the board on it. The two Players stand at opposite ends of the table, and the Judges begin in front of them.',
    items:['Leave space behind each Player for Judges to gather.','To support a Player, Judges run to stand behind them. Their final position will be their vote.'],
  },
  {
    id:'group-pick-question', title:'Pick a Question & Take Your Places', visual:'group-position',
    body:'Draw a question and read it aloud. The two Players have 5 seconds to choose AGREE, DISAGREE or IT DEPENDS. They may choose the same position.',
    items:['Before either argument begins, the facilitator gives the Judges 10 seconds to run behind the Player they initially agree with.','These are starting choices, not points. The final positions after the arguments will determine the score.','Take turns drawing and reading the questions. The 5-second limit is for choosing a position, not for explaining an argument.'],
  },
  {...standHomeSteps[3], body:standHomeSteps[3].body+' Judges listen to both arguments before the facilitator opens the final positioning window.'},
  {
    id:'group-final-vote', title:'Reposition, Count & Rotate', visual:'group-judges',
    body:'After both Players have made their case, the facilitator starts a 10-second timer. Judges run behind the Player whose argument convinced them most. They may stay where they are or switch sides.',
    items:['When the 10 seconds are up, count only the Judges standing behind each Player. Anyone behind neither Player has no vote for that round.','Each Judge behind a Player earns that Player 1 point. Only this final headcount counts, not the starting positions. The Player with the most votes wins.','If the two arguments are the same, it’s a draw. An equal final headcount is also a draw.','Follow the facilitator’s rotation order, choose the next two Players, draw another question and go again.'],
  },
  {
    id:'create-questions', title:'Create Your Own Questions', visual:'questions',
    body:'Want to keep playing? Invite the children to write their own questions for the next rounds. Create prompts that let players take a stand: AGREE, DISAGREE or IT DEPENDS.',
    items:['Try questions with more than one answer worth defending.','Cut out and fold the new questions, mix them into the bowl and keep playing.','Continue using the facilitator’s rotation order and the same debate and voting rules.'],
  },
];

const wildPathHomePreparation: Step[] = [
  {
    "id": "print-adventure",
    "title": "Print Your Adventure",
    "lead": "Print the game board, Character Cards, Challenge Map, Misery & Bonuses Map, tokens and Tanglebay Chunky Dice.",
    "body": "Keep the Challenge Map and Misery & Bonuses Map nearby. You’ll need to check them throughout the game."
  },
  {
    "id": "character-deck",
    "title": "Build Your Character Deck",
    "lead": "Cut out all the Character Cards and shuffle them into one deck.",
    "body": "Keep them face down for now.\nNo choosing favourites. The Wild Path will decide who’s joining your team. 👀"
  },
  {
    "id": "prepare-dice",
    "title": "Prepare Your Dice",
    "lead": "Cut, fold and build your Tanglebay Chunky Dice.",
    "body": "Already have a regular die at home? Use that instead and skip the craft.\nTanglebay bureaucracy has approved both methods. 💀"
  },
  {
    "id": "set-up-path",
    "title": "Set Up the Wild Path",
    "lead": "Place the board in the centre of the table and keep both reference maps where everyone can read them.",
    "body": "We recommend gently taping the edges of the board to the table.\nThis keeps it flat and makes moving your tokens much easier."
  },
  {
    "id": "ready-for-teams",
    "title": "You’re Ready",
    "lead": "Bring everyone around the board and place the shuffled Character Cards nearby.",
    "body": "Your Wild Path is ready.",
    "closing": "Now it’s time to build your teams."
  }
];

const wildPathHomeGameplay: Step[] = [
  {
    "id": "meet-team",
    "title": "Meet Your Team",
    "lead": "Each player randomly draws 4 Character Cards.",
    "body": "These four Tanglebay characters are your team for the entire journey.\nStudy their abilities carefully. You never know which one might save you later."
  },
  {
    "id": "choose-leader",
    "title": "Choose Your Team Leader",
    "lead": "Choose one of your four characters to represent your team on the board.",
    "body": "Cut out that character’s token and place it at the start of the Wild Path.",
    "closing": "Your Team Leader is your playing token, but all four members of your team can help you solve challenges."
  },
  {
    "id": "roll-and-move",
    "title": "Roll, Move & Follow the Path",
    "lead": "Take turns rolling the dice and move your Team Leader the number of spaces shown.",
    "body": "Follow the instruction on the space where you land.\nIf you encounter a Misery or Bonus, check the Misery & Bonuses Map.\nIf you encounter a Challenge, it’s time to put your team to work."
  },
  {
    "id": "face-challenge",
    "title": "Face a Challenge",
    "lead": "Read your challenge on the Challenge Map and decide which team member could handle it best.",
    "body": "If your chosen character is listed among the Good Picks, explain why their ability would help.\nIf your reasoning makes sense, you’ve solved the challenge. Follow the Challenge Map and continue your journey.",
    "closing": "Being a Good Pick doesn’t replace the explanation. You still have to connect the character’s ability to the problem."
  },
  {
    "id": "creative-solutions",
    "title": "Get Creative & Keep Moving!",
    "lead": "No Good Pick on your team? Get creative!",
    "body": "Combine the abilities of one or more team members to invent a solution. Explain your strategy and let the other players decide whether it works.\nHere’s what happens next:",
    "items": [
      "Challenge succeeded? Move forward one space.",
      "Challenge failed? Stay on your current space until your next turn, when you can roll the dice again."
    ],
    "closing": "Keep taking turns until someone reaches the end of the Wild Path!"
  }
];

const wildPathGroupPreparation: Step[] = [
  {
    "id": "group-print-adventure",
    "title": "Print Your Adventure",
    "lead": "Print one 8-page Wild Path Pack for each team.",
    "body": "Each pack contains the materials needed to play, including the game board, Character Cards, Challenge Map, Misery & Bonuses Map, character tokens and Tanglebay Chunky Dice.\nYou’ll also need a few small pieces of paper to create the Team IDs."
  },
  {
    "id": "create-team-ids",
    "title": "Create the Team IDs",
    "lead": "Choose a simple code for each team: colours, numbers, symbols… anything easy to match!",
    "body": "Write each Team ID on small pieces of paper, making enough matching IDs for the number of players you want in each team.\nFold them so the codes stay hidden and place them in a container beside the Character Card deck at the shared draw station.",
    "closing": "Don’t assign the teams yet. The players will discover them themselves."
  },
  {
    "id": "group-prepare-game",
    "title": "Prepare the Game",
    "lead": "Cut out the Character Cards, character tokens and Tanglebay Chunky Dice.",
    "body": "Shuffle the Character Cards and place them face down at the shared draw station, beside the folded Team IDs.\nBuild the Chunky Dice, or use regular dice if you already have some available.\nThen place the Challenge Map and Misery & Bonuses Map where they will be easy to read during play."
  },
  {
    "id": "group-set-up-path",
    "title": "Set Up the Wild Path",
    "lead": "Prepare one playing table for each team, with one game board and both reference maps.",
    "body": "We recommend gently taping the edges of each board to the table. This keeps it flat and makes it easier for children to slide their tokens along the path.\nKeep each team’s reference maps nearby."
  },
  {
    "id": "discover-team",
    "title": "Draw, Reveal & Find Your Team",
    "lead": "At the shared draw station, each player draws one folded Team ID and one random Character Card.",
    "body": "Once everyone has both, reveal your Team IDs and find the players with the same code.\nGather at your team’s table.",
    "closing": "Then reveal your Character Cards and meet your new Wild Path team!"
  }
];

const wildPathGroupGameplay: Step[] = [
  {
    "id": "group-choose-leader",
    "title": "Choose Your Team Leader",
    "lead": "Meet your new teammates and discover the characters on your team.",
    "body": "Choose one character to be your Team Leader.\nCut out that character’s token and place it at the start of the Wild Path. This is the token your whole team will move around the board.",
    "closing": "But remember: every character on your team can help solve challenges."
  },
  {
    "id": "group-roll-and-move",
    "title": "Roll, Move & Follow the Path",
    "lead": "Choose your first Roller and let the adventure begin!",
    "body": "Roll the dice and move your Team Leader the number of spaces shown.\nFollow the instruction on the space where you land.\nMisery or Bonus? Check the Misery & Bonuses Map.\nChallenge? Check the Challenge Map. Your team has a problem to solve!",
    "closing": "Rotate the Roller each turn so everyone gets a chance to roll and move the team."
  },
  {
    "id": "group-good-pick",
    "title": "Find a Good Pick",
    "lead": "Read the challenge and decide which character could handle it best.",
    "body": "Check the Good Picks listed for that challenge.\nHave one of them on your team? The player holding that Character Card explains how their character’s ability could solve the problem.\nA Good Pick isn’t an automatic win. You still need to explain your reasoning!",
    "closing": "If it makes sense, you’ve solved the challenge."
  },
  {
    "id": "group-creative-solution",
    "title": "Or Get Creative!",
    "lead": "No Good Pick on your team? Find another way through!",
    "body": "Use one or more of your team’s characters to invent a Creative Solution.\nIf several characters are involved, their players can work together to explain how their abilities combine.\nThe other players or Judges decide whether the solution is convincing.",
    "closing": "If they agree, your Creative Solution succeeds!"
  },
  {
    "id": "group-challenge-outcome",
    "title": "Succeed, Stay & Keep Going",
    "lead": "Now find out what happens to your team.",
    "body": "",
    "items": [
      "Challenge succeeded? Move your Team Leader forward one extra space.",
      "Challenge failed? Stay on the Challenge space. When your next turn comes, roll the dice again and continue from there.",
      "Then rotate the Roller and keep playing."
    ],
    "closing": "The first team to reach the end of the Wild Path wins!"
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
    files:[{id:'activity',title:'Discussion Cards — Home pack',href:'./packs/discussion-cards-home-pack.pdf',copies:'2 PDF pages → 1 double-sided sheet → 8 cards',placeholder:false,pageCount:2}],
    printing:'Print both PDF pages on opposite sides of ONE sheet, then cut along the dotted lines. Do not cut until both sides are printed.',
    duplexGuide:{orientation:'Landscape',flipEdge:'Short edge',cards:8,previews:[
      {src:'./artwork/discussion-pack-preview-1.webp',alt:'Fronts of the eight discussion cards, with story scenes and questions.',label:'Page 1 · Front'},
      {src:'./artwork/discussion-pack-preview-2.webp',alt:'Matching backs of the eight discussion cards, with follow-up questions.',label:'Page 2 · Back'},
    ]},
  };
  if (id === 'discussion-cards' && mode === 'group') return {
    guidanceLabel:'DISCUSSION GUIDANCE', players:'Small teams with a facilitator', duration:'',
    steps:discussionGroupSteps,
    files:[{id:'activity',title:'Team activity kit — Discussion Cards',href:'./packs/discussion-cards-home-pack.pdf',copies:'Each set: 2 PDF pages → 1 double-sided sheet → 8 cards',placeholder:false,pageCount:2}],
    comingSoonFiles:['Facilitation Guide'],
    printing:'Use the same cards as the Home pack. For each set, print both PDF pages on ONE sheet, double-sided in landscape, flipping on the short edge. Fit both pages to the printable area using the same scaling. Test one plain-paper sheet for alignment, then cut after both sides are printed.',
  };
  if (id === 'five-minutes') return {
    guidanceLabel:'DEBATE GUIDANCE', players:group?'Two Players, Judges and a facilitator':'2 or more players; extra participants judge the round', duration:'',
    steps:group?standGroupSteps:standHomeSteps,
    cubeAssembly:group?{patternSrc:'./artwork/stand-cube-pattern.webp',boardSrc:'./artwork/stand-assembly-board.webp'}:undefined,
    files:[{id:'activity',title:group?'Team activity kit — 5 Seconds for a Stand':'5 Seconds for a Stand — Home pack',href:'./packs/five-seconds-for-a-stand.pdf',copies:'5-page pack: board, three 3D position templates and question cards',placeholder:false,pageCount:5}],
    comingSoonFiles:group?['Facilitation Guide']:undefined,
    printing:'Choose the flat or 3D version. For flat play, use the board on page 1 and the questions on page 5. For 3D pieces, also print pages 2–4, then cut and assemble the templates. Cut out the questions, fold them and mix them in a bowl.',
  };
  if (id === 'wild-path') {
    const guidanceSections: GuidanceSection[] = [
      {id:'preparation',title:'Prepare the Game',description:'Five steps to get everything ready.',placeholder:false,steps:group?wildPathGroupPreparation:wildPathHomePreparation},
      {id:'gameplay',placeholder:false,title:'How to Play',description:'Five steps to understand the gameplay.',steps:group?wildPathGroupGameplay:wildPathHomeGameplay},
    ];
    return {guidanceSections, guidanceLabel:'ACTIVITY GUIDE',players:group?'One team per table; one Character Card per player':'Each player leads a team of 4 characters',duration:'',steps:guidanceSections.flatMap(section=>section.steps),files:[{id:'activity',title:group?'Team activity kit — The Wild Path':'The Wild Path — Home pack',href:'./packs/the-wild-path-home-pack.pdf',copies:group?'One 8-page pack per team · approx. 29 MB':'8 pages · approx. 29 MB · board, Character Cards, reference maps, tokens and Chunky Dice',placeholder:false,pageCount:8}],comingSoonFiles:group?['Facilitation Guide']:undefined,printing:'The pack includes the board (page 1), Challenge Map (page 2), tokens (page 3), Chunky Dice (page 4), Misery & Bonuses Map (page 5), and Character Cards (pages 6–8). The PDF uses large custom page sizes: check your paper size and scaling in print preview before printing. Keep both reference maps readable. Use a regular die if you prefer to skip the dice craft.'};
  }
  if (id === 'dimitris-lab' || id === 'officers-investigation') {
    const guidanceSections: GuidanceSection[] = [
      {id:'preparation',title:'Prepare the Game',description:'Five steps to get everything ready.',placeholder:true,steps:Array.from({length:5},(_,i)=>({id:`prepare-${i+1}`,title:`Preparation step ${i+1}`,body:'Preparation instructions will be added here.'}))},
      {id:'gameplay',title:'How to Play',description:'Five steps to understand the gameplay.',placeholder:true,steps:Array.from({length:5},(_,i)=>({id:`play-${i+1}`,title:`Gameplay step ${i+1}`,body:'Gameplay instructions will be added here.'}))},
    ];
    return {guidanceSections,guidanceLabel:'CONTENT PLACEHOLDER',players:group?'Group setup details coming soon':'Home setup details coming soon',duration:'',steps:guidanceSections.flatMap(section=>section.steps),files,printing:'Printing instructions will be added with the final activity materials.'};
  }
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
