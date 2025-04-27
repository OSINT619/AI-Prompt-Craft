import { Category } from "../types";

export const categories: Category[] = [
  {
    id: "creative-writing",
    name: "Creative Writing",
    subcategories: [
      {
        id: "genres",
        name: "Genres",
        description: "Various writing genres including Horror, Fantasy, Sci-Fi, Romance, Mystery, Thriller, Comedy"
      },
      {
        id: "tone",
        name: "Tone",
        description: "Writing tones such as Dark, Light, Emotional, Eerie, Inspirational, Satirical"
      },
      {
        id: "structure",
        name: "Structure",
        description: "Different writing formats like Short story, Poetry, Novella, Dialogue, Flash fiction"
      },
      {
        id: "character-development",
        name: "Character Development",
        description: "Create compelling characters including protagonists, antagonists, and supporting characters"
      },
      {
        id: "plot-elements",
        name: "Plot Elements",
        description: "Essential story components like conflict, resolution, subplots, twists, and cliffhangers"
      },
      {
        id: "setting",
        name: "Setting",
        description: "Story environments including urban, rural, historical, futuristic, and fantasy realms"
      }
    ]
  },
  {
    id: "technical-writing",
    name: "Technical Writing",
    subcategories: [
      {
        id: "documentation",
        name: "Documentation",
        description: "Create user manuals, API documentation, and knowledge bases"
      },
      {
        id: "reports",
        name: "Reports",
        description: "Write research papers, case studies, project summaries, and white papers"
      },
      {
        id: "presentations",
        name: "Presentations",
        description: "Design PowerPoint slides, pitch decks, and business proposals"
      },
      {
        id: "code-documentation",
        name: "Code Documentation",
        description: "Write inline comments, function descriptions, and setup guides"
      }
    ]
  },
  {
    id: "coding",
    name: "Coding and Development",
    subcategories: [
      {
        id: "programming-languages",
        name: "Programming Languages",
        description: "Code in Python, JavaScript, Java, C++, HTML/CSS, Ruby, and more"
      },
      {
        id: "algorithms",
        name: "Algorithms",
        description: "Implement sorting, searching, optimization, graphs, and dynamic programming"
      },
      {
        id: "web-development",
        name: "Web Development",
        description: "Build frontend, backend, and full stack applications using modern frameworks"
      },
      {
        id: "database",
        name: "Database",
        description: "Work with SQL, NoSQL, data modeling, database design, and queries"
      },
      {
        id: "ai-ml",
        name: "AI/ML",
        description: "Develop machine learning algorithms, neural networks, and NLP solutions"
      },
      {
        id: "testing",
        name: "Testing",
        description: "Create unit tests, integration tests, and automated test suites"
      }
    ]
  },
  {
    id: "education",
    name: "Education and Learning",
    subcategories: [
      {
        id: "subjects",
        name: "Academic Subjects",
        description: "Content for Math, Science, History, Language Arts, Geography, and more"
      },
      {
        id: "study-guides",
        name: "Study Guides",
        description: "Create summaries, flashcards, quizzes, and practice tests"
      },
      {
        id: "teaching-styles",
        name: "Teaching Styles",
        description: "Design interactive, lecture-based, discussion-based, and hands-on learning"
      },
      {
        id: "learning-methods",
        name: "Learning Methods",
        description: "Develop visual, auditory, kinesthetic, and reading/writing materials"
      }
    ]
  },
  {
    id: "business",
    name: "Business and Marketing",
    subcategories: [
      {
        id: "strategy",
        name: "Business Strategy",
        description: "Develop SWOT analysis, market research, and competitive analysis"
      },
      {
        id: "marketing",
        name: "Marketing",
        description: "Create content for SEO, social media, PPC, and branding"
      },
      {
        id: "sales",
        name: "Sales",
        description: "Design lead generation, customer retention, and sales funnel strategies"
      },
      {
        id: "finance",
        name: "Finance",
        description: "Prepare budgets, financial reports, and investment analyses"
      },
      {
        id: "operations",
        name: "Operations",
        description: "Improve processes, resource allocation, and supply chain management"
      }
    ]
  },
  {
    id: "health-fitness",
    name: "Health and Fitness",
    subcategories: [
      {
        id: "exercise",
        name: "Exercise",
        description: "Create workout plans, stretching routines, and fitness programs"
      },
      {
        id: "nutrition",
        name: "Nutrition",
        description: "Design meal plans and diet strategies (Keto, Vegan, etc.)"
      },
      {
        id: "mental-health",
        name: "Mental Health",
        description: "Develop stress management, meditation, and mindfulness practices"
      },
      {
        id: "wellness",
        name: "Wellness",
        description: "Create holistic health and lifestyle improvement plans"
      }
    ]
  },
  {
    id: "technology",
    name: "Technology and Innovation",
    subcategories: [
      {
        id: "emerging-tech",
        name: "Emerging Technologies",
        description: "Explore AI, blockchain, quantum computing, and augmented reality"
      },
      {
        id: "gadgets",
        name: "Gadgets and Devices",
        description: "Review smartphones, wearables, and smart home technology"
      },
      {
        id: "software",
        name: "Software",
        description: "Analyze operating systems, applications, and development tools"
      },
      {
        id: "tech-trends",
        name: "Future Trends",
        description: "Predict market growth and next-gen tech developments"
      }
    ]
  },
  {
    id: "entertainment",
    name: "Entertainment",
    subcategories: [
      {
        id: "movies",
        name: "Movies",
        description: "Write reviews, recommendations, and actor performance analyses"
      },
      {
        id: "tv-shows",
        name: "TV Shows",
        description: "Create plot analyses and series recommendations"
      },
      {
        id: "games",
        name: "Games",
        description: "Design game mechanics, reviews, and strategy guides"
      },
      {
        id: "music",
        name: "Music",
        description: "Write artist biographies, song analyses, and playlist creation"
      }
    ]
  },
  {
    id: "personal-development",
    name: "Personal Development",
    subcategories: [
      {
        id: "goal-setting",
        name: "Goal Setting",
        description: "Create SMART goals and action plans"
      },
      {
        id: "productivity",
        name: "Productivity",
        description: "Develop time management and task prioritization systems"
      },
      {
        id: "mindset",
        name: "Mindset",
        description: "Foster growth mindset and positive thinking"
      },
      {
        id: "leadership",
        name: "Leadership",
        description: "Improve communication skills and team management"
      }
    ]
  },
  {
    id: "social-issues",
    name: "Social Issues and Politics",
    subcategories: [
      {
        id: "current-events",
        name: "Current Events",
        description: "Analyze news, write opinion pieces, and cover political debates"
      },
      {
        id: "social-justice",
        name: "Social Justice",
        description: "Address equality, human rights, and activism"
      },
      {
        id: "economics",
        name: "Economics",
        description: "Examine global markets and economic theories"
      },
      {
        id: "environment",
        name: "Environment",
        description: "Cover climate change, sustainability, and environmental policy"
      }
    ]
  },
  {
    id: "philosophy-psychology",
    name: "Philosophy and Psychology",
    subcategories: [
      {
        id: "philosophical-topics",
        name: "Philosophical Topics",
        description: "Explore ethics, logic, existentialism, and metaphysics"
      },
      {
        id: "psychological-theories",
        name: "Psychological Theories",
        description: "Study cognitive behavior, psychoanalysis, and developmental psychology"
      },
      {
        id: "cognitive-science",
        name: "Cognitive Science",
        description: "Investigate perception, memory, and decision making"
      },
      {
        id: "behavioral-science",
        name: "Behavioral Science",
        description: "Analyze habits, motivation, and social influences"
      }
    ]
  },
  {
    id: "travel-lifestyle",
    name: "Travel and Lifestyle",
    subcategories: [
      {
        id: "destinations",
        name: "Destinations",
        description: "Write city guides and cultural experience recommendations"
      },
      {
        id: "travel-tips",
        name: "Travel Tips",
        description: "Create packing lists, budgeting guides, and transportation advice"
      },
      {
        id: "lifestyle-choices",
        name: "Lifestyle Choices",
        description: "Explore minimalism, slow living, and work-life balance"
      },
      {
        id: "hobbies",
        name: "Hobbies",
        description: "Guide through gardening, photography, painting, and cooking"
      }
    ]
  },
  {
    id: "law-legal",
    name: "Law and Legal",
    subcategories: [
      {
        id: "contracts",
        name: "Contracts",
        description: "Draft and review legal documents and clauses"
      },
      {
        id: "criminal-law",
        name: "Criminal Law",
        description: "Analyze crimes, defenses, and sentencing"
      },
      {
        id: "civil-law",
        name: "Civil Law",
        description: "Handle property disputes, family law, and contract disputes"
      },
      {
        id: "intellectual-property",
        name: "Intellectual Property",
        description: "Work with copyrights, patents, and trademarks"
      }
    ]
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    subcategories: [
      {
        id: "random-fun",
        name: "Random Fun",
        description: "Generate trivia, jokes, word games, and fun facts"
      },
      {
        id: "productivity-tools",
        name: "Productivity Tools",
        description: "Create task managers and habit trackers"
      },
      {
        id: "life-advice",
        name: "Life Advice",
        description: "Offer relationship tips, career advice, and stress management"
      },
      {
        id: "custom",
        name: "Custom Requests",
        description: "Handle any specific requests that don't fit other categories"
      }
    ]
  }
];