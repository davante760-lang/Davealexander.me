import beverage from './beverageStory.js'
import samsaraStories from './samsaraStories.js'
import industryStories from './industryStories.js'
import transportStories from './transportStories.js'

export const dealStories = Object.fromEntries(
  [beverage, ...samsaraStories, ...industryStories, ...transportStories].map(story => [story.slug, story]),
)
