export const event = {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'poster',
      title: 'Poster',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Poster image for the event',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [{type: 'reference', to: {type: 'speaker'}}],
      description: 'List of speakers for the event',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
    },
    {
      name: 'regDeadline',
      title: 'Registration Deadline',
      type: 'datetime',
    },
    {
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      description: 'Link for attendees to register for the event',
    },
    {
      name: 'venue',
      title: 'Venue',
      type: 'string',
      description: 'Location where the event will be held',
    },
  ],

  preview: {
    select: {
      title: 'title',
      date: 'date',
    },
    prepare(selection) {
      const {date} = selection;
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      return {
        ...selection,
        subtitle: formattedDate,
      };
    },
  },
};