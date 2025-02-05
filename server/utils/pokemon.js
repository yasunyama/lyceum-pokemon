import { ProxyAgent } from "proxy-agent";
import { ofetch } from "ofetch";

//0205差し替え
//const agent = new ProxyAgent();
const createProxyAgent = async () => {
  if (!(process.env.HTTPS_PROXY || process.env.HTTP_PROXY)) return;
  const { ProxyAgent } = await import("undici");
  const dispatcher = new ProxyAgent(
    process.env.HTTPS_PROXY ?? process.env.HTTP_PROXY,
  );
  return dispatcher;
};
/** ポケモンの取得 */
export const findPokemon = async (name) => {
  const pokemon = await ofetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
// 02/05差し替え
//    agent,
    dispatcher: await createProxyAgent(),

  });
  return pokemon;
};
