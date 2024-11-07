'use client';

import { useEffect, useState } from 'react';

import { StoryEmbed } from '../../components/StoryEmbed';

export default function ChatWidgetStories() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', margin: '32px 0' }}>
      # Chat Demo ## Base
      <div style={{ width: '400px' }}>
        <StoryEmbed for="NewChat" name="Base" />
      </div>
      ## Themed
      <StoryEmbed for="NewChat" name="Themed" />
      ## No Powered By
      <div style={{ width: '400px' }}>
        <StoryEmbed for="NewChat" name="NoPoweredBy" />
        ### No Footer at all
        <StoryEmbed for="NewChat" name="NoFooterLinks" />
        ### Chat ended
        <StoryEmbed for="NewChat" name="ChatEnded" />
      </div>
    </div>
  );
}
