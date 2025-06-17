import { VoiceEntry, ProcessedResult } from './types'

/**
 * Local interface for task extraction
 * (Cannot modify types.ts, so we define this locally)
 */
interface ExtractedTask {
  task_text: string
  due_date?: string
  category?: string
  status: 'pending'
}

/**
 * Extended result type that includes tasks
 */
interface ExtendedProcessedResult extends ProcessedResult {
  tasks: ExtractedTask[]
}

// Common task verbs and their categories
const TASK_CATEGORIES: Record<string, string> = {
  call: 'communication',
  email: 'communication',
  text: 'communication',
  message: 'communication',
  buy: 'shopping',
  purchase: 'shopping',
  get: 'shopping',
  schedule: 'planning',
  plan: 'planning',
  book: 'planning',
  meet: 'meeting',
  meetup: 'meeting',
  review: 'review',
  check: 'review',
  read: 'reading',
  study: 'learning',
  learn: 'learning',
  practice: 'learning',
  exercise: 'health',
  workout: 'health',
  run: 'health',
  walk: 'health',
  cook: 'food',
  prepare: 'food',
  clean: 'chores',
  organize: 'chores',
  fix: 'maintenance',
  repair: 'maintenance',
}

// Common time expressions
const TIME_PATTERNS = [
  /(?:tomorrow|today|tonight|next week|next month|next year)/i,
  /(?:at|by|before|after)\s+\d{1,2}(?::\d{2})?\s*(?:am|pm)?/i,
  /(?:in|after)\s+\d+\s+(?:minutes?|hours?|days?|weeks?|months?)/i,
  /(?:on|this|next)\s+(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i,
]

/**
 * Helper function to extract tasks from a single transcript
 */
function extractTasks(text: string): ExtractedTask[] {
  const tasks: ExtractedTask[] = []
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(Boolean)
  
  for (const sentence of sentences) {
    // Look for imperative sentences or sentences with task-related verbs
    const words = sentence.toLowerCase().split(/\s+/)
    const firstWord = words[0]
    
    // Check if the sentence starts with a task verb or is imperative
    if (TASK_CATEGORIES[firstWord] || firstWord.endsWith('ing')) {
      let taskText = sentence
      let dueDate: string | undefined
      
      // Extract due date if present
      for (const pattern of TIME_PATTERNS) {
        const match = sentence.match(pattern)
        if (match) {
          dueDate = match[0]
          taskText = sentence.replace(match[0], '').trim()
          break
        }
      }
      
      // Determine category based on the first verb
      const category = TASK_CATEGORIES[firstWord] || 'other'
      
      tasks.push({
        task_text: taskText,
        due_date: dueDate,
        category,
        status: 'pending'
      })
    }
  }
  
  return tasks
}

/**
 * processEntries
 * --------------
 * PURE function — no IO, no mutation, deterministic.
 */
export function processEntries(entries: VoiceEntry[]): ExtendedProcessedResult {
  const tagFrequencies: Record<string, number> = {}
  const allTasks: ExtractedTask[] = []
  
  for (const e of entries) {
    // Process tags
    for (const tag of e.tags_user) {
      tagFrequencies[tag] = (tagFrequencies[tag] || 0) + 1
    }
    
    // Extract tasks from transcript
    const tasks = extractTasks(e.transcript_user)
    allTasks.push(...tasks)
  }
  
  return {
    summary: `Analyzed ${entries.length} entries, extracted ${allTasks.length} tasks`,
    tagFrequencies,
    tasks: allTasks
  }
}

export default processEntries 