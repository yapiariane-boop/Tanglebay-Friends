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
export interface Step { roles?: {title:string;body:string}[]; prompts?:string[]; after?:string; lead?:string; closing?:string; visual?: GuidanceVisual; id: string; title: string; body: string; items?: string[] }
export interface GuidanceSection { placeholder?:boolean; id:string; title:string; description:string; steps:Step[] }
export interface PackFile { id: string; title: string; href: string; copies: string; optional?: boolean; placeholder?: boolean; pageCount?: number }
export interface DuplexGuide { previews: {src:string; alt:string; label:string}[]; flipEdge: string; orientation:string; cards:number }
export interface Variant { facilitationNote?: string; guidanceSections?: GuidanceSection[]; cubeAssembly?: {patternSrc:string;boardSrc:string}; comingSoonFiles?: string[]; comingSoonDescriptions?: Record<string,string>; duplexGuide?: DuplexGuide; guidanceLabel?: string; printNotice?: string; players: string; duration: string; steps: Step[]; printing: string; files: PackFile[] }
export interface Activity { introduction: {headline:string;body:string}; id: string; title: string; catchphrase: string; description: string; episodeIds: string[]; color: string; artwork: {src?: string; alt: string}; gallery?: {src: string; alt: string}[]; variants: Record<Mode, Variant> }
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
    "body": "The facilitator reads the first question aloud and gives teams plenty of time to reflect. Teams exchange opinions, refer to the story and agree on the key points they want to share. Different interpretations are welcome.",
    "visual": "discuss"
  },
  {
    "id": "share-and-refine",
    "title": "Share, Challenge & Refine",
    "body": "When teams are ready, each team presents its response. The facilitator selects interesting answers to explore further, asking questions that encourage clearer explanations, stronger evidence and alternative perspectives. Teams may refine their views.",
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
      "Rotate Players and Judges, draw another question and go again.",
      "Playing with just two people? Your opponent is also the person you need to convince. After both arguments, tell each other what you found convincing — even if you still disagree."
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
    "title": "Prepare One Shared Game",
    "lead": "Print one 8-page Wild Path Pack for the whole group.",
    "body": "Place one board in the centre, with the Challenge Map and Misery & Bonuses Map nearby. The pack contains 14 Character Cards. Prepare the character tokens and Chunky Dice, or use a regular die. All teams play on this shared board."
  },
  {
    "id": "create-team-ids",
    "title": "Create Your Team Codes",
    "lead": "Prepare a hidden colour or code for each team, with four matching slips per team.",
    "body": "Play with up to 12 character players in three teams of four. If there are more than 12 children, the facilitator chooses the 12 who will play as characters; all remaining children become Judges. The facilitator also acts as a Judge alongside them. Only character players draw a Team Code and a Character Card. For three teams, prepare twelve slips.\nFold the slips to hide their codes and place them in a container at the shared draw station."
  },
  {
    "id": "group-prepare-game",
    "title": "Prepare the Shared Draw Station",
    "lead": "Cut out the 14 Character Cards and shuffle them into one shared deck.",
    "body": "Keep the cards face down beside the folded Team Codes. Set unused character tokens aside, build the die if needed and leave space for every team around the same board. You can gently tape the board’s edges to the table to keep it flat."
  },
  {
    "id": "discover-team",
    "title": "Draw Your Team & Character",
    "lead": "Each player draws one folded Team Code and one Character Card from the shared deck.",
    "body": "Keep drawn cards out of the deck so every player has a different character. Reveal the codes and gather with your teammates around the shared board. Each child keeps their own Character Card; leave the two unused cards aside when twelve children play."
  },
  {
    "id": "group-choose-leader",
    "title": "Choose Your Team Leader",
    "lead": "Each team chooses one of its characters to represent it on the board.",
    "body": "Place that character’s token at the start. The whole team shares this token, but every player keeps their own Character Card. All of your team’s characters can help solve challenges."
  }
];

