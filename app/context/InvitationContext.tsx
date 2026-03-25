'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

/* ── Types ─────────────────────────────────────────────────── */

export type HeaderVariant = 'classic' | 'triptych' | 'bold' | 'minimal';
export type SaveDateVariant = 'calendar' | 'schedule' | 'hearts' | 'circle';
export type RsvpVariant = 'dark' | 'light';
export type DressCodeVariant = 'pastel' | 'clean' | 'dark';
export type LocationVariant = 'map' | 'venue' | 'side-by-side';

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
  locationCeremonyTitle: string;
  locationReceptionTitle: string;
  venueName: string;
  venueAddress: string;
  venueDateTime: string;
  locationImageUrl: string;
  googleMapsUrl: string;
  receptionGoogleMapsUrl: string;
  enableCeremony: boolean;
  enableReception: boolean;

  // Envelope & Details
  enableEnvelope: boolean;
  enableDetails: boolean;
  envelopeTopText: string;
  envelopeInstruction: string;
  detailsButtonText: string;
  detailsPhoto1: string;
  detailsPhoto2: string;
  detailsPhoto3: string;

  // Our Story
  enableOurStory: boolean;
  ourStoryTitle: string;
  ourStoryText: string;

  // Section visibility
  enableSchedule: boolean;
  enableLocation: boolean;
  enableDressCode: boolean;
  enableRsvp: boolean;

  // Details grouping (which sections go inside the Details modal)
  detailsIncludeSchedule: boolean;
  detailsIncludeLocation: boolean;
  detailsIncludeDressCode: boolean;

  // Countdown
  enableCountdown: boolean;
  countdownTitle: string;
  countdownDate: string; // ISO date string e.g. "2027-07-03"
  countdownTime: string; // HH:mm e.g. "17:00"
  countdownBgColor: string;
  countdownTextColor: string;

  // Gallery
  enableGallery: boolean;
  galleryPhotos: string[];
  galleryBgColor: string;

  // Songs
  enableSongs: boolean;
  songsTitle: string;
  songsSubtitle: string;
  songsButtonText: string;
  songsUrl: string;
  songsBgColor: string;
  songsTextColor: string;

  // Section colors (bg + text per section)
  headerBgColor: string;
  headerTextColor: string;
  dateBgColor: string;
  dateTextColor: string;
  rsvpBgColor: string;
  rsvpTextColor: string;
  dressBgColor: string;
  dressTextColor: string;
  locationBgColor: string;
  locationTextColor: string;
  ourStoryBgColor: string;
  ourStoryTextColor: string;
  detailsBgColor: string;
  detailsTextColor: string;
  envelopeBgColor: string;
  envelopeTextColor: string;
}

export const COLOR_PALETTE = [
  { label: 'White', value: '#FFFFFF' },
  { label: 'Cream', value: '#F8F5F0' },
  { label: 'Dark Sage', value: '#4A5A3E' },
  { label: 'Raspberry', value: '#451425' },
  { label: 'Blue', value: '#6B7BA5' },
  { label: 'Charcoal', value: '#1C1C1C' },
];

interface InvitationContextType {
  data: InvitationData;
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
  envelopeOpened: boolean;
  setEnvelopeOpened: (open: boolean) => void;
  updateField: <K extends keyof InvitationData>(field: K, value: InvitationData[K]) => void;
  updateEvent: (id: string, updates: Partial<TimelineEvent>) => void;
  addEvent: () => void;
  removeEvent: (id: string) => void;
  addGalleryPhoto: (dataUrl: string) => void;
  removeGalleryPhoto: (index: number) => void;
  updateGalleryPhoto: (index: number, dataUrl: string) => void;
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
  dressCodeSubtitle:
    'We would appreciate it if you follow the color palette of our wedding in your outfit choices',
  dressCodeColors: ['#D4C5A9', '#B8C5A3', '#9B9B8E', '#C4A882'],

  locationVariant: 'venue',
  locationCeremonyTitle: 'CEREMONY',
  locationReceptionTitle: 'RECEPTION',
  venueName: 'Venue Name',
  venueAddress: '123 Main Street, City, State',
  venueDateTime: 'July 3, 2027 at 16:45',
  locationImageUrl: '',
  googleMapsUrl: 'https://maps.google.com',
  receptionGoogleMapsUrl: 'https://maps.google.com',
  enableCeremony: true,
  enableReception: true,

