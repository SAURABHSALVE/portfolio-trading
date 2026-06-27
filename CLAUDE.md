# CLAUDE.md — Portfolio Trading Project

**Project:** Saurabh Salve's AI/ML Portfolio Website
**Tech Stack:** React 18, Vite, React Router 7, Framer Motion, CSS3
**Status:** Production-ready with active blog system

---

## 1. Behavioral Guidelines

### Think Before Coding
- **State assumptions explicitly.** Don't assume feature scope. If unclear, ask before coding.
- **Surface tradeoffs.** Multiple valid approaches? List them with pros/cons.
- **Push back when warranted.** If a request seems incomplete or conflicts with architecture, name it.
- **Stop if confused.** Don't code around uncertainty. Clarify first.

### Simplicity First
- **Minimum viable code.** No speculative features, no "might be useful later" abstractions.
- **One job per component.** If a component does two unrelated things, split it.
- **Match existing patterns.** Don't invent new conventions for one file.
- **Delete unused code.** If your changes orphan an import/function, remove it immediately.

### Surgical Changes
- **One change per concern.** Blog post content ≠ quiz styling ≠ component refactor.
- **Don't improve adjacent code.** If you notice dead code unrelated to your task, mention it—don't delete it.
- **Preserve existing style.** Even if you'd write it differently, match the codebase.
- **Every line traces to the request.** If you can't explain why a line is there, remove it.

### Goal-Driven Execution
**Before starting, define success criteria:**
- "Add blog post" → Post loads, renders, has correct metadata, is in git
- "Fix bug" → Bug reproduces in a test, fix passes the test
- "Add quiz" → Quiz component loads, tracks state, shows feedback, resets

**Loop until verified.** Don't assume it works. Run the app and test the feature.

---

## 2. Project Architecture

### Folder Structure
```
src/
├── components/          # React components (reusable UI)
│   ├── ArticleQuiz.jsx  # Quiz question handler
│   ├── BlogList.jsx     # Blog index page
│   ├── BlogPost.jsx     # Blog post renderer (with quiz support)
│   ├── Navbar.jsx       # Navigation
│   ├── NavbarPremium.jsx # Enhanced navbar with neural animations
│   ├── NeuralLogo.jsx   # Animated logo
│   ├── Hero.jsx         # Landing section
│   ├── Experience.jsx   # Work history
│   ├── Projects.jsx     # Project grid
│   ├── Skills.jsx       # Skill showcase
│   ├── Education.jsx    # Education timeline
│   ├── Achievements.jsx # Awards/recognition
│   ├── Certifications.jsx
│   ├── Journey.jsx      # Career timeline
│   ├── Contact.jsx      # Contact form
│   ├── Footer.jsx       # Footer
│   ├── ThemeToggle.jsx  # Dark/light mode
│   ├── ReadingProgress.jsx # Blog scroll indicator
│   └── Cursor.jsx       # Custom cursor
├── pages/               # Full-page components (routed)
│   ├── BlogList.jsx     # Blog homepage
│   ├── BlogPost.jsx     # Individual blog post (renders content + quiz)
│   └── Skills.jsx       # Skills page
├── data/                # Static data (JSON-like JS objects)
│   ├── blogData.js      # Blog posts with content blocks + quizzes
│   ├── projectsData.js  # Project metadata
│   └── skillsData.js    # Technical skills
├── styles/              # Global + component styles
│   ├── index.css        # Global theme, typography, utilities
│   ├── theme-transition.css # Theme toggle animations
│   └── ArticleQuiz.css  # Quiz styling
├── context/             # React Context
│   └── ThemeContext.jsx # Dark/light mode state
├── hooks/               # Custom React hooks
│   ├── useCursor.js     # Custom cursor logic
│   └── useScrollReveal.js # Scroll-triggered animations
├── utils/               # Helper functions
│   └── ButterflyEffect.js # Animation utility
├── App.jsx              # Main app + routing
├── main.jsx             # React entry point
└── index.css            # Global styles
```

### Tech Stack Justification
- **React 18** — Component-based UI, hooks, context for state
- **Vite** — Fast dev server, optimized builds, ES modules
- **React Router 7** — Client-side navigation without full page reloads
- **Framer Motion** — Smooth animations (scroll reveals, transitions)
- **CSS3** — Gradients, transforms, animations (no Tailwind to keep project lightweight)

---

## 3. Blog System Architecture

### Blog Post Structure
Blog posts live in `src/data/blogData.js` as JavaScript objects with this shape:

```javascript
{
  slug: 'unique-identifier-kebab-case',        // Used in URL: /blog/{slug}
  title: 'Post Title',
  category: 'GenAI' | 'Machine Learning' | 'Cloud / MLOps' | 'Learning' | 'Project Log' | 'Physics',
  tags: ['tag1', 'tag2'],                      // Metadata tags
  date: 'Jun 2026',                            // Display format
  readTime: '5 min read',                      // Calculated or manual
  featured: false,                             // Shows on homepage?
  excerpt: 'One-liner summary for listing',
  stats: [                                     // Optional: featured post stats
    { num: '10x', label: 'Speedup via LCM' }
  ],
  content: [ /* content blocks */ ]
}
```

### Content Block Types
Blocks render in sequence. Each block has a `type` and type-specific fields:

| Type | Fields | Renders as | Example |
|------|--------|-----------|---------|
| `h2` | `text` | `<h2>` heading | Section title |
| `h3` | `text` | `<h3>` subheading | Subsection |
| `p` | `text` | `<p>` paragraph | Body text (supports `` `code` `` via InlineText) |
| `list` | `items: [...]` | `<ul><li>` | Bulleted list |
| `highlight` | `text` | `<blockquote>` | Pull quote / highlight |
| `tip` | `text` | `<div class="article-tip">` with 💡 | Callout box |
| `code` | `text, lang?` | `<pre><code>` block | Code sample (lang: 'python', 'js', etc.) |
| `image` | `src, alt, caption?` | `<figure>` with `<img>` | Hero/content image |
| `quiz` | `title, description, questions` | `<ArticleQuiz>` | Interactive MCQ |

### Quiz Block Structure
```javascript
{
  type: 'quiz',
  title: 'Quiz Title',
  description: 'Optional subtitle',
  questions: [
    {
      text: 'Question text here?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: 1,  // Index of correct option (0-based)
      explanation: 'Why this is correct...'
    },
    // More questions...
  ]
}
```

### How to Add a Blog Post
1. Open `src/data/blogData.js`
2. Add new object to `BLOG_POSTS` array (before closing `]`)
3. Fill in required fields: slug, title, category, date, readTime, excerpt, content
4. Use block types listed above for content structure
5. For images: place in `public/blog-post-name/` and reference as `/blog-post-name/image.png`
6. Commit with message: "Add {title} blog post"

### How to Add a Quiz to a Blog Post
1. Open the post's content array in `blogData.js`
2. Add a quiz block before closing `]`:
```javascript
{ type: 'quiz', 
  title: 'Test Your Knowledge',
  description: 'Optional description',
  questions: [
    { text: '...?', options: [...], correct: 0, explanation: '...' },
    // More questions...
  ]
}
```
3. ArticleQuiz component handles rendering, state, scoring automatically
4. Commit: "Add quiz to {title} blog post"

### BlogPost Component Rendering
`src/pages/BlogPost.jsx` does the heavy lifting:
- Fetches post via `getPost(slug)` from route params
- Renders header: title, category badge, tags, date, readTime
- Renders ToC (table of contents) from h2 headings
- Maps content blocks through `<Block>` component
- Renders related posts (same category, top 2)
- Renders footer: back link, share buttons (Twitter/LinkedIn)

**Key detail:** Quiz blocks are rendered by `<ArticleQuiz quiz={block} />` with full interactivity.

---

## 4. Quiz System (ArticleQuiz Component)

### How It Works
1. **State:** `answers` (selected option index per question) + `showResults` (correct/incorrect)
2. **On click:** `handleOptionClick(qIdx, optionIdx)` compares to `questions[qIdx].correct`
3. **Visual feedback:** Green (✓) if correct, red (✗) if incorrect, shows correct answer
4. **Score:** Displays when all questions answered, with "Try Again" button to reset

### User Flow
1. User sees quiz section with questions
2. Clicks an option → option highlights + button disabled for that question
3. If correct: green highlight + explanation shown
4. If incorrect: red highlight + correct answer shown
5. After all questions: score displayed + reset button available

### Component Props
```javascript
<ArticleQuiz quiz={{
  title: 'Quiz Title',
  description: 'Subtitle',
  questions: [
    {
      text: 'Question?',
      options: ['A', 'B', 'C', 'D'],
      correct: 0,           // Index of correct option
      explanation: 'Why...' // Shown on correct answer
    }
  ]
}} />
```