const wildPathGroupGameplay: Step[] = [
  {
    "id": "group-roll-and-move",
    "title": "Take Turns Around the Board",
    "lead": "Teams take turns rolling the die and moving their shared token.",
    "body": "Move the number of spaces shown and follow the instruction on the space where you land. Consult the Misery & Bonuses Map for a Misery or Bonus, or the Challenge Map for a Challenge. Rotate the child who rolls within each team."
  },
  {
    "id": "group-discuss-challenge",
    "title": "Discuss the Challenge Together",
    "lead": "There are 13 challenges along the Wild Path.",
    "body": "When your team lands on a Challenge space, read the matching challenge and discuss which of your characters could solve it."
  },
  {
    "id": "group-character-speaks",
    "title": "Let Your Character Speak",
    "lead": "The child whose character can help explains the solution on behalf of the team.",
    "body": "If the solution combines several characters’ abilities, those children explain their parts together. Being listed as a Good Pick does not replace explaining your reasoning."
  },
  {
    "id": "group-creative-solution",
    "title": "Try a Creative Solution",
    "lead": "No Good Pick on your team? Combine your characters’ abilities and propose another approach.",
    "body": "The Judges decide whether the explanation is convincing. For any solution, explain how the characters’ abilities help solve the challenge rather than simply naming a character."
  },
  {
    "id": "group-challenge-outcome",
    "title": "Resolve & Continue",
    "lead": "Resolve the challenge, then let the next team take its turn.",
    "body": "Challenge succeeded? Move your team’s token forward one extra space.\nChallenge failed? Stay where you are until your next turn, when you roll and move again.\nThe first team to reach the end of the Wild Path wins!"
  }
];

const labHomeSteps: Step[] = [
  {
    "id": "revisit-biology",
    "title": "Revisit the Biology Secrets",
    "body": "Read the Tanglebay Biology Secrets section at the end of the book. Choose a character and take another look at their animal adaptation. What makes their biology special?"
  },
  {
    "id": "prepare-research-kit",
    "title": "Get Your Research Kit Ready",
    "body": "Print the Home Kit and grab a pencil. Have scissors and glue ready to cut out your character’s portrait from the last page and add it to your research sheet. Your research adventure starts here!"
  },
  {
    "id": "sign-contract",
    "title": "Become Dimitri’s Research Assistant",
    "body": "Read and sign your assistant contract. Then explore your Command Center: start as a Junior Researcher with Ricky, Erica and Honey, before moving on to Dimitri, Mimi and Leon."
  },
  {
    "id": "investigate-nature",
    "title": "Investigate Nature’s Ideas",
    "body": "Complete your chosen character’s research pages. Describe their biology secret in your own words, then explore CHALLENGE → ADAPTATION → CONSEQUENCES → HUMAN COPYCATS.",
    "items": [
      "What problem did the animal face?",
      "What solution did nature develop?",
      "What changed because of it?",
      "Can you find human inventions or habits that use a similar idea? Unexpected ideas are welcome — explain how yours connect!"
    ]
  },
  {
    "id": "share-discoveries",
    "title": "Share Your Discoveries",
    "body": "Show your findings to family or friends. Explain your favourite Human Copycats and ask what examples they can think of. Tick off the character in your Command Center, then choose another friend whenever you’re ready.",
    "items": [
      "For each new character, reprint only the three research pages (pages 4–6 of the current PDF). Keep your contract and Command Center."
    ]
  }
];

const labGroupPreparation: Step[] = [
  {
    "id": "lab-prepare-1",
    "title": "Read the Tanglebay Biology Secrets",
    "lead": "Before starting this activity, read the Tanglebay Biology Secrets section at the end of the book.",
    "body": "It introduces the animal adaptations that researchers will explore in Dimitri’s Lab."
  },
  {
    "id": "lab-prepare-2",
    "title": "Form Your Research Teams",
    "lead": "Divide the children into small Research Teams before printing, so you know how many complete Lab Packs you need.",
    "body": "Children will begin by researching individually, then work with these teams."
  },
  {
    "id": "lab-prepare-3",
    "title": "Print Your Research Materials",
    "lead": "Print one Research Guidance Sheet per child and one complete Lab Pack per team.",
    "body": "Keep the complete Lab Packs aside until the Team Research phase. Children record their individual ideas on scrap paper, so they do not need a full pack each."
  },
  {
    "id": "lab-prepare-4",
    "title": "Gather Your Supplies",
    "lead": "Have scrap paper and pencils ready for every researcher.",
    "body": "Have extra paper and any drawing or craft materials teams can use for their Research Fair stands."
  }
];

