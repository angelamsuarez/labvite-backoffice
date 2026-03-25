'use client';

import EditableText from './EditableText';
import { useInvitation } from '../context/InvitationContext';
import { MusicCardIcon } from '../icons';

/* ================================================================
   SONG SUGGEST SECTION
   Invites guests to suggest songs for the wedding playlist.
   ================================================================ */

export default function SongSuggestSection() {
  const { data, isEditMode, updateField } = useInvitation();

  return (
    <section
      className="p-6 text-center"
      style={{ backgroundColor: data.songsBgColor, color: data.songsTextColor }}
    >
      <div className="flex items-center justify-center mb-6">
        <MusicCardIcon className="w-14 h-14 opacity-50" style={{ color: data.songsTextColor }} />
      </div>

      <EditableText
        value={data.songsTitle}
        onChange={(v) => updateField('songsTitle', v)}
        as="h2"
        className="text-2xl sm:text-3xl font-script mb-3"
      />

      <EditableText
        value={data.songsSubtitle}
        onChange={(v) => updateField('songsSubtitle', v)}
        as="p"
        className="text-sm font-playfair leading-relaxed max-w-[280px] mx-auto mb-8 opacity-60"
      />

      {/* CTA button */}
      {isEditMode ? (
        <div className="inline-flex flex-col items-center gap-2">
          <button
            className="px-8 py-3 rounded-full text-xs font-playfair uppercase tracking-[0.2em] transition-all"
            style={{
              backgroundColor: data.songsTextColor,
              color: data.songsBgColor,
            }}
          >
            <EditableText
              value={data.songsButtonText}
              onChange={(v) => updateField('songsButtonText', v)}
              as="span"
              className=""
            />
          </button>
          <label className="text-[10px] opacity-50 font-playfair flex items-center gap-1">
            Link:
            <input
              type="text"
              value={data.songsUrl}
              onChange={(e) => updateField('songsUrl', e.target.value)}
              placeholder="https://forms.gle/... or Spotify link"
              className="bg-transparent border-b border-current/30 text-[10px] w-52 outline-none px-1 py-0.5"
            />
          </label>
        </div>
      ) : (
        <a
          href={data.songsUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 rounded-full text-xs font-playfair uppercase tracking-[0.2em] transition-all hover:opacity-90"
          style={{
            backgroundColor: data.songsTextColor,
            color: data.songsBgColor,
          }}
        >
          {data.songsButtonText}
        </a>
      )}
    </section>
  );
}
