import { GeneratedPrompt, Metric } from "../types";

interface PromptGeneratorParams {
  category: string;
  subcategory: string;
  goal: string;
  metrics?: Metric[]; // Add optional metrics parameter
}

export const generatePrompt = ({ 
  category, 
  subcategory, 
  goal,
  metrics: providedMetrics 
}: PromptGeneratorParams): GeneratedPrompt => {
  // Generate base metrics if not provided
  const baseMetrics = providedMetrics || generateMetrics(category, subcategory, goal);
  
  // Extract key topics from the goal
  const keywords = goal.toLowerCase().split(' ')
    .filter(word => word.length > 3)
    .filter(word => !['write', 'create', 'make', 'develop', 'with', 'that', 'have', 'about'].includes(word));
  
  // Template-based prompt generation using the provided or generated metrics
  let promptText = "";
  
  switch (category) {
    case "creative-writing":
      promptText = generateCreativeWritingPrompt(subcategory, keywords, goal, baseMetrics);
      break;
    case "technical-writing":
      promptText = generateTechnicalWritingPrompt(subcategory, keywords, goal, baseMetrics);
      break;
    case "coding":
      promptText = generateCodingPrompt(subcategory, keywords, goal, baseMetrics);
      break;
    case "business":
      promptText = generateBusinessPrompt(subcategory, keywords, goal, baseMetrics);
      break;
    case "education":
      promptText = generateEducationPrompt(subcategory, keywords, goal, baseMetrics);
      break;
    default:
      promptText = `Generate a comprehensive response addressing the following: ${goal}`;
  }
  
  return {
    text: promptText,
    metrics: baseMetrics
  };
};

const generateCreativeWritingPrompt = (
  subcategory: string, 
  keywords: string[], 
  goal: string,
  metrics: Metric[]
): string => {
  const keyElements = keywords.slice(0, 3).join(", ");
  const tone = metrics.find(m => m.id === "tone")?.value || "neutral";
  const wordCount = metrics.find(m => m.id === "wordCount")?.value || 1000;
  const perspective = metrics.find(m => m.id === "perspective")?.value || "third person";
  
  let prompt = `Write a ${tone.toLowerCase()} story in ${perspective} perspective `;
  prompt += `(approximately ${wordCount} words) that incorporates these elements: ${keyElements}. `;
  
  switch (subcategory) {
    case "horror":
      prompt += "Create tension through psychological elements rather than gore. Include unexpected twists.";
      break;
    case "fantasy":
      prompt += "Develop a unique magic system or mythical creatures that feel consistent within your world's rules.";
      break;
    case "sci-fi":
      prompt += "Ground your story in plausible scientific principles while exploring innovative concepts.";
      break;
    default:
      prompt += goal;
  }
  
  return prompt;
};

const generateTechnicalWritingPrompt = (subcategory: string, keywords: string[], goal: string, metrics: Metric[]): string => {
  const keyElements = keywords.slice(0, 3).join(", ");
  const audience = metrics.find(m => m.id === "audience")?.value || "General audience";
  const format = metrics.find(m => m.id === "format")?.value || "Guide";
  
  switch (subcategory) {
    case "documentation":
      return `Create comprehensive ${format.toLowerCase()} documentation for ${keyElements}, targeted at ${audience}. Include clear explanations, examples, step-by-step instructions, and troubleshooting sections. Organize information logically with appropriate headings and navigation. ${goal}`;
    case "reports":
      return `Develop a detailed ${format.toLowerCase()} on ${keyElements} for ${audience}. Include an executive summary, methodology, findings, analysis, and recommendations. Support claims with data and research. Use clear, concise language appropriate for your target audience. ${goal}`;
    case "presentations":
      return `Design a presentation outline on ${keyElements} suitable for ${audience}. Structure content with a compelling introduction, key points with supporting evidence, and a memorable conclusion. Suggest visual elements that would enhance understanding of complex concepts. ${goal}`;
    default:
      return `Create technical content about ${keyElements} that is clear, accurate, and accessible to ${audience}. ${goal}`;
  }
};

const generateCodingPrompt = (subcategory: string, keywords: string[], goal: string, metrics: Metric[]): string => {
  const keyElements = keywords.slice(0, 3).join(", ");
  const complexity = metrics.find(m => m.id === "complexity")?.value || "Intermediate";
  const includeSnippets = metrics.find(m => m.id === "codeSnippets")?.value === "Yes";
  
  let prompt = `Write ${complexity.toLowerCase()}-level code that implements functionality for ${keyElements}. `;
  if (includeSnippets) {
    prompt += "Include detailed code snippets with explanations. ";
  }
  
  switch (subcategory) {
    case "javascript":
      return prompt + `Follow modern ES6+ best practices, handle edge cases, and provide usage examples. ${goal}`;
    case "python":
      return prompt + `Follow PEP 8 style guidelines, include error handling, and demonstrate usage scenarios. ${goal}`;
    case "web-development":
      return prompt + `Consider frontend and backend aspects, address performance, and implement responsive design. ${goal}`;
    case "ai-ml":
      return prompt + `Detail algorithm selection, data preprocessing, model training, and evaluation metrics. ${goal}`;
    default:
      return prompt + `Include comments, handle edge cases, and follow language-specific best practices. ${goal}`;
  }
};