const labGroupGameplay: Step[] = [
  {
    "id": "lab-play-1",
    "title": "Get Ready for Individual Research",
    "body": "",
    "roles": [
      {
        "title": "Researchers",
        "body": "Begin independently, even though you already belong to a Research Team. Record your own ideas before discussing them with others."
      },
      {
        "title": "Facilitator",
        "body": "Choose the character researchers will investigate. Give each child a Research Guidance Sheet, scrap paper and a pencil. Keep the complete Lab Packs aside."
      }
    ]
  },
  {
    "id": "lab-play-2",
    "title": "Start the Individual Research",
    "body": "",
    "roles": [
      {
        "title": "Researchers",
        "body": "Use your Research Guidance Sheet to work through CHALLENGE → ADAPTATION → CONSEQUENCES → PRINCIPLE → HUMAN COPYCATS. Record your thinking on scrap paper."
      },
      {
        "title": "Facilitator",
        "body": "Introduce the chosen character and let every researcher complete the Research Chain independently. Encourage unusual ideas when the reasoning makes sense. In Dimitri’s Lab, unexpected answers are new data! Once everyone has completed their individual research, move to Team Research."
      }
    ]
  },
  {
    "id": "lab-play-3",
    "title": "Open the Team Lab",
    "body": "",
    "roles": [
      {
        "title": "Researchers",
        "body": "Compare your individual findings, explain your Human Copycats and discuss which ideas are strongest. Together, complete the official research pages in your shared Lab Pack. Select your 3 strongest Human Copycat analogies to take to the Research Fair."
      },
      {
        "title": "Facilitator",
        "body": "Now give each Research Team one complete Lab Pack."
      }
    ]
  },
  {
    "id": "lab-play-4",
    "title": "Launch the Research Fair",
    "body": "",
    "roles": [
      {
        "title": "Researchers",
        "body": "Use posters, drawings, crafts, demonstrations or mini-presentations to showcase your findings however you like. Present findings from one character, several characters or combine your favourite discoveries. Visit the other teams’ stands to discover their research."
      },
      {
        "title": "Facilitator",
        "body": "Once teams have selected their strongest findings, give them time to build a small stand. Then open the Fair and invite researchers to visit one another’s stands."
      }
    ]
  },
  {
    "id": "lab-play-5",
    "title": "Share, Borrow & Reflect",
    "body": "",
    "roles": [
      {
        "title": "Researchers",
        "body": "Collect 1–2 strong Human Copycat analogies from other teams during the Research Fair. Note the name of each team whose idea you borrow. Back with your team, complete your Final Research Summary with your three selected analogies and the borrowed discoveries, giving credit to their original teams."
      },
      {
        "title": "Facilitator",
        "body": "Choose how teams share their completed research. Collect their Final Research Summaries, invite a representative from each team to explain their discoveries, or lead an informal class discussion. Focus on how researchers explain and develop their ideas. Different answers can be valuable when the reasoning makes sense."
      }
    ],
    "after": "Continue the Lab: choose another character and repeat the research cycle, or explore the next Lab Level when appropriate.",
    "items": [
      "Junior Researcher: Ricky · Erica · Honey",
      "Research Genius: Dimitri · Mimi · Leon"
    ]
  }
];

const investigationHomePreparation: Step[] = [
  {
    "id": "home-prepare-1",
    "title": "Print Your Investigation Notebook",
    "lead": "Print all 22 pages of the Home Investigation Notebook.",
    "body": "Check the paper size and scaling in print preview so that the instructions, writing spaces and craft templates remain readable."
  },
  {
    "id": "home-prepare-2",
    "title": "Keep Your Pages in Order",
    "lead": "Keep the pages in their original order with a paper clip.",
    "body": "Some pages contain pieces to cut out, so leave those accessible. You can staple the remaining investigation pages together to keep your notes safe."
  },
  {
    "id": "home-prepare-3",
    "title": "Gather Your Materials",
    "lead": "Have scissors, glue, a pencil and an eraser ready.",
    "body": "Keep the craft pieces together as you cut them out."
  },
  {
    "id": "home-prepare-4",
    "title": "Investigate Together",
    "lead": "For ages 7–9, we recommend an adult’s support with reading the conversations and understanding the instructions.",
    "body": "Reading the characters’ parts together can make the investigation a shared adventure. An adult can also help with cutting and hat assembly when needed."
  }
];

