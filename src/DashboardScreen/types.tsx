interface SummaryRun {
  date_and_time: string;
  summaries: Array<Summary>;
}

interface Summary {
  title: string;
  summary: string;
  image: string;
  topic?: string;
  url?: string;
}

interface Source {
  name: string;
  url: string;
  description: string;
}

// Generation phase types
type GenerationPhase =
  | 'idle'
  | 'starting'
  | 'categorizing'
  | 'generating'
  | 'done';

// Live summary from SSE stream
interface LiveSummary extends Summary {
  index: number;
  topic: string;
}

export type { SummaryRun, Summary, Source, GenerationPhase, LiveSummary };
