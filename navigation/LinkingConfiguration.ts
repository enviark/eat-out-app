import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Map: {
            screens: {
              MapScreen: 'map',
            },
          },
          Chains: {
            screens: {
              ChainScreen: 'chains'
            }
          },
          Info: {
            screens: {
              AboutScreen: 'about',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
