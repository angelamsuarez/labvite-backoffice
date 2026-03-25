'use client';

import { useInvitation } from '../../context/InvitationContext';
import { SectionGroup, Card, ToggleRow, ColorBlock, ColorPickerRow } from './shared';

export default function FeaturesPanel() {
  const { data, updateField } = useInvitation();

  return (
    <SectionGroup title="Features">
      <div className="space-y-3">
        {/* Envelope Cover */}
        <Card>
          <ToggleRow
            label="Envelope Cover"
            checked={data.enableEnvelope}
            onChange={() => updateField('enableEnvelope', !data.enableEnvelope)}
          />
          {data.enableEnvelope && (
            <ColorBlock>
              <ColorPickerRow
                label="Background"
                field="envelopeBgColor"
                value={data.envelopeBgColor}
                updateField={updateField}
              />
              <ColorPickerRow
                label="Text"
                field="envelopeTextColor"
                value={data.envelopeTextColor}
                updateField={updateField}
              />
            </ColorBlock>
          )}
        </Card>

        {/* Details Section */}
        <Card>
          <ToggleRow
            label="Details Section (grouped)"
            checked={data.enableDetails}
            onChange={() => updateField('enableDetails', !data.enableDetails)}
          />
          {data.enableDetails && (
            <>
              <p className="text-[10px] text-charcoal/50 font-playfair leading-snug -mt-1 ml-1">
                Sections toggled below will appear inside the Details modal.
              </p>
              <div className="ml-2 space-y-2 border-l-2 border-sage/20 pl-3">
                <ToggleRow
                  small
                  label="Date &amp; Schedule"
                  checked={data.detailsIncludeSchedule}
                  onChange={() =>
                    updateField('detailsIncludeSchedule', !data.detailsIncludeSchedule)
                  }
                />
                <ToggleRow
                  small
                  label="Location"
                  checked={data.detailsIncludeLocation}
                  onChange={() =>
                    updateField('detailsIncludeLocation', !data.detailsIncludeLocation)
                  }
                />
                <ToggleRow
                  small
                  label="Dress Code"
                  checked={data.detailsIncludeDressCode}
                  onChange={() =>
                    updateField('detailsIncludeDressCode', !data.detailsIncludeDressCode)
                  }
                />
              </div>
              <ColorBlock>
                <ColorPickerRow
                  label="Background"
                  field="detailsBgColor"
                  value={data.detailsBgColor}
                  updateField={updateField}
                />
                <ColorPickerRow
                  label="Text"
                  field="detailsTextColor"
                  value={data.detailsTextColor}
                  updateField={updateField}
                />
              </ColorBlock>
            </>
          )}
        </Card>

        {/* Our Story */}
        <Card>
          <ToggleRow
            label="Our Story"
            checked={data.enableOurStory}
            onChange={() => updateField('enableOurStory', !data.enableOurStory)}
          />
          {data.enableOurStory && (
            <ColorBlock>
              <ColorPickerRow
                label="Background"
                field="ourStoryBgColor"
                value={data.ourStoryBgColor}
                updateField={updateField}
              />
              <ColorPickerRow
                label="Text"
                field="ourStoryTextColor"
                value={data.ourStoryTextColor}
                updateField={updateField}
              />
            </ColorBlock>
          )}
        </Card>

        {/* Countdown */}
        <Card>
          <ToggleRow
            label="Countdown"
            checked={data.enableCountdown}
            onChange={() => updateField('enableCountdown', !data.enableCountdown)}
          />
          {data.enableCountdown && (
            <ColorBlock>
              <ColorPickerRow
                label="Background"
                field="countdownBgColor"
                value={data.countdownBgColor}
                updateField={updateField}
              />
              <ColorPickerRow
                label="Text"
                field="countdownTextColor"
                value={data.countdownTextColor}
                updateField={updateField}
              />
            </ColorBlock>
          )}
        </Card>

        {/* Photo Gallery */}
        <Card>
          <ToggleRow
            label="Photo Gallery"
            checked={data.enableGallery}
            onChange={() => updateField('enableGallery', !data.enableGallery)}
          />
          {data.enableGallery && (
            <ColorBlock>
              <ColorPickerRow
                label="Background"
                field="galleryBgColor"
                value={data.galleryBgColor}
                updateField={updateField}
              />
            </ColorBlock>
          )}
        </Card>

        {/* Song Suggestions */}
        <Card>
          <ToggleRow
            label="Song Suggestions"
            checked={data.enableSongs}
            onChange={() => updateField('enableSongs', !data.enableSongs)}
          />
          {data.enableSongs && (
            <ColorBlock>
              <ColorPickerRow
                label="Background"
                field="songsBgColor"
                value={data.songsBgColor}
                updateField={updateField}
              />
              <ColorPickerRow
                label="Text"
                field="songsTextColor"
                value={data.songsTextColor}
                updateField={updateField}
              />
            </ColorBlock>
          )}
        </Card>
      </div>
    </SectionGroup>
  );
}
