export function buildSpec(transcript: string) {
  return {
    appName: transcript ? 'Generated Tamil App' : 'Tamil Business App',
    language: 'ta',
    entities: [
      {
        name: 'Customer',
        fields: ['பெயர்', 'மொபைல்', 'முகவரி']
      }
    ],
    features: ['Dashboard', 'CRUD']
  };
}
