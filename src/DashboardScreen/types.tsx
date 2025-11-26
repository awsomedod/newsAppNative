interface SummaryRun {
  date_and_time: string;
  summaries: Array<Summary>;
}

interface Summary {
  title: string;
  summary: string;
  image: string;
}

interface Source {
  name: string;
  url: string;
  description: string;
}

export type { SummaryRun, Summary, Source };