  enableEnvelope: false,
  enableDetails: false,
  envelopeTopText: "WE'RE GETTING MARRIED",
  envelopeInstruction: 'CLICK ENVELOPE TO OPEN',
  detailsButtonText: 'The Details',
  detailsPhoto1: '',
  detailsPhoto2: '',
  detailsPhoto3: '',

  enableOurStory: true,
  ourStoryTitle: 'Our Story',
  ourStoryText:
    'We met on a beautiful summer day and knew from the start that our journey together would be filled with love, laughter, and endless adventures. After years of building memories, we are overjoyed to celebrate the next chapter of our lives with you.',

  enableSchedule: true,
  enableLocation: true,
  enableDressCode: true,
  enableRsvp: true,

  detailsIncludeSchedule: true,
  detailsIncludeLocation: true,
  detailsIncludeDressCode: true,

  enableCountdown: false,
  countdownTitle: 'COUNTING DOWN...',
  countdownDate: '2027-07-03',
  countdownTime: '17:00',
  countdownBgColor: '#4A5A3E',
  countdownTextColor: '#FFFFFF',

  enableGallery: false,
  galleryPhotos: [],
  galleryBgColor: '#F8F5F0',

  enableSongs: false,
  songsTitle: 'Be Our DJ!',
  songsSubtitle: 'Help us build the playlist for our party',
  songsButtonText: 'SUGGEST A SONG',
  songsUrl: '',
  songsBgColor: '#F8F5F0',
  songsTextColor: '#1C1C1C',

  headerBgColor: '#F8F5F0',
  headerTextColor: '#1C1C1C',
  dateBgColor: '#F8F5F0',
  dateTextColor: '#1C1C1C',
  rsvpBgColor: '#1C1C1C',
  rsvpTextColor: '#FFFFFF',
  dressBgColor: '#F8F5F0',
  dressTextColor: '#1C1C1C',
  locationBgColor: '#4A5A3E',
  locationTextColor: '#FFFFFF',
  ourStoryBgColor: '#F8F5F0',
  ourStoryTextColor: '#1C1C1C',
  detailsBgColor: '#3A2A1F',
  detailsTextColor: '#FFFFFF',
  envelopeBgColor: '#3A2A1F',
  envelopeTextColor: '#FFFFFF',
};

/* ── IndexedDB helpers (for large image data) ──────────────── */

