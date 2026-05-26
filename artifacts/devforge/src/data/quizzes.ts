export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: "JavaScript" | "React" | "CSS" | "Algorithms";
  questionCount: number;
  duration: number; // minutes
  questions: Question[];
}

export const mockQuizzes: Quiz[] = [
  {
    id: "q1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of core JavaScript concepts including closures, hoisting, and event loop.",
    difficulty: "Medium",
    category: "JavaScript",
    questionCount: 5,
    duration: 10,
    questions: [
      {
        id: "q1_1",
        text: "What is the output of `console.log(typeof null)`?",
        options: ["'null'", "'object'", "'undefined'", "Throws an error"],
        correctIndex: 1,
        explanation: "In JavaScript, typeof null returns 'object'. This is a well-known bug in the language that has been kept for legacy compatibility."
      },
      {
        id: "q1_2",
        text: "Which of the following is NOT a JavaScript data type?",
        options: ["Number", "String", "Float", "Boolean"],
        correctIndex: 2,
        explanation: "JavaScript only has the 'Number' type, which represents both integers and floating-point numbers. There is no separate 'Float' type."
      },
      {
        id: "q1_3",
        text: "What will `console.log(1 + '2' + '2')` output?",
        options: ["'122'", "'5'", "122", "NaN"],
        correctIndex: 0,
        explanation: "The addition operator processes left-to-right. First, number 1 is added to string '2', resulting in string '12'. Then '12' is concatenated with '2', resulting in '122'."
      },
      {
        id: "q1_4",
        text: "What does the `isNaN()` function do?",
        options: ["Determines if a value is not a number", "Determines if a value is undefined", "Determines if a value is null", "Determines if a variable is undeclared"],
        correctIndex: 0,
        explanation: "The isNaN() function determines whether a value is NaN (Not-a-Number) or not."
      },
      {
        id: "q1_5",
        text: "How do you declare a variable that cannot be reassigned?",
        options: ["let", "var", "const", "static"],
        correctIndex: 2,
        explanation: "The 'const' keyword is used to declare variables that cannot be reassigned."
      }
    ]
  },
  {
    id: "q2",
    title: "Advanced React Hooks",
    description: "Deep dive into useMemo, useCallback, useRef, and custom hooks.",
    difficulty: "Hard",
    category: "React",
    questionCount: 5,
    duration: 15,
    questions: [
      {
        id: "q2_1",
        text: "What is the primary purpose of `useMemo`?",
        options: ["To memoize a callback function", "To cache the result of an expensive calculation", "To trigger a side effect", "To access DOM elements directly"],
        correctIndex: 1,
        explanation: "useMemo is used to memoize the result of an expensive computation so it's only re-calculated when its dependencies change."
      },
      {
        id: "q2_2",
        text: "When should you definitely NOT use `useEffect`?",
        options: ["Fetching data on mount", "Setting up subscriptions", "Updating state based on props to prepare for render", "Interacting with the browser API"],
        correctIndex: 2,
        explanation: "If you need to calculate some state based on props, it's better to do it during render. Using useEffect for this causes an extra render cycle."
      },
      {
        id: "q2_3",
        text: "What does `useRef` return?",
        options: ["A function to update state", "A mutable object whose `.current` property is initialized to the passed argument", "A frozen copy of the DOM element", "An immutable object"],
        correctIndex: 1,
        explanation: "useRef returns a mutable ref object whose .current property is initialized to the passed argument. It persists for the full lifetime of the component."
      },
      {
        id: "q2_4",
        text: "How does `useCallback` differ from `useMemo`?",
        options: ["useCallback returns a memoized callback, while useMemo returns a memoized value", "useCallback is for async operations", "They are exactly the same", "useMemo is for class components"],
        correctIndex: 0,
        explanation: "useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). It's a specialized version specifically for memoizing functions."
      },
      {
        id: "q2_5",
        text: "What happens if you provide an empty dependency array `[]` to `useEffect`?",
        options: ["It runs on every render", "It runs only once after the initial render", "It never runs", "It throws an error"],
        correctIndex: 1,
        explanation: "An empty dependency array tells React that your effect doesn't depend on any values from props or state, so it never needs to re-run. It only runs once."
      }
    ]
  },
  {
    id: "q3",
    title: "Modern CSS Mastery",
    description: "Test your skills with Flexbox, Grid, CSS Variables, and modern selectors.",
    difficulty: "Medium",
    category: "CSS",
    questionCount: 4,
    duration: 8,
    questions: [
      {
        id: "q3_1",
        text: "What does `align-items: center` do in a Flexbox container with `flex-direction: row`?",
        options: ["Centers items horizontally", "Centers items vertically", "Space items evenly", "Wraps items to the next line"],
        correctIndex: 1,
        explanation: "In a row direction flex container, the cross axis is vertical. align-items controls alignment on the cross axis, so it centers items vertically."
      },
      {
        id: "q3_2",
        text: "Which pseudo-class selects an element only if it's the very first child of its parent?",
        options: [":first-of-type", ":first-child", ":root", ":nth-child(0)"],
        correctIndex: 1,
        explanation: ":first-child selects any element that is the first child of its parent element."
      },
      {
        id: "q3_3",
        text: "How do you define a CSS custom property (variable) on the root element?",
        options: ["root { $var-name: value; }", ":root { --var-name: value; }", "html { @var-name: value; }", "body { var(--var-name): value; }"],
        correctIndex: 1,
        explanation: "CSS variables are defined by prefixing the name with -- inside a selector, commonly :root to make them globally available."
      },
      {
        id: "q3_4",
        text: "What is the difference between `display: none` and `visibility: hidden`?",
        options: ["They do exactly the same thing", "`visibility: hidden` removes the element from the document flow", "`display: none` removes the element from the document flow, `visibility: hidden` hides it but keeps its space", "`display: none` can be animated"],
        correctIndex: 2,
        explanation: "display: none completely removes the element from the layout, acting as if it's not there. visibility: hidden makes it invisible but it still takes up the same space in the layout."
      }
    ]
  },
  {
    id: "q4",
    title: "Data Structures & Algorithms",
    description: "Challenge yourself with essential algorithmic concepts and Big O notation.",
    difficulty: "Hard",
    category: "Algorithms",
    questionCount: 4,
    duration: 12,
    questions: [
      {
        id: "q4_1",
        text: "What is the time complexity of searching for an element in a balanced Binary Search Tree?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        correctIndex: 2,
        explanation: "In a balanced BST, each step cuts the search space in half, resulting in logarithmic time complexity, O(log n)."
      },
      {
        id: "q4_2",
        text: "Which data structure operates on a Last-In, First-Out (LIFO) principle?",
        options: ["Queue", "Stack", "Linked List", "Tree"],
        correctIndex: 1,
        explanation: "A stack is a LIFO (Last-In, First-Out) data structure, meaning the last element added is the first one to be removed (like a stack of plates)."
      },
      {
        id: "q4_3",
        text: "What is the worst-case time complexity of QuickSort?",
        options: ["O(n log n)", "O(n)", "O(n^2)", "O(1)"],
        correctIndex: 2,
        explanation: "QuickSort's worst-case time complexity is O(n^2), which occurs when the pivot chosen is consistently the smallest or largest element (e.g., when the array is already sorted)."
      },
      {
        id: "q4_4",
        text: "Which algorithmic paradigm does Dijkstra's shortest path algorithm use?",
        options: ["Divide and Conquer", "Dynamic Programming", "Greedy Algorithm", "Backtracking"],
        correctIndex: 2,
        explanation: "Dijkstra's algorithm is a Greedy algorithm because it makes the locally optimal choice at each step (picking the vertex with the smallest distance) with the hope of finding the global optimum."
      }
    ]
  }
];