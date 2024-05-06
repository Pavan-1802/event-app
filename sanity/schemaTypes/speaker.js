export const speaker = {
  name: 'speaker',
  title: 'Speaker',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short description of the speaker',
    },
    {
      name: 'linkedin',
      title: 'LinkedIn Profile',
      type: 'url',
      description: 'URL to the speaker\'s LinkedIn profile',
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
};
