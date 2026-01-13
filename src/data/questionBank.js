// data/questionBank.js

export const QUESTION_BANK = {
  aptitude: [
    {
      q: "What is 15% of 200?",
      a: "30",
      difficulty: "Easy",
      hints: "Multiply 200 by 0.15 (or 200 × 15 ÷ 100)"
    }
    ,
    {
      q: "If 3 workers can complete a job in 12 days, how many days will 6 workers take (same rate)?",
      a: "6",
      difficulty: "Easy",
      hints: "Work is inversely proportional to number of workers: double workers → half the time"
    },
    {
      q: "Find the next number: 2, 6, 12, 20, ?",
      a: "30",
      difficulty: "Medium",
      hints: "Sequence follows n*(n+1) for n = 1,2,3..."
    }
  ],

  technical: [
    {
      q: "What is the time complexity of binary search on a sorted array?",
      a: "O(log n)",
      difficulty: "Medium",
      hints: "The search space halves with each step"
    }
    ,
    {
      q: "Explain RESTful APIs: name two HTTP methods and their typical use.",
      a: "GET (retrieve resources), POST (create resources)",
      difficulty: "Easy",
      hints: "Think about idempotent vs non-idempotent methods and statelessness"
    },
    {
      q: "What is a race condition in concurrent programming?",
      a: "When two or more threads/processes access shared data concurrently causing unpredictable results",
      difficulty: "Medium",
      hints: "Consider synchronization primitives like locks or mutexes"
    }
  ],

  behavioral: [
    {
      q: "Tell me about a time when you had to work under tight deadlines.",
      a: "Keywords: Prioritization, Time Management, Communication, Delivery",
      difficulty: "Medium",
      hints: "Use STAR method: Situation, Task, Action, Result"
    }
    ,
    {
      q: "Describe a conflict you had with a teammate and how you resolved it.",
      a: "Keywords: Communication, Empathy, Compromise, Resolution, Outcome",
      difficulty: "Behavioral",
      hints: "Use the STAR method and focus on how you listened and reached a solution"
    },
    {
      q: "Give an example when you took initiative beyond your role.",
      a: "Keywords: Initiative, Ownership, Impact, Collaboration",
      difficulty: "Behavioral",
      hints: "Describe the situation, actions you took, and the measurable impact"
    }
  ],

  python: [
    {
      q: "What is the difference between a list and a tuple in Python?",
      a: "Lists are mutable, tuples are immutable",
      difficulty: "Easy",
      hints: "Think about whether elements can be changed after creation"
    }
    ,
    {
      q: "What is a list comprehension? Provide a simple example.",
      a: "A concise way to create lists, e.g., [x * 2 for x in range(5)]",
      difficulty: "Easy",
      hints: "Think of mapping and filtering in a single expression"
    },
    {
      q: "Explain generators and the `yield` keyword in Python.",
      a: "Generators produce values lazily using `yield`, making them memory-efficient for large sequences",
      difficulty: "Medium",
      hints: "Compare generator functions to functions that return lists"
    }
  ],

  statistics: [
    {
      q: "In a fair six-sided die, what is the probability of rolling an even number?",
      a: "1/2 or 0.5 or 50%",
      difficulty: "Easy",
      hints: "Even numbers: 2,4,6 → 3 out of 6 possible outcomes"
    }
    ,
    {
      q: "Define mean, median, and mode.",
      a: "Mean: arithmetic average; Median: middle value; Mode: most frequent value",
      difficulty: "Easy",
      hints: "Use simple examples like [1,2,2,3,4] to illustrate"
    },
    {
      q: "What is a p-value in hypothesis testing?",
      a: "The probability of observing data at least as extreme as the sample, assuming the null hypothesis is true",
      difficulty: "Medium",
      hints: "Lower p-values indicate stronger evidence against the null"
    }
  ]
  ,

  interface: [
    {
      q: "What is the box model in CSS and which properties affect it?",
      a: "Content + padding + border + margin; affected by width/height, padding, border, margin, box-sizing",
      difficulty: "Easy",
      hints: "Remember how padding and border change element size unless box-sizing is set"
    },
    {
      q: "Explain the purpose of `flex` and `grid` — when would you pick one over the other?",
      a: "Flex is 1D layout for rows/columns; Grid is 2D for complex two-dimensional layouts",
      difficulty: "Medium",
      hints: "Think about axis, alignment, and content vs. layout control"
    },
    {
      q: "How does virtual DOM improve performance in React?",
      a: "React batches changes in a lightweight virtual DOM and diffs to apply minimal real DOM updates",
      difficulty: "Medium",
      hints: "Mention reconciliation and fewer direct DOM manipulations"
    },
    {
      q: "Describe event delegation and why it's useful in web interfaces.",
      a: "Attach a single handler on a parent to manage events for many children; reduces listeners and supports dynamic elements",
      difficulty: "Easy",
      hints: "Think about using `event.target` and bubbling"
    },
    {
      q: "What accessibility (a11y) considerations should you include when building forms?",
      a: "Label elements, proper semantic HTML, keyboard focus order, ARIA when needed, error messages and instructions",
      difficulty: "Medium",
      hints: "Screen readers, `label` + `for`, and contrast"
    },
    {
      q: "How do you optimize web images and assets for fast UI performance?",
      a: "Use appropriate formats, compress, use responsive sizes, lazy-load below-the-fold images, use CDN and caching",
      difficulty: "Medium",
      hints: "Consider `srcset`, modern formats like WebP, and caching headers"
    },
    {
      q: "Explain CSS specificity and how to resolve conflicts between rules.",
      a: "Specificity is computed from inline, id, class, element selectors; resolve with more specific selectors or avoid `!important`",
      difficulty: "Easy",
      hints: "IDs are stronger than classes; inline styles beat stylesheet rules"
    },
    {
      q: "What is progressive enhancement and how does it affect front-end design?",
      a: "Build a baseline usable experience and enhance for capable browsers/users without breaking the baseline",
      difficulty: "Medium",
      hints: "Focus on core functionality first, then add JS/CSS features"
    },
    {
      q: "How would you implement responsive typography across devices?",
      a: "Use relative units (rem, em), fluid scaling with clamp() or vw-based math, and media queries for breakpoints",
      difficulty: "Medium",
      hints: "Consider base font-size and accessibility (user zoom)"
    },
    {
      q: "Give an example of a UX decision you made to reduce cognitive load in an interface.",
      a: "Answers will vary; look for structure, progressive disclosure, clear affordances, and consistent patterns",
      difficulty: "Behavioral",
      hints: "STAR-style: Situation, Task, Action, Result"
    }
  ]
};