### Styling (ArticleQuiz.css)
- Gradient background: blue → purple
- Color scheme: green (#10b981) for correct, red (#ef4444) for incorrect
- Responsive: desktop (flex row) → mobile (full width)
- Animations: smooth transitions, hover effects on options
- Icons: ✓ (checkmark) for correct, ✗ (cross) for incorrect

---

## 5. Component Patterns & Guidelines

### Don't Import Components Directly
❌ **Bad:**
```javascript
import BlogPost from '../src/pages/BlogPost'
```

✅ **Good:** Use React Router for navigation:
```javascript
<Link to="/blog/post-slug">Read post</Link>
// In App.jsx, define the route
<Route path="/blog/:slug" element={<BlogPost />} />
```

### State Management
- **Global state (theme, user prefs):** Use `ThemeContext` + `useContext`
- **Local state (form, UI):** Use `useState`
- **Persistent data (blog posts, projects):** Store in `src/data/*.js`, import as needed
- **No Redux.** Context + hooks handle all state needs for this project.

### Custom Hooks
- `useCursor()` — Custom cursor position tracking
- `useScrollReveal()` — Trigger animations on scroll
- Keep hooks in `src/hooks/`, export as named exports

### Naming Conventions
- **Components:** PascalCase (Hero.jsx, BlogPost.jsx)
- **Functions:** camelCase (getPost, handleClick)
- **Constants:** UPPER_SNAKE_CASE (MAX_WIDTH = 1200)
- **CSS classes:** kebab-case (article-body, quiz-option)
- **Data files:** camelCase (blogData.js, projectsData.js)

### Component Structure
```javascript
import { hooks, libraries }
import { components, utils }

function ComponentName({ prop1, prop2 }) {
  // State
  const [state, setState] = useState(...)
  
  // Hooks
  useEffect(() => { ... }, [dependencies])
  
  // Handlers
  const handleClick = () => { ... }
  
  // Render
  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  )
}

export default ComponentName
```

---

## 6. Styling & CSS Conventions

### Global Theme (src/index.css)
- **Color variables:** `--primary`, `--accent`, `--text-primary`, `--text-secondary`, `--bg-primary`, `--bg-secondary`, `--border-color`
- **Dark mode:** Variables redefined in `@media (prefers-color-scheme: dark)` or toggled via JS
- **Fonts:** System fonts (no external imports) for performance
- **Spacing:** Use `rem` units (1rem = 16px base)

### Component Styles
- **One CSS file per component:** `ComponentName.jsx` → `ComponentName.css`
- **BEM-inspired naming:** `.component-name`, `.component-name__element`, `.component-name--modifier`
- **No CSS-in-JS.** Keep styles in .css files for clarity and performance.
- **Responsive first:** Mobile-first approach, use `@media (min-width: ...)` for desktop

### Article Styling (Blog Posts)
- `.article-h2`, `.article-h3`, `.article-p`, `.article-list`, etc.
- `.article-image-figure` for hero/content images with captions
- `.article-tip` for callout boxes (💡 icon + text)
- `.article-code-block` for code samples with syntax-highlighted language labels

---

## 7. Git Workflow

### Commit Messages
Format: **Imperative + context + detail**

```
Add Linux Day 01 learning blog post

- Cover kernels, shells, bootloaders concepts
- Include 9 essential Linux commands
- Add interactive quiz with 5 questions
- All content from user's learning notes

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

### Branch Strategy
- **main:** Production-ready code
- **Feature branches:** `feature/blog-post-name`, `fix/bug-description`
- No force pushes to main

### Pull Request Checklist (if using)
- ✅ Code matches existing style
- ✅ No console errors/warnings
- ✅ Feature tested in browser (not just lint)
- ✅ Related blog posts/images added
- ✅ Commit message is clear

---

## 8. Common Tasks

### Add a Blog Post
1. **Content:** Create markdown in your editor or plain text
2. **Convert to blocks:** Split into h2/p/list/image sections
3. **Add to blogData.js:** Create post object with metadata + content array
4. **Images:** Place in `public/post-slug/` (e.g., `public/rag/image1.png`)
5. **Test:** `npm run dev`, navigate to `/blog/post-slug`, verify rendering
6. **Commit:** "Add {title} blog post"

### Refine Blog Writing
1. **Find the post** in `blogData.js` (search by slug)
2. **Edit content blocks** — fix text, remove em-dashes, improve flow
3. **Preview:** Dev server auto-reloads on save
4. **Commit:** "Refine {title} for better flow" or "Fix AI-sounding phrasing in {title}"

### Add Quiz to Existing Post
1. **Open post** in `blogData.js`
2. **Add before closing `]`:**
```javascript
{ type: 'quiz', title: '...', description: '...', questions: [...] }
```
3. **Test:** Quiz renders, interaction works (correct/incorrect feedback)
4. **Commit:** "Add quiz to {title} blog post"

### Update Theme Colors
1. Edit `src/index.css` — change `--primary`, `--accent`, etc.
2. All components automatically use new colors (via CSS variables)
3. Test dark mode toggle to ensure readability

### Add a New Page
1. **Create component:** `src/pages/NewPage.jsx`
2. **Define route:** Add to `App.jsx` routing config
3. **Add navigation:** Link in Navbar or footer
4. **Style:** Create `src/styles/NewPage.css` if complex
5. **Test:** Navigate to new route, verify rendering

---

## 9. Performance Considerations

### Build Optimization
- Vite auto-chunks React/vendor libraries (`vite.config.js`)
- No sourcemaps in production (faster builds)
- Image optimization: use `.webp` for large images, lazy load when possible

### Runtime Performance
- **Framer Motion:** Used only for scroll reveals + navbar animations (not on every component)
- **React Router:** Client-side navigation = no full page reloads
- **No external API calls** unless necessary (blog posts are static data)

### Bundle Size
- Keep component count reasonable (split when >200 lines)
- Don't add large dependencies without justification
- Use dynamic imports for heavy features (if needed)

---

## 10. Known Patterns & Anti-Patterns

### ✅ DO
- **Use content blocks** for new blog content (don't add new JSX for each post)
- **Keep data in `src/data/`** (separation of concerns)
- **Use CSS variables** for theming (consistency across app)
- **Keep components focused** (one job per component)
- **Test in browser** after changes (not just lint)

### ❌ DON'T
- **Hardcode content** into component JSX (use data files instead)
- **Create new component types** for blog features (extend Block component with new type)
- **Import nested paths** (use barrel exports if needed)
- **Override theme colors** in component CSS (use CSS variables)
- **Add logic to data files** (keep `src/data/*.js` as pure data)

---

## 11. Useful Commands

```bash
# Development
npm run dev              # Start Vite dev server (http://localhost:5173)
npm run build            # Build for production (outputs to dist/)
npm run preview          # Preview production build locally

# Git
git status               # Check changed files
git diff                 # View unstaged changes
git add <file>          # Stage file
git commit -m "..."     # Commit with message
git push                # Push to remote
```

---

## 12. Recent Features & Context

### Navbar Redesign (Premium AI Theme)
- Enhanced `NavbarPremium.jsx` component with neural network animations
- Animated `NeuralLogo.jsx` with neural connections
- Smooth transitions between light/dark theme

### RAG Blog Post
- Comprehensive blog post explaining Retrieval Augmented Generation
- 9 images integrated at semantic locations
- Natural flow with removed em-dashes for human-like writing

### Linux Learning Blog Post
- Day 01 learning notes: kernels, shells, bootloaders
- 25 content blocks covering fundamentals
- 5-question interactive quiz at end

### Quiz System (NEW)
- `ArticleQuiz.jsx` component for interactive MCQs
- State management: tracks answers, shows feedback
- Visual feedback: green for correct (✓), red for incorrect (✗)
- Shows correct answer when user selects wrong option
- Score calculation and reset functionality

---

## 13. Debugging Tips

### Blog Post Won't Render
1. Check slug matches URL (kebab-case, no spaces)
2. Verify `getPost(slug)` returns a post object in console
3. Ensure all content blocks have valid `type` values
4. Check for syntax errors in `blogData.js` (missing commas, unclosed brackets)

### Quiz Not Showing Feedback
1. Verify quiz block has `questions` array with `text`, `options`, `correct`, `explanation`
2. Check `correct` index matches option count (0-based, so 0-3 for 4 options)
3. Ensure ArticleQuiz component is imported in BlogPost.jsx

### Styling Not Applied
1. Check CSS file is imported in component
2. Verify class names match exactly (CSS is case-sensitive)
3. Check no CSS specificity conflict (dev tools → Elements → Styles)
4. Ensure global variables are defined in `src/index.css`

### Components Not Updating
1. Check state is being set correctly (`useState` initial value)
2. Verify dependency array in `useEffect` includes all used variables
3. Check for missing keys in `.map()` renders
4. Use React DevTools to inspect component state

---

## 14. When to Ask for Clarification

**Stop and ask if:**
- Task conflicts with existing architecture (e.g., "Add Redux" when using Context)
- Requirement is vague ("Make it better" vs. "Add X feature")
- Multiple valid approaches exist (prefer user input over guessing)
- Changes would require significant refactoring
- Timeline/scope seems unrealistic

**Example:** "I want to add a new blog section for tutorials. Should I create a new data file (tutorials.js) or extend the existing blog system with a new category filter?"

---

## 15. Reference Links & Docs

- **React:** https://react.dev (hooks, state, effects)
- **Vite:** https://vitejs.dev (config, optimization)
- **React Router:** https://reactrouter.com (routing, navigation)
- **Framer Motion:** https://www.framer.com/motion (animations)
- **MDN CSS:** https://developer.mozilla.org/en-US/docs/Web/CSS (reference)

---

## Summary

This project is a **content-focused portfolio** with an **extensible blog system**. The core philosophy:
- **Blog posts are data**, not code
- **Components are dumb** (they render what you give them)
- **Styling is systematic** (CSS variables, class naming conventions)
- **Changes are surgical** (touch only what's needed)
- **Features verify in the browser** (not just in tests)

When adding features, default to:
1. Adding data (new blog post, quiz)
2. Extending existing components (new block type)
3. Only then: new components or refactoring

Keep it simple. Keep it working. Keep it verified.
