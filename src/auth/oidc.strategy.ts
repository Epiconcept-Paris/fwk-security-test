import { Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  Client,
  UserinfoResponse,
  TokenSet,
  Issuer,
} from 'openid-client';

export const buildOpenIdClient = async () => {
  const TrustIssuer = await Issuer.discover(
    'http://keycloak:8080/keycloak/realms/test',
  );

  const client = new TrustIssuer.Client({
    client_id: 'graphql-client',
    client_secret: 'super_secret',
  });

  return client;
};

export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  client: Client;

  constructor(@Inject('OpenIDClient') oClient: Client) {
    super({
      client: oClient,
      params: {
        redirect_uri: 'http://localhost/audit/callback',
      },
      passReqToCallback: false,
      usePKCE: false,
    });

    this.client = oClient;
  }

  async validate(tokenset: TokenSet): Promise<any> {
    const userinfo: UserinfoResponse = await this.client.userinfo(tokenset);
    try {
      const id_token = tokenset.id_token;
      const access_token = tokenset.access_token;
      const refresh_token = tokenset.refresh_token;
      const user = {
        id_token,
        access_token,
        refresh_token,
        userinfo,
      };
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}

export const OpenIdClientFactory = {
  provide: 'OpenIDClient',
  useFactory: async () => {
    return await buildOpenIdClient();
  },
};

export const OidcStrategyFactory = {
  provide: 'OidcStrategy',
  useFactory: async (oClient: Client) => {
    const strategy = new OidcStrategy(oClient);
    return strategy;
  },
  inject: ['OpenIDClient'],
};