const IMAGE_DB_NAME = 'wedding-invitation-images';
const IMAGE_STORE = 'images';
const IMAGE_FIELDS: (keyof InvitationData)[] = [
  'headerImageUrl',
  'headerImageUrl2',
  'headerImageUrl3',
  'locationImageUrl',
  'detailsPhoto1',
  'detailsPhoto2',
  'detailsPhoto3',
];
const GALLERY_DB_PREFIX = 'galleryPhoto_';

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
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
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
      req.onsuccess = () => {
        if (req.result) results[key] = req.result;
      };
    }
    // Also load all gallery photos by scanning keys
    const cursorReq = store.openCursor();
    cursorReq.onsuccess = () => {
      const cursor = cursorReq.result;
      if (cursor) {
        if (typeof cursor.key === 'string' && cursor.key.startsWith(GALLERY_DB_PREFIX)) {
          results[cursor.key] = cursor.value;
        }
        cursor.continue();
      }
    };
    tx.oncomplete = () => {
      db.close();
      resolve(results);
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

async function saveGalleryToDB(photos: string[]): Promise<void> {
  const db = await openImageDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IMAGE_STORE, 'readwrite');
    const store = tx.objectStore(IMAGE_STORE);
    // Delete old gallery entries
    const cursorReq = store.openCursor();
    const keysToDelete: string[] = [];
    cursorReq.onsuccess = () => {
      const cursor = cursorReq.result;
      if (cursor) {
        if (typeof cursor.key === 'string' && cursor.key.startsWith(GALLERY_DB_PREFIX)) {
          keysToDelete.push(cursor.key);
        }
        cursor.continue();
      } else {
        // Cursor exhausted – delete old keys, then write new ones
        for (const k of keysToDelete) store.delete(k);
        for (let i = 0; i < photos.length; i++) {
          if (photos[i]) store.put(photos[i], `${GALLERY_DB_PREFIX}${i}`);
        }
      }
    };
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

async function deleteGalleryKeyFromDB(index: number): Promise<void> {
  const db = await openImageDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IMAGE_STORE, 'readwrite');
    tx.objectStore(IMAGE_STORE).delete(`${GALLERY_DB_PREFIX}${index}`);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

/* ── Context ───────────────────────────────────────────────── */

const STORAGE_KEY = 'wedding-invitation-data';
const InvitationContext = createContext<InvitationContextType | null>(null);

export function useInvitation() {
  const context = useContext(InvitationContext);
  if (!context) throw new Error('useInvitation must be used within InvitationProvider');
  return context;
}

export function InvitationProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<InvitationData>(defaultData);
  const [isEditMode, setIsEditMode] = useState(true);
  const [envelopeOpened, setEnvelopeOpenedRaw] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const setEnvelopeOpened = useCallback((open: boolean) => {
    setEnvelopeOpenedRaw(open);
  }, []);

  useEffect(() => {
    async function hydrate() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const textData = saved ? JSON.parse(saved) : {};
        let images: Record<string, string> = {};
        try {
          images = await loadAllImagesFromDB();
        } catch {
          /* */
        }

        // Reconstruct galleryPhotos array from IndexedDB keys
        const galleryEntries: { idx: number; val: string }[] = [];
        for (const [key, val] of Object.entries(images)) {
          if (key.startsWith(GALLERY_DB_PREFIX)) {
            galleryEntries.push({ idx: parseInt(key.slice(GALLERY_DB_PREFIX.length)), val });
            delete images[key]; // don't spread as flat field
          }
        }
        galleryEntries.sort((a, b) => a.idx - b.idx);
        const galleryPhotos = galleryEntries.map((e) => e.val);

        setData({
          ...defaultData,
          ...textData,
          ...images,
          ...(galleryPhotos.length > 0 ? { galleryPhotos } : {}),
        });
      } catch {
        /* */
      }
      setIsHydrated(true);
    }
    hydrate();
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      const clone: Record<string, unknown> = { ...data };
      for (const f of IMAGE_FIELDS) delete clone[f];
      delete clone.galleryPhotos; // stored in IndexedDB
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clone));
    } catch {
      /* */
    }
  }, [data, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    for (const field of IMAGE_FIELDS) {
      const val = data[field] as string;
      if (val) saveImageToDB(field, val).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data.headerImageUrl,
    data.headerImageUrl2,
    data.headerImageUrl3,
    data.locationImageUrl,
    data.detailsPhoto1,
    data.detailsPhoto2,
    data.detailsPhoto3,
    isHydrated,
  ]);

  // Save gallery photos to IndexedDB
  useEffect(() => {
    if (!isHydrated) return;
    saveGalleryToDB(data.galleryPhotos).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.galleryPhotos, isHydrated]);

  const updateField = useCallback(
    <K extends keyof InvitationData>(field: K, value: InvitationData[K]) => {
      setData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const updateEvent = useCallback((id: string, updates: Partial<TimelineEvent>) => {
    setData((prev) => ({
      ...prev,
      events: prev.events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    }));
  }, []);

  const addEvent = useCallback(() => {
    setData((prev) => ({
      ...prev,
      events: [
        ...prev.events,
        { id: Date.now().toString(), time: '00:00', title: 'New Event', emoji: '✨' },
      ],
    }));
  }, []);

  const removeEvent = useCallback((id: string) => {
    setData((prev) => ({ ...prev, events: prev.events.filter((e) => e.id !== id) }));
  }, []);

  const addGalleryPhoto = useCallback((dataUrl: string) => {
    setData((prev) => ({ ...prev, galleryPhotos: [...prev.galleryPhotos, dataUrl] }));
  }, []);

  const removeGalleryPhoto = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      galleryPhotos: prev.galleryPhotos.filter((_, i) => i !== index),
    }));
    deleteGalleryKeyFromDB(index).catch(() => {});
  }, []);

  const updateGalleryPhoto = useCallback((index: number, dataUrl: string) => {
    setData((prev) => {
      const updated = [...prev.galleryPhotos];
      updated[index] = dataUrl;
      return { ...prev, galleryPhotos: updated };
    });
  }, []);

  if (!isHydrated) return null;

  return (
    <InvitationContext.Provider
      value={{
        data,
        isEditMode,
        setIsEditMode,
        envelopeOpened,
        setEnvelopeOpened,
        updateField,
        updateEvent,
        addEvent,
        removeEvent,
        addGalleryPhoto,
        removeGalleryPhoto,
        updateGalleryPhoto,
      }}
    >
      {children}
    </InvitationContext.Provider>
  );
}
