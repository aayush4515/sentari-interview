## 1. How do you detect actionable intent?
I detect actionable intent by looking for imperative verb phrases that signal a user’s intent to do something. For example, entries like “Call grandma,” “Buy groceries,” or “Book a dentist appointment” start with a command-like verb and are typically short, direct, and task-oriented.

Key signals:

- Imperative verbs (e.g., call, buy, fix, send)

- Verb + object patterns (e.g., "text John", "walk the dog")

- Temporal cues like “tomorrow,” “next week,” or specific times help extract due dates.

This approach mirrors how voice assistants and productivity apps parse commands—focusing on action-first language.

## 2. Why this structure?
I structured each extracted task with the following fields:

- task_text: the raw instruction or sentence

- due_date: extracted using temporal phrases (if available)

- status: defaulted to pending

- category: inferred from keywords (e.g., “doctor” → health, “buy” → errand)

This schema is clean, flexible, and extensible. It supports both user-facing features (like reminders or daily planning) and backend features (like tagging, filtering, and summarization). It also aligns well with existing productivity tools and Supabase schema design.

## 3. How would this integrate into reminders or summaries?
This structured output enables seamless integration into:

- Reminders: Each task with a due_date can trigger push notifications or be added to a calendar.

- Summaries: Users can receive daily or weekly overviews (e.g., “You have 3 upcoming tasks this week in categories: health, errands, and home.”)

- AI Coaching: Tasks can be prioritized or bundled (e.g., “You mentioned booking a dentist—shall I help you find one nearby?”)

By turning unstructured voice notes into structured data, Sentari can become not just a journal but a proactive assistant that supports well-being, planning, and follow-through.

