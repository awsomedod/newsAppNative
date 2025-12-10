import { useState, useCallback, useRef } from 'react';
import { GenerationPhase, LiveSummary, Source, SummaryRun } from '../types';

const API_BASE_URL = 'https://news-service-802693362877.us-west2.run.app';

interface UseNewsGenerationProps {
  sources: Source[];
  token: string | null;
  onComplete?: (summaryRun: SummaryRun) => void;
}

interface UseNewsGenerationReturn {
  generateNews: () => void;
  resetState: () => void;
  cancelGeneration: () => void;

  isGenerating: boolean;
  error: string | null;
  phase: GenerationPhase;

  statusMessage: string;

  topics: string[];
  totalTopics: number;

  liveSummaries: LiveSummary[];
  isGeneratingSummaries: boolean;
  completedSummaries: number;
}

export function useNewsGeneration({
  sources,
  token,
  onComplete,
}: UseNewsGenerationProps): UseNewsGenerationReturn {
  // State
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [totalTopics, setTotalTopics] = useState(0);
  const [liveSummaries, setLiveSummaries] = useState<LiveSummary[]>([]);
  const [isGeneratingSummaries, setIsGeneratingSummaries] = useState(false);
  const [phase, setPhase] = useState<GenerationPhase>('idle');

  // Refs for XHR and collected summaries
  const xhrRef = useRef<XMLHttpRequest | null>(null);
  const collectedSummariesRef = useRef<LiveSummary[]>([]);

  const resetState = useCallback(() => {
    setIsGenerating(false);
    setError(null);
    setStatusMessage('');
    setTopics([]);
    setTotalTopics(0);
    setLiveSummaries([]);
    setIsGeneratingSummaries(false);
    setPhase('idle');
    collectedSummariesRef.current = [];
  }, []);

  const cancelGeneration = useCallback(() => {
    if (xhrRef.current) {
      xhrRef.current.abort();
      xhrRef.current = null;
    }
    resetState();
  }, [resetState]);

  const processSSEEvent = useCallback(
    (eventType: string, eventData: string) => {
      console.log(`Processing event: [${eventType}]`, eventData);

      let parsed: any;
      try {
        parsed = JSON.parse(eventData);
      } catch (e) {
        console.error('Failed to parse event data:', e);
        return;
      }

      switch (eventType) {
        case 'start':
          console.log('=== START EVENT ===', parsed);
          setPhase('starting');
          setStatusMessage(parsed.message || 'Starting news generation...');
          break;

        case 'status':
          console.log('=== STATUS EVENT ===', parsed);
          setStatusMessage(parsed.message || '');

          if (parsed.message?.includes('Generating summaries')) {
            setPhase('generating');
            setIsGeneratingSummaries(true);
            if (parsed.topicCount) {
              setTotalTopics(parsed.topicCount);
            }
          } else if (parsed.message?.includes('Categorizing')) {
            setPhase('categorizing');
          }
          break;

        case 'topic':
          console.log('=== TOPIC EVENT ===', parsed);
          setTopics(prev => [...prev, parsed.topicName]);
          setTotalTopics(parsed.totalTopics);
          break;

        case 'summary':
          console.log('=== SUMMARY EVENT ===', parsed);
          const newSummary: LiveSummary = {
            index: parsed.index,
            topic: parsed.topic,
            ...parsed.summary,
          };
          collectedSummariesRef.current.push(newSummary);
          setLiveSummaries(prev => [...prev, newSummary]);
          console.log(
            'Total collected summaries:',
            collectedSummariesRef.current.length,
          );
          break;

        case 'done':
          console.log('=== DONE EVENT ===', parsed);
          setPhase('done');
          setStatusMessage(parsed.message || 'All summaries completed.');

          const collectedSummaries = collectedSummariesRef.current;
          console.log('Final collected summaries:', collectedSummaries.length);

          if (onComplete && collectedSummaries.length > 0) {
            const summaryRun: SummaryRun = {
              date_and_time: new Date().toISOString(),
              summaries: collectedSummaries.map(s => ({
                title: s.title,
                summary: s.summary,
                image: s.image,
                topic: s.topic,
                url: s.url,
              })),
            };

            setTimeout(() => {
              setIsGenerating(false);
              onComplete(summaryRun);
            }, 1500);
          } else {
            setTimeout(() => {
              setIsGenerating(false);
            }, 1500);
          }
          break;

        default:
          console.warn('Unknown SSE event type:', eventType);
      }
    },
    [onComplete],
  );

  const generateNews = useCallback(() => {
    // Reset before starting
    setError(null);
    setTopics([]);
    setTotalTopics(0);
    setLiveSummaries([]);
    setIsGeneratingSummaries(false);
    collectedSummariesRef.current = [];

    const sourceUrls = sources.map(s => s.url).filter(Boolean);

    if (sourceUrls.length === 0) {
      setError('No sources available. Please add sources first.');
      return;
    }

    if (!token) {
      setError('No authentication token found');
      return;
    }

    console.log('=== STARTING NEWS GENERATION (XMLHttpRequest) ===');
    console.log('Source URLs:', sourceUrls);

    setIsGenerating(true);
    setPhase('starting');
    setStatusMessage('Connecting to server...');

    try {
      const xhr = new XMLHttpRequest();
      xhrRef.current = xhr;

      xhr.open('POST', `${API_BASE_URL}/generate-news-stream`);

      // Set headers
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.setRequestHeader('Content-Type', 'application/json');

      let buffer = '';
      let eventBuffer = '';

      xhr.onprogress = () => {
        // Get only the new data since last check
        const newData = xhr.responseText.substring(buffer.length);
        buffer = xhr.responseText;
        eventBuffer += newData;

        // SSE events are separated by double newlines
        const events = eventBuffer.split('\n\n');

        // Keep the last incomplete event in the buffer
        eventBuffer = events.pop() || '';

        // Process complete events
        for (const event of events) {
          if (event.trim()) {
            // Parse the SSE event
            const lines = event.split('\n');
            let eventType = '';
            let eventData = '';

            for (const line of lines) {
              if (line.startsWith('event:')) {
                eventType = line.substring(6).trim();
              } else if (line.startsWith('data:')) {
                eventData = line.substring(5).trim();
              }
            }

            // Process the event if we have data
            if (eventType && eventData) {
              processSSEEvent(eventType, eventData);
            }
          }
        }
      };

      xhr.onload = () => {
        console.log('=== XHR ONLOAD ===');
        console.log('Status:', xhr.status);
        xhrRef.current = null;

        // Process any remaining data in the buffer
        if (eventBuffer.trim()) {
          const lines = eventBuffer.split('\n');
          let eventType = '';
          let eventData = '';

          for (const line of lines) {
            if (line.startsWith('event:')) {
              eventType = line.substring(6).trim();
            } else if (line.startsWith('data:')) {
              eventData = line.substring(5).trim();
            }
          }

          if (eventType && eventData) {
            processSSEEvent(eventType, eventData);
          }
        }

        // If we didn't get a 'done' event, handle completion
        if (phase !== 'done' && !error) {
          setIsGenerating(false);
        }
      };

      xhr.onerror = () => {
        console.error('=== XHR ERROR ===');
        xhrRef.current = null;
        setError('An error occurred while generating news. Please try again.');
        setIsGenerating(false);
        setPhase('idle');
      };

      xhr.ontimeout = () => {
        console.error('=== XHR TIMEOUT ===');
        xhrRef.current = null;
        setError('Request timed out. Please try again.');
        setIsGenerating(false);
        setPhase('idle');
      };

      // Send the request
      xhr.send(JSON.stringify({ sources: sourceUrls }));
      console.log('XHR request sent');
    } catch (err: any) {
      console.error('Error creating XHR:', err);
      setError(err.message || 'Failed to start news generation');
      setIsGenerating(false);
      setPhase('idle');
    }
  }, [sources, token, processSSEEvent, phase, error]);

  return {
    generateNews,
    resetState,
    cancelGeneration,

    isGenerating,
    error,
    phase,

    statusMessage,

    topics,
    totalTopics,

    liveSummaries,
    isGeneratingSummaries,
    completedSummaries: liveSummaries.length,
  };
}