const generateBusinessPrompt = (subcategory: string, keywords: string[], goal: string, metrics: Metric[]): string => {
  const keyElements = keywords.slice(0, 3).join(", ");
  const tone = metrics.find(m => m.id === "tone")?.value || "Professional";
  
  switch (subcategory) {
    case "strategy":
      return `Develop a ${tone.toLowerCase()} business strategy for ${keyElements}. Include market analysis, competitive positioning, SWOT analysis, and actionable recommendations. Support your strategy with relevant market data and industry trends. ${goal}`;
    case "marketing":
      return `Create a ${tone.toLowerCase()} marketing plan for ${keyElements}. Detail target audience segments, positioning, key messaging, channel strategy, and metrics for success. Align marketing objectives with broader business goals. ${goal}`;
    case "sales":
      return `Design a ${tone.toLowerCase()} sales approach for ${keyElements}. Include customer acquisition strategies, sales funnel optimization, objection handling, and relationship management techniques. Connect sales tactics to the unique value proposition. ${goal}`;
    default:
      return `Develop a ${tone.toLowerCase()} business-focused solution for ${keyElements} that addresses market needs and organizational objectives. ${goal}`;
  }
};

const generateEducationPrompt = (subcategory: string, keywords: string[], goal: string, metrics: Metric[]): string => {
  const keyElements = keywords.slice(0, 3).join(", ");
  const tone = metrics.find(m => m.id === "tone")?.value || "Academic";
  
  switch (subcategory) {
    case "study-guides":
      return `Create a ${tone.toLowerCase()} study guide for ${keyElements}. Include key concepts, explanations in simple language, examples, practice questions, and memory aids. Organize content in a logical progression from fundamental to advanced topics. ${goal}`;
    case "teaching":
      return `Develop ${tone.toLowerCase()} teaching resources for ${keyElements}. Include lesson plans, instructional strategies, assessment methods, and differentiation techniques for diverse learners. Connect content to curriculum standards where applicable. ${goal}`;
    case "subjects":
      return `Create ${tone.toLowerCase()} educational content about ${keyElements}. Present information accurately with appropriate depth for the target educational level. Include explanations, examples, visual representation ideas, and application opportunities. ${goal}`;
    default:
      return `Develop ${tone.toLowerCase()} educational content for ${keyElements} that promotes understanding and retention of key concepts. ${goal}`;
  }
};

export const generateMetrics = (category: string, subcategory: string, goal: string): Metric[] => {
  const metrics: Metric[] = [];
  
  // Common metrics for all categories
  metrics.push({
    id: "tone",
    name: "Tone",
    value: detectTone(goal),
    type: "select",
    options: ["Casual", "Professional", "Academic", "Conversational", "Formal", "Humorous"]
  });
  
  // Category-specific metrics
  if (category === "creative-writing") {
    metrics.push(
      {
        id: "wordCount",
        name: "Word Count",
        value: determineWordCount(subcategory),
        type: "number"
      },
      {
        id: "perspective",
        name: "Perspective",
        value: "Third person",
        type: "select",
        options: ["First person", "Second person", "Third person"]
      },
      {
        id: "setting",
        name: "Setting",
        value: determineSetting(goal, subcategory),
        type: "text"
      }
    );
  } else if (category === "technical-writing") {
    metrics.push(
      {
        id: "audience",
        name: "Audience",
        value: "Technical professionals",
        type: "select",
        options: ["Beginners", "Intermediate", "Advanced", "Technical professionals", "General audience"]
      },
      {
        id: "format",
        name: "Format",
        value: determineFormat(subcategory),
        type: "select",
        options: ["Report", "Guide", "Documentation", "Tutorial", "Case study"]
      }
    );
  } else if (category === "coding") {
    metrics.push(
      {
        id: "complexity",
        name: "Complexity",
        value: "Intermediate",
        type: "select",
        options: ["Beginner", "Intermediate", "Advanced", "Expert"]
      },
      {
        id: "codeSnippets",
        name: "Code Snippets",
        value: "Yes",
        type: "select",
        options: ["Yes", "No"]
      }
    );
  }
  
  return metrics;
};

const detectTone = (goal: string): string => {
  const text = goal.toLowerCase();
  
  if (text.includes('professional') || text.includes('formal')) {
    return 'Professional';
  } else if (text.includes('academic') || text.includes('research')) {
    return 'Academic';
  } else if (text.includes('funny') || text.includes('humor') || text.includes('joke')) {
    return 'Humorous';
  } else if (text.includes('conversation') || text.includes('chat')) {
    return 'Conversational';
  } else {
    return 'Casual';
  }
};

const determineWordCount = (subcategory: string): number => {
  switch (subcategory) {
    case 'horror':
    case 'fantasy':
    case 'sci-fi':
      return 1500;
    case 'mystery':
      return 2000;
    case 'romance':
      return 1200;
    default:
      return 1000;
  }
};

const determineSetting = (goal: string, subcategory: string): string => {
  const text = goal.toLowerCase();
  
  if (text.includes('futuristic') || text.includes('future')) {
    return 'Futuristic world';
  } else if (text.includes('medieval') || text.includes('ancient')) {
    return 'Medieval period';
  } else if (text.includes('modern') || text.includes('contemporary')) {
    return 'Contemporary setting';
  } else if (text.includes('urban')) {
    return 'Urban environment';
  } else if (text.includes('rural') || text.includes('country')) {
    return 'Rural countryside';
  }
  
  switch (subcategory) {
    case 'sci-fi':
      return 'Distant future';
    case 'fantasy':
      return 'Magical realm';
    case 'horror':
      return 'Isolated location';
    case 'mystery':
      return 'Small town';
    case 'romance':
      return 'Vibrant city';
    default:
      return 'Unspecified location';
  }
};

const determineFormat = (subcategory: string): string => {
  switch (subcategory) {
    case 'documentation':
      return 'Documentation';
    case 'reports':
      return 'Report';
    case 'presentations':
      return 'Presentation';
    default:
      return 'Guide';
  }
};