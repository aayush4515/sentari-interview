// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, it, expect } from 'vitest'
import processEntries from '../src/lib/sampleFunction.js'

describe('processEntries', () => {
  it('extracts tasks from curated mock entries (15)', () => {
    const mockEntries = [
      { transcript_user: 'Call grandma tomorrow at 5pm.', tags_user: ['family'] },
      { transcript_user: 'Buy groceries on Saturday morning.', tags_user: ['errand'] },
      { transcript_user: 'Schedule doctor appointment next week.', tags_user: [] },
      { transcript_user: 'Text John before class.', tags_user: [] },
      { transcript_user: 'Plan trip to Chicago.', tags_user: ['travel'] },
      { transcript_user: 'Book dentist appointment for next Friday.', tags_user: [] },
      { transcript_user: 'Read the article tonight.', tags_user: [] },
      { transcript_user: 'Walk the dog after lunch.', tags_user: ['pets'] },
      { transcript_user: 'Fix the sink tomorrow.', tags_user: ['home'] },
      { transcript_user: 'Organize notes before Monday.', tags_user: ['study'] },
      { transcript_user: 'Clean out the garage this weekend.', tags_user: ['chores'] },
      { transcript_user: 'Prepare dinner for the family tonight.', tags_user: ['food'] },
      { transcript_user: 'Email the professor by tomorrow morning.', tags_user: ['school'] },
      { transcript_user: 'Workout after lunch.', tags_user: ['health'] },
      { transcript_user: 'Message Sarah about the meeting.', tags_user: ['work'] }
    ] as any

    const result = processEntries(mockEntries)

    expect(result.summary).toContain('15 entries')
    expect(result.tasks.length).toBe(15)

    for (const task of result.tasks) {
      expect(task.task_text).toBeDefined()
      expect(task.status).toBe('pending')
      expect(task.category).toBeDefined()
    }

    // Spot-check a few known values
    expect(result.tasks[0].category).toBe('communication') // Call grandma
    expect(result.tasks[1].category).toBe('shopping') // Buy groceries
    expect(result.tasks[5].category).toBe('planning') // Book dentist
    expect(result.tasks[12].category).toBe('communication') // Email prof
  })
})
