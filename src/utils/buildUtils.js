
// BUILD TYPES
const dev = {};
dev.buildMode = 'DEV';
dev.serverURL = 'https://siq6p12icb.execute-api.eu-west-1.amazonaws.com/staging/graphql';

const staging = {};
staging.buildMode = 'STAGING';
staging.serverURL = 'https://siq6p12icb.execute-api.eu-west-1.amazonaws.com/staging/graphql';

const production = {};
production.buildMode = 'PRODUCTION';
production.serverURL = 'https://2zrm474126.execute-api.eu-west-1.amazonaws.com/production/graphql';

//
export const buildApp = (build) => {
  switch (build.buildMode) {
    case dev.buildMode:
      return dev;
    case production.buildMode:
      return production;
    case staging.buildMode:
      return staging;
    default:
      return dev;
  }
};

export const getBuildType = () => dev;

// const currentBuild = dev;
// const currentBuild = staging;
// const currentBuild = production;
const currentBuild = getBuildType();

export default {
  buildTypes: {
    dev,
    staging,
    production,
    isProduction: (currentBuild.buildMode === production.buildMode),
    isStaging: (currentBuild.buildMode === staging.buildMode),
    isDevelop: (currentBuild.buildMode === dev.buildMode),
  },
  build: buildApp(currentBuild),
};
