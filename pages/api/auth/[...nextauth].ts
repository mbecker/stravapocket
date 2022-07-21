import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions, Profile } from 'next-auth';
import { OAuthConfig } from 'next-auth/providers/oauth';

import { User } from 'pocketbase';

import FormData from 'form-data';

// import EmailProvider from "next-auth/providers/email"
// import AppleProvider from "next-auth/providers/apple"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

import PocketBase from 'pocketbase';
import { PocketBaseAuthData } from '../../../common/PocketBaseTypes';
import { AuthProfile } from '../../../common/Auth';

const client = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

function Strava(): Promise<OAuthConfig<any>> {
  let redirectURILocal = 'http://localhost:3000/api/auth/callback/strava';

  let stravaAuthOptions: OAuthConfig<any> = {
    id: 'strava',
    name: 'Strava',
    type: 'oauth',
    checks: ['pkce', 'state'],
    authorization: {
      url: redirectURILocal,
      // url: 'https://www.strava.com/api/v3/oauth/authorize',
      params: {
        scope: 'read_all,profile:read_all,activity:read_all',
        approval_prompt: 'auto',
        response_type: 'code',
        redirect_uri: redirectURILocal,
      },
    },
    token: {},
    userinfo: {
      url: 'https://www.strava.com/api/v3/athlete',
      // The result of this method will be the input to the `profile` callback.
      // async request(context) {
      //   // context contains useful properties to help you make the request.
      //   context.tokens.
      //   return await makeUserinfoRequest(context)
      // }
    },
    client: {
      token_endpoint_auth_method: 'client_secret_post',
    },

    profile(profile: any) {
      return {
        id: profile.id,
        name: typeof profile['name'] !== 'undefined' ? profile['name'] : null,
        email: profile.email,
        image:
          typeof profile['image'] !== 'undefined' ? profile['image'] : null,
      };
    },
    clientId: process.env.STRAVA_ID,
    clientSecret: process.env.STRAVA_SECRET,
  };
  return client.Users.listAuthMethods()
    .then((authMethods) => {
      authMethods.authProviders.forEach((p) => {
        if (p.name === 'strava') {
          const provider = Object.assign({}, p);
          // let pocketBaseToken: string;
          // let user: User;
          // let meta: { [key: string]: any } | undefined = undefined;


          let pocketBaseAuthData: PocketBaseAuthData;


          const redirectURI = provider.authUrl + redirectURILocal;

          stravaAuthOptions.authorization! = redirectURI;
          stravaAuthOptions.token = {
            url: 'https://www.strava.com/api/v3/oauth/token',
            async request(context) {
              console.log('--- Provider.token() --- ');
              // console.log('=== CONTEXT ===\n', JSON.stringify(context));
              // const providerStorage = localStorage.getItem('provider');
              // if (providerStorage === null) {
              //   throw new Error('No local storage for provider exists');
              // }
              // const provider = JSON.parse(providerStorage);

              // if (gprovider !== null && gprovider.state !== context.params.state) {
              //   throw new Error("State parameters don't match");
              // }

              try {
                pocketBaseAuthData = await client.Users.authViaOAuth2(
                  'strava',
                  context.params.code!,
                  provider.codeVerifier,
                  redirectURILocal
                ) as PocketBaseAuthData;
                console.log(
                  'AuthData: ',
                  JSON.stringify(pocketBaseAuthData, undefined, 2)
                );
                // user = authData.user;
                // pocketBaseToken = authData.token;
                // if (typeof authData['meta'] !== 'undefined') {
                //   meta = authData['meta'];
                // }
                console.log('----------- ----------- -----------');
                return {
                  tokens: {
                    access_token: pocketBaseAuthData.token,
                  },
                };
              } catch (err) {
                console.log('----------- ----------- -----------');
                throw err;
              }
            },
          };
          stravaAuthOptions.userinfo = {
            url: 'https://www.strava.com/api/v3/athlete',
            // The result of this method will be the input to the `profile` callback.
            async request(context) {
              console.log('--- Provider.userinfo() --- ');
              // console.log('user: ', user);
              // console.log('meta: ', meta);
              /*
              --- Provider.userinfo() --- 
              user:  n {
                id: 'bTX4wxMVVCEY4sj',
                created: '2022-07-21 06:10:51.182',
                updated: '2022-07-21 06:10:51.182',
                email: '8844168@strava.com',
                verified: true,
                lastResetSentAt: '',
                lastVerificationSentAt: '',
                profile: n {
                  id: '32VZeOZ7t47tAg5',
                  created: '2022-07-21 06:10:51.183',
                  updated: '2022-07-21 06:10:51.183',
                  '@collectionId': 'gdfswMWZ52bUUT5',
                  '@collectionName': 'profiles',
                  userId: 'bTX4wxMVVCEY4sj',
                  '@expand': {}
                }
              }
              meta:  {
                id: '8844168',
                name: 'matsbecker',
                email: '8844168@strava.com',
                avatarUrl: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/8844168/2686373/2/large.jpg',
                token: {
                  access_token: '6b614047cca803f25a3f862f43b8bf5fcdf1968e',
                  token_type: 'Bearer',
                  refresh_token: 'eabb7b6bbed69a668a744ded0f3612beb2bb8665',
                  expiry: '2022-07-21T14:10:50.173992+02:00'
                }
              }
              */



              let p: Profile = {};
              p.id = pocketBaseAuthData.user.id;
              p.email = pocketBaseAuthData.user.email;
              p.token = pocketBaseAuthData.token;
              p.authdata = pocketBaseAuthData;


              let profileNameExists = false;
              let profileImageExists = false;
              let profileId: string | null = null;
              
              if (
                typeof pocketBaseAuthData.user['profile'] !== 'undefined' &&
                pocketBaseAuthData.user['profile'] !== null
              ) {
                if (typeof pocketBaseAuthData.user['profile']['id'] !== 'undefined') {
                  profileId = pocketBaseAuthData.user['profile']['id'];
                }
                if (typeof pocketBaseAuthData.user['profile']['name'] !== 'undefined') {
                  p.name = pocketBaseAuthData.user['profile']['name'];
                  profileNameExists = true;
                }
                if (typeof pocketBaseAuthData.user['profile']['avatar'] !== 'undefined') {
                  p.image = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/profiles/${profileId}/${pocketBaseAuthData.user['profile']['avatar']}`;
                  profileImageExists = true;
                }
              }

              if (profileId !== null && typeof pocketBaseAuthData['meta'] !== 'undefined') {
                
                try {
                  const formData = new FormData();
                  let shouldUpdate: boolean = false;
                  if (
                    profileNameExists === false &&
                    typeof pocketBaseAuthData.meta['name'] !== 'undefined'
                  ) {
                    if (pocketBaseAuthData.meta['name'] !== '') {
                      p.name = pocketBaseAuthData.meta['name'];
                      formData.append('name', p.name);
                      shouldUpdate = true;
                    }
                  }
                  if (
                    profileImageExists === false &&
                    typeof pocketBaseAuthData.meta['avatarUrl'] !== 'undefined'
                  ) {
                    p.image = pocketBaseAuthData.meta['avatarUrl'];
                    if (pocketBaseAuthData.meta['avatarUrl'] !== '') {
                      const image = await fetch(p.image!);
                      formData.append('avatar', image.body, {
                        filename: 'large.jpg',
                      });
                      shouldUpdate = true;
                    }
                  }

                  if (shouldUpdate) {
                    await client.Users.update
                    await client.Records.update(
                      'profiles',
                      profileId,
                      formData
                    );
                  }
                } catch (err) {
                  console.log('Error updating user profiles (record): ', err);
                }
              }
              console.log('Profile: ', JSON.stringify(p, undefined, 2));
              console.log('----------- ----------- -----------');
              /*
              Profile:  {
              "id": "bTX4wxMVVCEY4sj",
              "email": "8844168@strava.com",
              "meta": {
                "id": "8844168",
                "name": "matsbecker",
                "email": "8844168@strava.com",
                "avatarUrl": "https://dgalywyr863hv.cloudfront.net/pictures/athletes/8844168/2686373/2/large.jpg",
                "token": {
                  "access_token": "6b614047cca803f25a3f862f43b8bf5fcdf1968e",
                  "token_type": "Bearer",
                  "refresh_token": "eabb7b6bbed69a668a744ded0f3612beb2bb8665",
                  "expiry": "2022-07-21T14:10:50.173992+02:00"
                }
              },
              "name": "matsbecker",
              "image": "https://dgalywyr863hv.cloudfront.net/pictures/athletes/8844168/2686373/2/large.jpg"
            }
            */
              return p;
            },
          };
        }
      });
      return stravaAuthOptions;
    })
    .catch((err) => {
      return err;
    });
}

export let authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers
  providers: [
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: {
    //     appleId: process.env.APPLE_ID,
    //     teamId: process.env.APPLE_TEAM_ID,
    //     privateKey: process.env.APPLE_PRIVATE_KEY,
    //     keyId: process.env.APPLE_KEY_ID,
    //   },
    // }),
    // Strava(),
  ],
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/databases
  //
  // Notes:
  // * You must install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  // database: process.env.DATABASE_URL,

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log('=================== SIGNIN ========================');
    //   console.log('NextAuth Callbacks signIn ...');
    //   console.log('\n\nEmail: ', JSON.stringify(email));
    //   console.log('\n\nProfile: ', JSON.stringify(profile));
    //   console.log('\n\nUser: ', JSON.stringify(user));
    //   console.log('\n\nAccount: ', JSON.stringify(account));
    //   if (typeof account.access_token === 'undefined') return false;
    //   // account.token_type
    //   // account.expires_at
    //   // account.refresh_token
    //   return client.Users.authViaOAuth2(
    //     'strava',
    //     `access_token${account.access_token!}`,
    //     'codeverifier',
    //     `http://localhost:3000?access_token=${account.access_token}&refresh_token=${account.refresh_token}&token_type=${account.token_type}&expires_at=${account.expires_at}`
    //   )
    //     .then((userData) => {
    //       console.log(
    //         'Pocketbase user data: ',
    //         JSON.stringify(userData, undefined, 2)
    //       );
    //       return true;
    //     })
    //     .catch((err) => {
    //       console.log('Error requesting auth / signin at pocketbase: ', err);
    //       return false;
    //     });
    //   // return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   console.log('=================== REDIRECT ========================');
    //   console.log('NextAuth Callbacks redirect ...');
    //   console.log('\n\nURL: ', JSON.stringify(url));
    //   console.log('\n\nBaseURL: ', JSON.stringify(baseUrl));
    //   return baseUrl;
    // },
    async session({ session, token, user }) {
      console.log('==== CALLBACK SESSION ====');
      session.user = token.user as any;
      session.profile = token.profile as AuthProfile;
      console.log('token: ', JSON.stringify(token, undefined, 2));
      console.log('user: ', JSON.stringify(user, undefined, 2));
      console.log('session: ', JSON.stringify(session, undefined, 2));
      /*
      session:  {
      "user": {
        "id": "Hvc91GMtbvpNF5I",
        "name": "matsbecker",
        "email": "8844168@strava.com",
        "image": "http://localhost:8090/api/files/profiles/IB4d5nhyedkZR8Z/4jrkNLpjQ5LFfB1KhefzdGxenBixUTsV.jpg"
      },
      "expires": "2022-08-20T07:15:15.314Z",
      "profile": {
        "id": "Hvc91GMtbvpNF5I",
        "email": "8844168@strava.com",
        "name": "matsbecker",
        "image": "http://localhost:8090/api/files/profiles/IB4d5nhyedkZR8Z/4jrkNLpjQ5LFfB1KhefzdGxenBixUTsV.jpg",
        "meta": {
          "id": "8844168",
          "name": "matsbecker",
          "email": "8844168@strava.com",
          "avatarUrl": "https://dgalywyr863hv.cloudfront.net/pictures/athletes/8844168/2686373/2/large.jpg",
          "token": {
            "access_token": "6b614047cca803f25a3f862f43b8bf5fcdf1968e",
            "token_type": "Bearer",
            "refresh_token": "eabb7b6bbed69a668a744ded0f3612beb2bb8665",
            "expiry": "2022-07-21T14:10:50.547665+02:00"
          }
        }
      }
    }
    */
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('==== CALLBACK TOKEN ====');      
      user && (token.user = user);
      profile && (token.profile = profile);
      console.log('token: ', JSON.stringify(token, undefined, 2));
      console.log('user: ', JSON.stringify(user, undefined, 2));
      console.log('account: ', JSON.stringify(account, undefined, 2));
      console.log('profile: ', JSON.stringify(profile, undefined, 2));
      return token;
    },
  },
  theme: {
    colorScheme: 'light',
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: false,
};

// export default NextAuth(authOptions);

// const Handle = (req: NextApiRequest, res: NextApiResponse) => {

//   Strava().then((o) => {
//     authOptions.providers.push(o);
//     return NextAuth(authOptions);
//   })
//   // return nextAuth(req, res);
// }

// export default Handle;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let aOptions = Object.assign({}, authOptions);
  try {
    const strava = await Strava();
    // console.log("Strava options: ", JSON.stringify(strava, undefined, 2));
    aOptions.providers = [strava];
    // console.log('AWAIT === Auth Options: ', JSON.stringify(aOptions, undefined, 2));
  } catch (err) {
    console.log('NextAuth Error catch: ', err);
  }
  // console.log('Auth Options: ', JSON.stringify(aOptions, undefined, 2));
  // Return the same NextAuth function, but pass the req and res parameters so it can return the response
  return NextAuth(req, res, aOptions);
}