const investigationHomeGameplay: Step[] = [
  {
    "id": "home-play-1",
    "title": "Follow Honey’s Case",
    "lead": "Read the notebook in order and follow Honey’s instructions.",
    "body": "Look carefully at the pictures and conversations: small details may become important later."
  },
  {
    "id": "home-play-2",
    "title": "Build Your Officer’s Hat",
    "lead": "Cut out and assemble your Mini Officer’s Hat using the illustrated instructions.",
    "body": "Choose your department and attach its badge. Keep your hat nearby throughout the investigation."
  },
  {
    "id": "home-play-3",
    "title": "Read, Investigate and Use Your Equipment",
    "lead": "Read each interview and record the important details in the Officer’s Notes.",
    "body": "When you reach a challenge, choose one tool, cut it out and attach it to your hat to activate it. Complete “I chose”, “I used it by” and “This helped because” before continuing. Each tool can only be used once."
  },
  {
    "id": "home-play-4",
    "title": "Build Your Theory",
    "lead": "After reading all the conversations, complete one report board for each of the three suspects.",
    "body": "Consider both the evidence against them and what could suggest they are innocent. Then complete your Final Officer Report and explain how you think the crime happened."
  }
];

const investigationGroupPreparation: Step[] = [
  {
    "id": "set-investigation-teams",
    "title": "Form Your Investigation Teams",
    "lead": "Divide the children into small Investigation Teams.",
    "body": "Decide how many teams will take part before printing the materials."
  },
  {
    "id": "print-investigation-packs",
    "title": "Print and Distribute the Team Kits",
    "lead": "Print one complete 13-page Team Kit for each team.",
    "body": "Give each team its own kit to share throughout the investigation."
  },
  {
    "id": "choose-character-actors",
    "title": "Choose Your Character Actors",
    "lead": "Choose four children to play Bridget, Octena, Deedee and Moow.",
    "body": "The facilitator plays Honey and leads the interviews in front of the whole class."
  },
  {
    "id": "prepare-interviews",
    "title": "Keep the Interview Scripts with the Facilitator",
    "lead": "The facilitator keeps the Facilitator File and all interview scripts.",
    "body": "Give each actor access only to their own script, briefly before and during their scene. Investigation Teams must discover the information by watching and listening."
  },
  {
    "id": "gather-materials",
    "title": "Gather Your Materials",
    "lead": "Make sure every team has access to paper scissors, glue and a pen.",
    "body": "Have scrap paper ready for interview notes. Teams will cut, assemble, glue and write as they investigate."
  }
];

const investigationGroupGameplay: Step[] = [
  {
    "id": "make-investigator-hat",
    "title": "Make Your Investigator Hat",
    "body": "",
    "roles": [
      {
        "title": "Teams",
        "body": "The children in each team follow the Team Kit instructions to cut out and assemble one shared Investigator Hat for their team. They choose a Tanglebay department, cut out its crest and glue it onto the front of their hat."
      },
      {
        "title": "Facilitator",
        "body": "Help teams follow the craft instructions and coordinate department choices. With four teams or fewer, try to give each team a different department. With more than four teams, departments can be shared. Use department names to call on teams during the final presentations."
      }
    ]
  },
  {
    "id": "enter-investigation-scene",
    "title": "Open the Case with Bridget’s Interview",
    "body": "",
    "roles": [
      {
        "title": "Teams",
        "body": "The child playing Bridget performs the scene with Honey. The other children watch, listen carefully and take rough notes on scrap paper. Afterwards, teams use the five minutes provided to compare their notes and complete the official Interview Notes in their kit."
      },
      {
        "title": "Facilitator",
        "body": "Play Honey opposite the child playing Bridget. Bridget is the victim: her interview opens the case, so there is no challenge before it. Keep the scripts with you, giving the actor access only to their own script briefly before and during the scene. Allow five minutes after the interview for teams to put their notes together."
      }
    ]
  },
  {
    "id": "investigation-challenge",
    "title": "Complete a Challenge to Unlock the Next Interview",
    "body": "",
    "roles": [
      {
        "title": "Teams",
        "body": "Read the situation and discuss which tool could help. The children choose a tool, cut it out and glue it onto their Investigator Hat to activate it. Then complete the challenge sheet, explaining which tool they chose, why they chose it and how they would use it. Each tool can only be used once."
      },
      {
        "title": "Facilitator",
        "body": "Present the challenge situation. Once teams have completed the challenge and their explanations, lead the next suspect interview as Honey with the child playing that character."
      }
    ]
  },
  {
    "id": "repeat-investigation-cycle",
    "title": "Repeat the Investigation Cycle",
    "body": "The full case follows this order:",
    "items": [
      "Bridget’s interview → notes",
      "Challenge 1 → suspect interview → notes",
      "Challenge 2 → suspect interview → notes",
      "Challenge 3 → final suspect interview → notes"
    ],
    "after": "There are four interviews and three challenges in total.",
    "roles": [
      {
        "title": "Teams",
        "body": "Repeat the cycle: solve the challenge, watch the interview and take rough notes, then use the five minutes afterwards to discuss what you heard and complete your official Interview Notes."
      },
      {
        "title": "Facilitator",
        "body": "Lead the three challenges and suspect interviews in order. Keep interview scripts with you and allow five minutes after every interview for teams to complete their notes."
      }
    ]
  },
  {
    "id": "case-conference",
    "title": "Compare the Suspects and Present Your Findings",
    "body": "",
    "roles": [
      {
        "title": "Teams",
        "body": "After the final interview, complete the three Suspect Files together — one for each suspect. Discuss the evidence that makes each person suspicious and the evidence that could suggest they are innocent. Complete your Final Report, agree on your conclusion and present your department’s findings and reasoning."
      },
      {
        "title": "Facilitator",
        "body": "Honey calls on each department to present its findings. Once every team has presented, reveal what really happened."
      }
    ]
  }
];

