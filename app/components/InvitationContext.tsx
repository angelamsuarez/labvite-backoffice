'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

/* ── Types ─────────────────────────────────────────────────── */

export type HeaderVariant = 'classic' | 'triptych' | 'bold' | 'minimal';
export type SaveDateVariant = 'calendar' | 'schedule' | 'hearts' | 'circle';
export type RsvpVariant = 'dark' | 'light';
export type DressCodeVariant = 'pastel' | 'clean' | 'dark';
export type LocationVariant = 'map' | 'venue';

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  emoji: string;
}

export interface InvitationData {
  // Header
  headerVariant: HeaderVariant;
  headerImageUrl: string;
  headerImageUrl2: string;
  headerImageUrl3: string;
  date: string;
  partnerName1: string;
  partnerName2: string;
  headerSubtitle: string;
  headerLocation: string;

  // Save the Date + Schedule
  saveDateVariant: SaveDateVariant;
  weddingMonth: number;
  weddingDay: number;
  weddingYear: number;
  scheduleTitle: string;
  scheduleSubtitle: string;

  // Timeline
  events: TimelineEvent[];

  // RSVP
  rsvpVariant: RsvpVariant;
  rsvpTitle: string;
  rsvpSubtitle: string;
  rsvpNameLabel: string;
  rsvpPhoneLabel: string;
  rsvpAttendingLabel: string;
  rsvpNotAttendingLabel: string;
  rsvpButtonText: string;
  rsvpDeadline: string;
  rsvpNote: string;
  rsvpCommentsLabel: string;
  rsvpCommentsPlaceholder: string;
  maxGuests: number;

  // Dress Code
  dressCodeVariant: DressCodeVariant;
  dressCodeTitle: string;
  dressCodeSubtitle: string;
  dressCodeColors: string[];

  // Location
  locationVariant: LocationVariant;
  locationTitle: string;
  venueName: string;
  venueAddress: string;
  venueDateTime: string;
  locationImageUrl: string;
  googleMapsUrl: string;
}

interface InvitationContextType {
  data: InvitationData;
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
  updateField: <K extends keyof InvitationData>(
    field: K,
    value: InvitationData[K],
  ) => void;
  updateEvent: (id: string, updates: Partial<TimelineEvent>) => void;
  addEvent: () => void;
  removeEvent: (id: string) => void;
}

/* ── Defaults ──────────────────────────────────────────────── */

const defaultData: InvitationData = {
  headerVariant: 'classic',
  headerImageUrl: '',
  headerImageUrl2: '',
  headerImageUrl3: '',
  date: 'july 3, 2027',
  partnerName1: 'CAROLINE',
  partnerName2: 'MICHAEL',
  headerSubtitle: 'WEDDING DAY',
  headerLocation: 'Saint Helena, CA',

  saveDateVariant: 'calendar',
  weddingMonth: 6,
  weddingDay: 3,
  weddingYear: 2027,
  scheduleTitle: "OUR SPECIAL DAY'S SCHEDULE",
  scheduleSubtitle: "HERE'S A SNEAK PEEK OF",

  events: [
    { id: '1', time: '16:30', title: 'Guest Welcome & Seating', emoji: '🏛️' },
    { id: '2', time: '17:00', title: 'Wedding Ceremony', emoji: '💍' },
    { id: '3', time: '18:00', title: 'Banquet Begins', emoji: '🥂' },
    { id: '4', time: '21:00', title: 'Wedding Cake', emoji: '🎂' },
    { id: '5', time: '23:00', title: 'End of Celebration', emoji: '✨' },
  ],

  rsvpVariant: 'dark',
  rsvpTitle: 'RSVP',
  rsvpSubtitle: 'Please confirm your attendance',
  rsvpNameLabel: 'First and Last Name',
  rsvpPhoneLabel: 'Your phone number',
  rsvpAttendingLabel: "Yes! Can't wait!",
  rsvpNotAttendingLabel: "Sorry, can't make it!",
  rsvpButtonText: 'RSVP',
  rsvpDeadline: 'July 5, 2027',
  rsvpNote: 'Please ensure you fill in the information for ALL guests in your party',
  rsvpCommentsLabel: 'Anything else?',
  rsvpCommentsPlaceholder: 'Include any dietary restrictions your party may have as well!',
  maxGuests: 2,

  dressCodeVariant: 'pastel',
  dressCodeTitle: 'Dress Code',
  dressCodeSubtitle: 'We would appreciate it if you follow the color palette of our wedding in your outfit choices',
  dressCodeColors: ['#D4C5A9', '#B8C5A3', '#9B9B8E', '#C4A882'],

  locationVariant: 'venue',
  locationTitle: 'CEREMONY',
  venueName: 'Venue Name',
  venueAddress: '123 Main Street, City, State',
  venueDateTime: 'July 3, 2027 at 16:45',
  locationImageUrl: '',
  googleMapsUrl: 'https://maps.google.com',
};

