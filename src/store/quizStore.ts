import { create } from "zustand";

export type QuizAnswer = number | null;

export interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; value: number }[];
}

interface QuizState {
  currentQuestion: number;
  answers: QuizAnswer[];
  isComplete: boolean;
  score: number;
  setAnswer: (questionIndex: number, value: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  calculateScore: () => void;
  reset: () => void;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "In a discussion, you notice a gap in someone’s reasoning. You tend to:",
    options: [
      { label: "Let the point finish, then revisit it with a related angle", value: 8 },
      { label: "Introduce a slightly different perspective that shifts the direction", value: 10 },
      { label: "Ask for clarification on a specific part", value: 9 },
      { label: "Hold the thought and see if it resolves naturally", value: 7 },
    ],
  },
  {
    id: 2,
    question: "When forming a response in real time, you usually:",
    options: [
      { label: "Start with a general idea and refine while speaking", value: 9 },
      { label: "Structure key points mentally before starting", value: 10 },
      { label: "Respond based on the flow of the conversation", value: 8 },
      { label: "Focus on keeping it aligned with the context", value: 7 },
    ],
  },
  {
    id: 3,
    question: "If your explanation isn’t landing perfectly, you:",
    options: [
      { label: "Slightly adjust wording without stopping", value: 9 },
      { label: "Introduce a quick example to anchor it", value: 10 },
      { label: "Let the full thought complete before changing direction", value: 8 },
      { label: "Narrow down to one key point instead", value: 7 },
    ],
  },
  {
    id: 4,
    question: "In moments of silence after you speak, you interpret it as:",
    options: [
      { label: "Processing time that doesn’t need interruption", value: 10 },
      { label: "A neutral pause in conversation rhythm", value: 8 },
      { label: "Space that could be used to reinforce your point", value: 7 },
      { label: "An opening for someone else to take over", value: 9 },
    ],
  },
  {
    id: 5,
    question: "When perspectives differ in a conversation, you:",
    options: [
      { label: "Explore the difference before stating your stance", value: 10 },
      { label: "Blend your view into the ongoing direction", value: 8 },
      { label: "Highlight one specific contrast point", value: 9 },
      { label: "Let multiple viewpoints exist without resolving", value: 7 },
    ],
  },
  {
    id: 6,
    question: "Before speaking in a key moment, your approach is:",
    options: [
      { label: "Holding a loose structure in mind", value: 10 },
      { label: "Locking one clear sentence to start with", value: 9 },
      { label: "Entering at the right moment in the flow", value: 8 },
      { label: "Waiting until your idea feels complete", value: 7 },
    ],
  },
  {
    id: 7,
    question: "If interrupted mid-thought, you usually:",
    options: [
      { label: "Re-enter once the flow allows", value: 9 },
      { label: "Slightly compress your remaining point", value: 8 },
      { label: "Let it pass and continue later if needed", value: 7 },
      { label: "Briefly signal continuation and finish", value: 10 },
    ],
  },
  {
    id: 8,
    question: "After conversations, your reflection tends to focus on:",
    options: [
      { label: "Overall clarity of what was expressed", value: 10 },
      { label: "Specific parts that could’ve been tighter", value: 9 },
      { label: "Whether the message aligned with the moment", value: 8 },
      { label: "How the interaction naturally unfolded", value: 7 },
    ],
  },
  {
    id: 9,
    question: "When explaining something, your instinct is to:",
    options: [
      { label: "Keep it adaptable based on reactions", value: 9 },
      { label: "Anchor it around one central idea", value: 10 },
      { label: "Let it follow a natural progression", value: 8 },
      { label: "Cover all necessary angles briefly", value: 7 },
    ],
  },
  {
    id: 10,
    question: "When your idea is questioned, you:",
    options: [
      { label: "Clarify your original intent more precisely", value: 9 },
      { label: "Reframe it from a different angle", value: 10 },
      { label: "Let the discussion evolve before stepping in", value: 7 },
      { label: "Address the specific point raised directly", value: 8 },
    ],
  },
];

export const useQuizStore = create<QuizState>((set, get) => ({
  currentQuestion: 0,
  answers: Array(quizQuestions.length).fill(null),
  isComplete: false,
  score: 0,

  setAnswer: (questionIndex, value) => {
    const answers = [...get().answers];
    answers[questionIndex] = value;
    set({ answers });
  },

  nextQuestion: () => {
    const { currentQuestion } = get();
    if (currentQuestion < quizQuestions.length - 1) {
      set({ currentQuestion: currentQuestion + 1 });
    }
  },

  prevQuestion: () => {
    const { currentQuestion } = get();
    if (currentQuestion > 0) {
      set({ currentQuestion: currentQuestion - 1 });
    }
  },

  calculateScore: () => {
    const { answers } = get();
    const total = answers.reduce<number>(
      (sum, val) => sum + (val ?? 0),
      0
    );
    // The maximum possible score is 100 (10 questions * 10 points)
    // The total is already out of 100, so we can just use the total directly.
    const scaledScore = Math.round(total);
    set({ score: scaledScore, isComplete: true });
  },

  reset: () => {
    set({
      currentQuestion: 0,
      answers: Array(quizQuestions.length).fill(null),
      isComplete: false,
      score: 0,
    });
  },
}));