const discussionDuplexGuide: DuplexGuide = {orientation:'Landscape',flipEdge:'Short edge',cards:8,previews:[
      {src:'./artwork/discussion-pack-preview-1.webp',alt:'Fronts of the eight discussion cards, with story scenes and questions.',label:'Page 1 · Front'},
      {src:'./artwork/discussion-pack-preview-2.webp',alt:'Matching backs of the eight discussion cards, with follow-up questions.',label:'Page 2 · Back'},
    ]};

// Other activity guidance and Group printable logistics remain prototype examples.
function variant(id: string, title: string, mode: Mode): Variant {
  const group = mode === 'group';
  const files: PackFile[] = [{id:'activity',title: group ? 'Shared team activity kit' : 'Home activity workbook',href:`./packs/${id}-${mode}-activity.pdf`,copies:group?'Example: one kit per team':'Example: one workbook per player'}];
  if (id === 'dimitris-lab' && !group) files[0]={id:'activity',title:'Inside Dimitri’s Lab — Home Kit',href:'./packs/dimitris-lab-home-kit.pdf',copies:'7-page Home Kit · approx. 9.8 MB',placeholder:false,pageCount:7};
  if (group) files.push({id:'guide',title:'Facilitation Guide',href:`./packs/${id}-group-guide.pdf`,copies:'Example: one copy for the facilitator'});
  if (id === 'officers-investigation') files.push({id:'evidence',title:'Evidence materials',href:`./packs/${id}-${mode}-evidence.pdf`,copies:group?'Example: one set per team':'Example: one set per household',optional:true});
  if (id === 'discussion-cards' && mode === 'home') return {
    guidanceLabel:'DISCUSSION GUIDANCE', players:'Play with a friend, sibling or adult', duration:'',
    steps:discussionHomeSteps,
    files:[{id:'activity',title:'Discussion Cards — Home pack',href:'./packs/discussion-cards-home-pack.pdf',copies:'2 PDF pages → 1 double-sided sheet → 8 cards',placeholder:false,pageCount:2}],
    printing:'Print both PDF pages on opposite sides of ONE sheet, then cut along the dotted lines. Do not cut until both sides are printed.',
    duplexGuide:discussionDuplexGuide,
  };
  if (id === 'discussion-cards' && mode === 'group') return {
    guidanceLabel:'DISCUSSION GUIDANCE', players:'Small teams with a facilitator', duration:'',
    steps:discussionGroupSteps,
    files:[{id:'activity',title:'Team activity kit — Discussion Cards',href:'./packs/discussion-cards-home-pack.pdf',copies:'Each set: 2 PDF pages → 1 double-sided sheet → 8 cards',placeholder:false,pageCount:2}],
    duplexGuide:discussionDuplexGuide,
    facilitationNote:'Start with the illustrated front of the card: reread the referenced story pages together, then explore what went wrong. Give teams time to reflect and share their answers before turning the card over to discuss what could have been done better. This is a slow-paced reading and reflection activity: take your time with each card.',
    printing:'Use the same cards as the Home pack. For each set, print both PDF pages on ONE sheet, double-sided in landscape, flipping on the short edge. Fit both pages to the printable area using the same scaling. Test one plain-paper sheet for alignment, then cut after both sides are printed.',
  };
  if (id === 'five-minutes') return {
    guidanceLabel:'DEBATE GUIDANCE', players:group?'Two Players, Judges and a facilitator':'2 or more players; extra participants judge the round', duration:'',
    steps:group?standGroupSteps:standHomeSteps,
    cubeAssembly:{patternSrc:'./artwork/stand-cube-pattern.webp',boardSrc:'./artwork/stand-assembly-board.webp'},
    files:[{id:'activity',title:group?'Team activity kit — 5 Seconds for a Stand':'5 Seconds for a Stand — Home pack',href:'./packs/five-seconds-for-a-stand.pdf',copies:'5-page pack: board, three 3D position templates and question cards',placeholder:false,pageCount:5}],
    comingSoonFiles:group?['Facilitation Guide']:undefined,
    printing:'Choose the flat or 3D version. For flat play, use the board on page 1 and the questions on page 5. For 3D pieces, also print pages 2–4, then cut and assemble the templates. Cut out the questions, fold them and mix them in a bowl.',
  };
  if (id === 'wild-path') {
    const guidanceSections: GuidanceSection[] = [
      {id:'preparation',title:'Prepare the Game',description:'Five steps to get everything ready.',placeholder:false,steps:group?wildPathGroupPreparation:wildPathHomePreparation},
      {id:'gameplay',placeholder:false,title:'How to Play',description:'Five steps to understand the gameplay.',steps:group?wildPathGroupGameplay:wildPathHomeGameplay},
    ];
    return {guidanceSections, guidanceLabel:'ACTIVITY GUIDE',players:group?'One shared board · up to 3 teams of 4 character players, plus Judges':'Each player leads a team of 4 characters',duration:'',steps:guidanceSections.flatMap(section=>section.steps),files:[{id:'activity',title:group?'Team activity kit — The Wild Path':'The Wild Path — Home pack',href:'./packs/the-wild-path-home-pack.pdf',copies:group?'One shared 8-page pack for the whole group · approx. 29 MB':'8 pages · approx. 29 MB · board, Character Cards, reference maps, tokens and Chunky Dice',placeholder:false,pageCount:8}],comingSoonFiles:group?['Facilitation Guide']:undefined,printing:(group?'Print one pack for the whole group: all teams share one board, one set of maps and one deck of 14 Character Cards. ':'')+'The pack includes the board (page 1), Challenge Map (page 2), tokens (page 3), Chunky Dice (page 4), Misery & Bonuses Map (page 5), and Character Cards (pages 6–8). The PDF uses large custom page sizes: check your paper size and scaling in print preview before printing. Keep both reference maps readable. Use a regular die if you prefer to skip the dice craft.'};
  }
  if (id === 'dimitris-lab' && !group) return {
    guidanceLabel:'RESEARCH GUIDANCE',players:'Explore independently or share your discoveries with family and friends',duration:'',steps:labHomeSteps,files,
    printing:'Print all 7 pages of the Home Kit once to get started. The character portraits are on page 7. For each new character, reprint only the three research pages (pages 4–6 of the current PDF); keep your contract, Command Center and remaining portraits. Check paper size and scaling in print preview before printing.',
  };
  if (id === 'dimitris-lab' && group) {
    const guidanceSections: GuidanceSection[] = [
      {id:'preparation',title:'Prepare the Game',description:'Before you begin: four steps to prepare your research.',placeholder:false,steps:labGroupPreparation},
      {id:'gameplay',title:'How to Play',description:'Five steps from individual research to the Research Fair.',placeholder:false,steps:labGroupGameplay},
    ];
    return {guidanceSections,guidanceLabel:'ACTIVITY GUIDE',players:'Individual researchers working in small Research Teams',duration:'',steps:guidanceSections.flatMap(section=>section.steps),files:[{id:'research-guidance',title:'Research Guidance Sheet',href:'./packs/dimitris-lab-research-guidance-sheet.pdf',copies:'One copy per child · 1 page',placeholder:false,pageCount:1},{id:'team-kit',title:'Complete Lab Pack',href:'./packs/dimitris-lab-group-team-kit.pdf',copies:'One copy per Research Team · 6 pages',placeholder:false,pageCount:6}],printing:'Print one Research Guidance Sheet per child and one complete Lab Pack per Research Team. Keep the complete Lab Packs aside until Team Research; children use scrap paper during individual research. The Group Kit includes character portraits on page 6; have scissors and glue ready to add a portrait to the research sheet. For a new character, reprint research pages 3–5 as needed and keep the contract, Command Center and remaining portraits.'};
  }
  if (id === 'officers-investigation' && !group) {
    const guidanceSections: GuidanceSection[] = [
      {id:'preparation',title:'Prepare the Game',description:'Four steps to get everything ready.',placeholder:false,steps:investigationHomePreparation},
      {id:'gameplay',title:'How to Play',description:'Four steps to follow your investigation.',placeholder:false,steps:investigationHomeGameplay},
    ];
    return {guidanceSections,guidanceLabel:'ACTIVITY GUIDE',players:'Ages 7–11 · adult reading support recommended for ages 7–9',duration:'45–90 minutes, or completed over several sessions',printNotice:'Home investigation notebook · 22 pages to print.',steps:guidanceSections.flatMap(section=>section.steps),files:[{id:'activity',title:'Home Investigation Notebook',href:'./packs/officers-investigation-home-notebook.pdf',copies:'22-page investigation notebook · approx. 3.3 MB',placeholder:false,pageCount:22}],printing:'Print all 22 PDF pages and keep them in order with a paper clip. Leave craft pages accessible for cutting; staple the remaining investigation pages if you wish. Check paper size and scaling in print preview before printing.'};
  }
  if (id === 'dimitris-lab' || id === 'officers-investigation') {
    const authoredInvestigationGroup=id==='officers-investigation'&&group;
    const guidanceSections: GuidanceSection[] = [
      {id:'preparation',title:'Prepare the Game',description:'Five steps to get everything ready.',placeholder:!authoredInvestigationGroup,steps:authoredInvestigationGroup?investigationGroupPreparation:Array.from({length:5},(_,i)=>({id:`prepare-${i+1}`,title:`Preparation step ${i+1}`,body:'Preparation instructions will be added here.'}))},
      {id:'gameplay',title:'How to Play',description:'Five steps to understand the gameplay.',placeholder:!authoredInvestigationGroup,steps:authoredInvestigationGroup?investigationGroupGameplay:Array.from({length:5},(_,i)=>({id:`play-${i+1}`,title:`Gameplay step ${i+1}`,body:'Gameplay instructions will be added here.'}))},
    ];
    return {guidanceSections,printNotice:authoredInvestigationGroup?'Print-heavy: 13 pages per team. The Team Kit is a shared investigation notebook; facilitator materials are separate.':id==='officers-investigation'?'Home investigation notebook · 22 pages to print.':undefined,guidanceLabel:authoredInvestigationGroup?'ACTIVITY GUIDE':'CONTENT PLACEHOLDER',players:authoredInvestigationGroup?'Small Investigation Teams with a facilitator':group?'Group setup details coming soon':'Home setup details coming soon',duration:authoredInvestigationGroup?'Around 45–60 minutes, depending on team size and discussion time.':'',steps:guidanceSections.flatMap(section=>section.steps),files:id==='officers-investigation'?[{...files[0],title:'Team Kit',...(group?{href:'./packs/officers-investigation-group-team-kit.pdf',placeholder:false,pageCount:13}:{}),copies:group?'Print-heavy: 13 pages per team · one shared investigation notebook':'Home investigation notebook · 22 pages to print'},...(group?[{id:'facilitator',title:'Facilitator File',href:'./packs/officers-investigation-group-facilitator.pdf',copies:'15-page facilitator guide · keep separate from the Team Kit',placeholder:false,pageCount:15}]:[])]:files,comingSoonFiles:id==='officers-investigation'&&!group?['Facilitator File']:undefined,printing:authoredInvestigationGroup?'Print one 13-page Team Kit per Investigation Team. This print-heavy pack is designed as a shared investigation notebook. Use the separate 15-page Facilitator File to lead the investigation. Keep it and the Actor Cards with the facilitator.':id==='officers-investigation'?'Print the 22-page Home investigation notebook and keep the pages in order.':'Print the 6-page Home Kit. Check paper size and scaling in print preview before printing.'};
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

const activityIntroductions: Record<string,{headline:string;body:string}> = {
  "discussion-cards": {
    "headline": "Big questions. Different perspectives. Better conversations.",
    "body": "Return to memorable moments from the story and explore the characters’ choices together. What went wrong? What could they have done differently? Read, reflect and share your ideas — the most interesting part might be hearing a perspective you hadn’t considered."
  },
  "five-minutes": {
    "headline": "Five seconds to choose your side. Then fight for it.",
    "body": "Join Leon for a fast-paced battle of opinions! Pick AGREE, DISAGREE or IT DEPENDS in just five seconds, then defend your position. Challenge your opponent’s reasoning, win over the Judges and turn a strong argument into a winning vote. Quick decisions, bold opinions — can you make the most convincing case?"
  },
  "wild-path": {
    "headline": "Your characters’ abilities are your way through the wild.",
    "body": "Gather your Tanglebay team and race along a path filled with surprises and 13 challenges. Choose which characters can help, combine their abilities and explain your solutions. A clever idea could be the move that gets your team ahead!"
  },
  "dimitris-lab": {
    "headline": "Nature has brilliant ideas. What will you discover?",
    "body": "Become Dimitri’s research assistant and uncover the biology behind Tanglebay’s characters. Explore how animal adaptations solve problems, then look for human inventions and everyday habits that use similar ideas. Turn your discoveries into research worth sharing!"
  },
  "officers-investigation": {
    "headline": "A wrecked shop. Conflicting stories. A case for you and Honey.",
    "body": "Someone has vandalised Bridget’s jewellery shop, and the suspects’ stories don’t quite add up. Build your Officer’s Hat, choose your equipment and investigate the clues. Compare the evidence, question your assumptions and build a case you can explain."
  }
};

export const activities: Activity[] = definitions.map(([id,title,description,color],index)=>({id,title,introduction:activityIntroductions[id],catchphrase:catchphrases[id],description,color,episodeIds:index===0?['episode-1','episode-2']:(index<3?['episode-1']:['episode-1','episode-2']),artwork:id==='discussion-cards'?{src:'./artwork/discussion-cover.webp',alt:'Tanglebay Friends — The Discussion Cards cover, surrounded by illustrated characters.'}:id==='five-minutes'?{src:'./artwork/stand-image-2.webp',alt:'5 Seconds for a Stand board cover with Agree, Disagree and It Depends spaces.'}:id==='dimitris-lab'?{src:'./artwork/lab-image-1.webp',alt:'Inside Dimitri’s Lab cover featuring Dimitri welcoming future scientists.'}:id==='officers-investigation'?{src:'./artwork/investigation-image-3.webp',alt:'Officer’s Investigation Notebook cover — The Pearl’s Heaven Case.'}:id==='wild-path'?{src:'./artwork/wild-path-image-2.webp',alt:'The Wild Path board game cover featuring the board, character cards and dice.'}:{alt:`Artwork placeholder for ${title}`},gallery:id==='discussion-cards'?[
 {src:'./artwork/discussion-cover.webp',alt:'Discussion Cards cover'},
 {src:'./artwork/discussion-preview-1.webp',alt:'Discussion card from page 96 about hiding the truth to protect someone'},
 {src:'./artwork/discussion-preview-2.webp',alt:'Discussion card from page 43 about speaking truth with care'},
 {src:'./artwork/discussion-preview-3.webp',alt:'Discussion card from page 13 about respecting boundaries'},
]:id==='five-minutes'?[{src:'./artwork/stand-image-2.webp',alt:'5 Seconds for a Stand board cover'},{src:'./artwork/stand-image-1.webp',alt:'Disagree dice template'},{src:'./artwork/stand-image-3.webp',alt:'5 Seconds for a Stand question sheet'}]:id==='dimitris-lab'?[{src:'./artwork/lab-image-1.webp',alt:'Inside Dimitri’s Lab cover'},{src:'./artwork/lab-image-3.webp',alt:'Dimitri’s assistant welcome and contract sheet'},{src:'./artwork/lab-image-2.webp',alt:'Dimitri’s Lab Command Center progress sheet'}]:id==='officers-investigation'?[{src:'./artwork/investigation-image-3.webp',alt:'Investigation workbook cover — The Pearl’s Heaven Case'},{src:'./artwork/investigation-image-1.webp',alt:'Investigation preparation, materials and journey overview'},{src:'./artwork/investigation-image-2.webp',alt:'Case file one — A Red Paint Catastrophe'}]:id==='wild-path'?[{src:'./artwork/wild-path-image-2.webp',alt:'The Wild Path board game cover'},{src:'./artwork/wild-path-image-1.webp',alt:'Erica the mole character card'},{src:'./artwork/wild-path-image-3.webp',alt:'The Wild Path challenge sheet'}]:undefined,variants:{home:variant(id,title,'home'),group:variant(id,title,'group')}}));