/* ── IndexedDB helpers (for large image data) ──────────────── */

const IMAGE_DB_NAME = 'wedding-invitation-images';
const IMAGE_STORE = 'images';
const IMAGE_FIELDS: (keyof InvitationData)[] = [
  'headerImageUrl',
  'headerImageUrl2',
  'headerImageUrl3',
  'locationImageUrl',
];

function openImageDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(IMAGE_DB_NAME, 2);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(IMAGE_STORE)) {
        request.result.createObjectStore(IMAGE_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveImageToDB(key: string, value: string): Promise<void> {
  const db = await openImageDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IMAGE_STORE, 'readwrite');
    tx.objectStore(IMAGE_STORE).put(value, key);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}

async function loadAllImagesFromDB(): Promise<Record<string, string>> {
  const db = await openImageDB();
  const results: Record<string, string> = {};
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IMAGE_STORE, 'readonly');
    const store = tx.objectStore(IMAGE_STORE);
    for (const key of IMAGE_FIELDS) {
      const req = store.get(key);
      req.onsuccess = () => { if (req.result) results[key] = req.result; };
    }
    tx.oncomplete = () => { db.close(); resolve(results); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}

/* ── Context ───────────────────────────────────────────────── */

const STORAGE_KEY = 'wedding-invitation-data';
const InvitationContext = createContext<InvitationContextType | null>(null);

export function useInvitation() {
  const context = useContext(InvitationContext);
  if (!context)
    throw new Error('useInvitation must be used within InvitationProvider');
  return context;
}

export function InvitationProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<InvitationData>(defaultData);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    async function hydrate() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const textData = saved ? JSON.parse(saved) : {};
        let images: Record<string, string> = {};
        try { images = await loadAllImagesFromDB(); } catch { /* */ }
        setData({ ...defaultData, ...textData, ...images });
      } catch { /* */ }
      setIsHydrated(true);
    }
    hydrate();
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      const clone: Record<string, unknown> = { ...data };
      for (const f of IMAGE_FIELDS) delete clone[f];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clone));
    } catch { /* */ }
  }, [data, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    for (const field of IMAGE_FIELDS) {
      const val = data[field] as string;
      if (val) saveImageToDB(field, val).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.headerImageUrl, data.headerImageUrl2, data.headerImageUrl3, data.locationImageUrl, isHydrated]);

  const updateField = useCallback(
    <K extends keyof InvitationData>(field: K, value: InvitationData[K]) => {
      setData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const updateEvent = useCallback(
    (id: string, updates: Partial<TimelineEvent>) => {
      setData((prev) => ({
        ...prev,
        events: prev.events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
      }));
    },
    [],
  );

  const addEvent = useCallback(() => {
    setData((prev) => ({
      ...prev,
      events: [...prev.events, { id: Date.now().toString(), time: '00:00', title: 'New Event', emoji: '✨' }],
    }));
  }, []);

  const removeEvent = useCallback((id: string) => {
    setData((prev) => ({ ...prev, events: prev.events.filter((e) => e.id !== id) }));
  }, []);

  if (!isHydrated) return null;

  return (
    <InvitationContext.Provider
      value={{ data, isEditMode, setIsEditMode, updateField, updateEvent, addEvent, removeEvent }}
    >
      {children}
    </InvitationContext.Provider>
  );
}
